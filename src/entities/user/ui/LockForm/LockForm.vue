<script setup lang="ts">
import {reactive} from 'vue'
import {LockFormData} from "@entities/user/model/types/user.ui.types.ts"
import FormComponent from '@shared/ui/components/atoms/FormComponent/FormComponent.vue'
import FormSection from '@shared/ui/components/atoms/FormSection/FormSection.vue'
import FormLayout from '@shared/ui/components/atoms/FormLayout/FormLayout.vue'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import TextAreaComponent from '@shared/ui/components/atoms/TextAreaComponent/TextAreaComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  submit: [data: LockFormData]
  cancel: []
}>()

const form = reactive({
  duration: 30,
  reason: ''
})

const handleSubmit = () => {
  emit('submit', {
    durationMinutes: form.duration || undefined,
    reason: form.reason || undefined
  })
}
</script>

<template>
  <FormComponent
    variant="elevated"
    max-width="sm"
    :centered="false"
    :loading="props.loading"
    @submit="handleSubmit"
    class="lock-form"
  >
    <FormSection
      :description="$t('entities.user.lock.warningMessage')"
      variant="filled"
    >
      <FormLayout gap="lg">
        <div class="lock-form__duration-wrapper">
          <InputComponent
            v-model="form.duration"
            type="number"
            :min="1"
            :label="$t('entities.user.lock.duration')"
            :placeholder="$t('entities.user.lock.durationPlaceholder')"
          />
          <span class="lock-form__hint">
            {{ $t('entities.user.lock.indefiniteNote') }}
          </span>
        </div>

        <TextAreaComponent
          v-model="form.reason"
          :label="$t('entities.user.lock.reason')"
          :placeholder="$t('entities.user.lock.reasonPlaceholder')"
          :rows="3"
          resize="none"
        />
      </FormLayout>
    </FormSection>

    <template #footer>
      <div class="lock-form__actions">
        <ButtonComponent
          type="button"
          variant="ghost"
          :disabled="props.loading"
          @click="$emit('cancel')"
        >
          {{ $t('common.cancel') }}
        </ButtonComponent>

        <ButtonComponent
          type="submit"
          variant="danger"
          :loading="props.loading"
        >
          {{ $t('entities.user.lock.action') }}
        </ButtonComponent>
      </div>
    </template>
  </FormComponent>
</template>

<style scoped lang="scss" src="./LockForm.scss"></style>
