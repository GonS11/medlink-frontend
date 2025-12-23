<script setup lang="ts">
import {computed} from 'vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import {ConfirmDialogProps} from "@shared/types/component.molecules.types.ts";


const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  title: 'Confirmar acción',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  variant: 'primary',
  loading: false
})

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:show', false)
}
</script>

<template>
  <ModalComponent
    v-model:show="isOpen"
    :title="title"
    size="sm"
    :show-footer="false"
    class="confirm-dialog"
  >
    <div class="confirm-dialog__content">
      <p class="confirm-dialog__message">{{ message }}</p>
    </div>

    <template #footer>
      <div class="confirm-dialog__actions">
        <ButtonComponent
          variant="ghost"
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </ButtonComponent>

        <ButtonComponent
          :variant="'primary'"
          @click="handleConfirm"
          :loading="loading"
        >
          {{ confirmText }}
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped lang="scss" src="./ConfirmDialog.scss"></style>
