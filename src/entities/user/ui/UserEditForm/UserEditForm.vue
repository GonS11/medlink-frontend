<script setup lang="ts">
import {watch} from 'vue'
import {useForm} from '@shared/composables/useForm'
import {UserResponse} from "@entities/user/model/user.types.ts";
import {UpdateUserFormData, updateUserSchema} from "@entities/user/model/validation/user.validation.ts";
import InputComponent from "@shared/ui/components/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/ButtonComponent.vue";

interface Props {
  user: UserResponse
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: UpdateUserFormData]
  cancel: []
}>()

const {form, errors, validateField, validateForm} = useForm<UpdateUserFormData>(
  {
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    secondLastName: props.user.secondLastName || '',
    phone: props.user.phone || '',
    mobilePhone: props.user.mobilePhone || '',
  },
  updateUserSchema
)

// Update form when user prop changes
watch(() => props.user, (newUser) => {
  form.firstName = newUser.firstName
  form.lastName = newUser.lastName
  form.secondLastName = newUser.secondLastName || ''
  form.phone = newUser.phone || ''
  form.mobilePhone = newUser.mobilePhone || ''
}, {deep: true})

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', {...form})
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="user-edit-form">
    <div class="form-row">
      <InputComponent
        v-model="form.firstName"
        type="text"
        :label="$t('user.firstName')"
        :error="errors.firstName"
        @blur="validateField('firstName')"
      />
      <InputComponent
        v-model="form.lastName"
        type="text"
        :label="$t('user.lastName')"
        :error="errors.lastName"
        @blur="validateField('lastName')"
      />
    </div>

    <InputComponent
      v-model="form.secondLastName"
      type="text"
      :label="$t('user.secondLastName')"
      :error="errors.secondLastName"
      @blur="validateField('secondLastName')"
    />

    <div class="form-row">
      <InputComponent
        v-model="form.phone"
        type="tel"
        :label="$t('user.phone')"
        :error="errors.phone"
        @blur="validateField('phone')"
      />
      <InputComponent
        v-model="form.mobilePhone"
        type="tel"
        :label="$t('user.mobilePhone')"
        :error="errors.mobilePhone"
        @blur="validateField('mobilePhone')"
      />
    </div>

    <div class="form-actions">
      <ButtonComponent type="button" variant="ghost" @click="$emit('cancel')">
        {{ $t('common.cancel') }}
      </ButtonComponent>
      <ButtonComponent type="submit" variant="primary" :loading="loading">
        {{ $t('common.save') }}
      </ButtonComponent>
    </div>
  </form>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.user-edit-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.form-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;
  margin-top: $spacing-lg;
}
</style>
