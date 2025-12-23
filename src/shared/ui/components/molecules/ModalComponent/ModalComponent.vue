<script setup lang="ts">
import {watch, onUnmounted} from 'vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import XIcon from "@shared/ui/icons/XIcon.vue"
import {ModalProps} from "@shared/types/component.molecules.types.ts";


const props = withDefaults(defineProps<ModalProps>(), {
  variant: 'primary',
  size: 'md',
  showFooter: true,
  showClose: true,
  closeOnBackdrop: true,
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

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(() => props.show, (isShow) => {
  isShow ? lockScroll() : unlockScroll()
})

onUnmounted(() => unlockScroll())

const handleBackdrop = () => {
  if (props.closeOnBackdrop) closeModal()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="modal"
        role="dialog"
        aria-modal="true"
        @click.self="handleBackdrop"
      >
        <div :class="['modal__container', `modal__container--${size}`]">
          <header v-if="title || $slots.header" class="modal__header">
            <slot name="header">
              <h3 class="modal__title">{{ title }}</h3>
            </slot>

            <ButtonComponent
              v-if="showClose"
              :variant="'ghost'"
              :size="'sm'"
              :iconPosition="'right'"
              class="modal__close"
              @click="closeModal"
              :aria-label="$t('modal.close')"
              :icon="XIcon"
            />

          </header>

          <div class="modal__body">
            <slot/>
          </div>

          <footer v-if="showFooter" class="modal__footer">
            <slot name="footer">
              <ButtonComponent
                variant="ghost"
                @click="closeModal"
                :disabled="loading"
              >
                {{ $t('common.cancel') }}
              </ButtonComponent>
              <ButtonComponent
                :variant="variant === 'primary' ? 'primary' : variant"
                @click="emit('confirm')"
                :loading="loading"
              >
                {{ $t('common.confirm') }}
              </ButtonComponent>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss" src="./ModalComponent.scss"></style>
