<script setup lang="ts">
import {watch, onMounted, onUnmounted} from 'vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import {useI18n} from "vue-i18n";
import XIcon from "@shared/ui/icons/XIcon.vue";

interface Props {
  show: boolean
  title?: string
  variant?: 'primary' | 'danger' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  showFooter?: boolean
  showCancel?: boolean
  loading?: boolean
}

const {t} = useI18n()

const props = withDefaults(defineProps<Props>(), {
  title: '',
  variant: 'primary',
  size: 'md',
  showFooter: true,
  showCancel: true,
  loading: false,
})

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: []
  cancel: []
}>()

const closeModal = () => {
  emit('update:show', false)
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleBackdropClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    closeModal()
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show) {
    closeModal()
  }
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="modal" @click="handleBackdropClick" role="dialog" aria-modal="true">
        <div
          class="modal__container"
          :class="[`modal__container--${size}`]"
          @click.stop
        >
          <header v-if="title || $slots.header" class="modal__header">
            <slot name="header">
              <h3 class="modal__title">{{ title }}</h3>
            </slot>
            <button
              class="modal__close-btn"
              type="button"
              @click="closeModal"
              :aria-label="$t('common.close')"
            >
              <XIcon :label="t('icons.X')"/>
            </button>
          </header>

          <div class="modal__body">
            <slot/>
          </div>

          <footer v-if="showFooter" class="modal__footer">
            <slot name="footer">
              <ButtonComponent
                v-if="showCancel"
                variant="ghost"
                @click="closeModal"
                :disabled="loading"
              >
                {{ t('common.cancel') }}
              </ButtonComponent>
              <ButtonComponent
                :variant="variant"
                @click="handleConfirm"
                :disabled="loading"
                :loading="loading"
              >
                {{ t('common.confirm') }}
              </ButtonComponent>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss" src="./ModalComponent.scss"></style>
