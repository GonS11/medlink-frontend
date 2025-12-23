<script setup lang="ts">
import {useConfirmStore} from '@shared/composables/useConfirm'
import {storeToRefs} from 'pinia'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue";

const store = useConfirmStore()
const {showConfirm, confirmOptions} = storeToRefs(store)

const handleConfirm = () => {
  store.resolve(true)
}

const handleCancel = () => {
  store.resolve(false)
}
</script>

<template>
  <ModalComponent
    :show="showConfirm"
    :title="confirmOptions?.title"
    :variant="confirmOptions?.variant"
    size="sm"
    @update:show="showConfirm = $event"
    @cancel="handleCancel"
    class="confirm-dialog"
  >
    <template #body>
      <div class="confirm-dialog__content">
        <p class="confirm-dialog__message">{{ confirmOptions?.message }}</p>
      </div>
    </template>

    <template #footer>
      <ButtonComponent
        variant="ghost"
        @click="handleCancel"
      >
        {{ confirmOptions?.cancelText }}
      </ButtonComponent>
      <ButtonComponent
        :variant="confirmOptions?.variant || 'primary'"
        @click="handleConfirm"
      >
        {{ confirmOptions?.confirmText }}
      </ButtonComponent>
    </template>
  </ModalComponent>
</template>

<style scoped lang="scss">
.confirm-message {
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
