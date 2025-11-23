# 📘 Guía Definitiva: Sistema de Formularios

## 🎯 Regla de Oro

**SIEMPRE usa `useForm` para tus formularios (Login, Register, Profile, etc.)**

---

## ✅ Patrón Estándar para Formularios

### 1️⃣ Estructura Base (Usa siempre este patrón)

```vue

<script setup lang="ts">
  import {useI18n} from 'vue-i18n'
  import {useForm} from '@shared/composables/useForm'
  import {
    CardComponent,
    FormFieldsetComponent,
    FormRowComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent
  } from '@shared/ui/components/atoms'

  // 1. Setup i18n y schemas
  const {t} = useI18n()
  const {mySchema} = createMySchemas(t)

  // 2. Setup form con useForm
  const {form, errors, validateField, validateForm} = useForm<MyFormData>(
    {
      // Valores iniciales
      field1: '',
      field2: '',
    },
    mySchema
  )

  // 3. Setup loading state
  const {myAction, loading} = useMyComposable()

  // 4. Handle submit
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await myAction(form)
      } catch (error) {
        // Error handled in composable
      }
    }
  }
</script>

<template>
  <CardComponent class="my-form-card" variant="shadow" padding="lg">
    <div class="form-container">
      <!-- Header -->
      <div class="form-header">
        <h1 class="form-title">{{ $t('myForm.title') }}</h1>
        <p class="form-subtitle">{{ $t('myForm.subtitle') }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Campos aquí -->

        <!-- Submit Button -->
        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          :disabled="loading"
          full-width
        >
          {{ $t('common.submit') }}
        </ButtonComponent>
      </form>
    </div>
  </CardComponent>
</template>

<style scoped lang="scss">
  @use '@/shared/styles/_variables' as *;

  .my-form-card {
    width: 100%;
    max-width: 600px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  .form-header {
    text-align: center;
  }

  .form-title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-sm;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .form-subtitle {
    font-size: $font-size-base;
    color: var(--text-secondary);
    margin: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }
</style>
```

---

## 🔤 Componentes de Formulario - Guía de Uso

### InputComponent - Campo de Texto

```vue
<!-- Básico -->
<InputComponent
  v-model="form.email"
  type="email"
  :label="$t('auth.email')"
  :error="errors.email"
  :required="true"
  @blur="validateField('email')"
/>

<!-- Con placeholder -->
<InputComponent
  v-model="form.name"
  :label="$t('user.name')"
  :placeholder="$t('user.namePlaceholder')"
  :error="errors.name"
  :required="true"
  @blur="validateField('name')"
/>

<!-- Password con toggle -->
<InputComponent
  v-model="form.password"
  type="password"
  :label="$t('auth.password')"
  :error="errors.password"
  :required="true"
  :show-password-toggle="true"
  @blur="validateField('password')"
/>

<!-- Con clearable -->
<InputComponent
  v-model="form.search"
  :label="$t('common.search')"
  :error="errors.search"
  clearable
  @blur="validateField('search')"
/>

<!-- Con hint (ayuda) -->
<InputComponent
  v-model="form.username"
  :label="$t('user.username')"
  :error="errors.username"
  hint="Solo letras, números y guiones bajos"
  @blur="validateField('username')"
/>
```

### SelectComponent - Selector

```vue

<script setup>
  import {computed} from 'vue'

  // Opción 1: Array estático
  const genderOptions = [
    {value: 'male', label: 'Masculino'},
    {value: 'female', label: 'Femenino'},
    {value: 'other', label: 'Otro'}
  ]

  // Opción 2: Desde enum con traducción
  const roleOptions = computed(() =>
    Object.values(UserRoleArray).map(role => ({
      value: role,
      label: t(`roles.${role}`)
    }))
  )
</script>

<template>
  <!-- Uso básico -->
  <SelectComponent
    v-model="form.gender"
    :label="$t('user.gender')"
    :options="genderOptions"
    :error="errors.gender"
    :required="true"
    @blur="validateField('gender')"
  />

  <!-- Con placeholder personalizado -->
  <SelectComponent
    v-model="form.role"
    :label="$t('user.role')"
    :options="roleOptions"
    :placeholder="$t('user.selectRole')"
    :error="errors.role"
    :required="true"
    @blur="validateField('role')"
  />
</template>
```

### TextAreaComponent - Área de Texto

```vue
<!-- Básico -->
<TextAreaComponent
  v-model="form.bio"
  :label="$t('user.bio')"
  :error="errors.bio"
  :rows="4"
  @blur="validateField('bio')"
/>

<!-- Con contador de caracteres -->
<TextAreaComponent
  v-model="form.description"
  :label="$t('common.description')"
  :error="errors.description"
  :rows="5"
  :max-length="500"
  :show-counter="true"
  @blur="validateField('description')"
/>

<!-- Con hint -->
<TextAreaComponent
  v-model="form.comments"
  :label="$t('common.comments')"
  :error="errors.comments"
  hint="Máximo 200 caracteres"
  :max-length="200"
  :show-counter="true"
  @blur="validateField('comments')"
/>
```

### CheckboxComponent - Casilla de Verificación

```vue
<!-- Simple -->
<CheckboxComponent
  v-model="form.acceptTerms"
  :label="$t('auth.acceptTerms')"
  :error="errors.acceptTerms"
  :required="true"
/>

<!-- Con descripción -->
<CheckboxComponent
  v-model="form.newsletter"
  :label="$t('user.newsletter')"
  description="Recibir actualizaciones y ofertas por email"
/>

<!-- Tamaño grande -->
<CheckboxComponent
  v-model="form.agree"
  :label="$t('common.agree')"
  size="lg"
/>
```

### SwitchComponent - Interruptor

```vue
<!-- Básico -->
<SwitchComponent
  v-model="form.notifications"
  :label="$t('settings.notifications')"
  description="Recibir notificaciones push"
/>

<!-- Con label a la izquierda -->
<SwitchComponent
  v-model="form.darkMode"
  :label="$t('settings.darkMode')"
  label-position="left"
/>

<!-- Diferentes tamaños -->
<SwitchComponent
  v-model="form.setting1"
  label="Configuración 1"
  size="sm"
/>
```

### RadioGroupComponent - Grupo de Radio Buttons

```vue

<script setup>
  const paymentMethods = [
    {
      value: 'card',
      label: 'Tarjeta de Crédito',
      description: 'Visa, Mastercard, American Express'
    },
    {
      value: 'paypal',
      label: 'PayPal',
      description: 'Pago seguro con tu cuenta PayPal'
    },
    {
      value: 'transfer',
      label: 'Transferencia Bancaria'
    }
  ]
</script>

<template>
  <!-- Vertical (por defecto) -->
  <RadioGroupComponent
    v-model="form.paymentMethod"
    :label="$t('payment.method')"
    :options="paymentMethods"
    :error="errors.paymentMethod"
    :required="true"
  />

  <!-- Horizontal -->
  <RadioGroupComponent
    v-model="form.size"
    label="Tamaño"
    :options="[
      {value: 'sm', label: 'Pequeño'},
      {value: 'md', label: 'Mediano'},
      {value: 'lg', label: 'Grande'}
    ]"
    direction="horizontal"
  />
</template>
```

### FileUploadComponent - Subida de Archivos

```vue
<!-- Dropzone (por defecto) -->
<FileUploadComponent
  v-model="form.avatar"
  :label="$t('user.avatar')"
  accept="image/*"
  :max-size="5"
  :error="errors.avatar"
/>

<!-- Múltiples archivos -->
<FileUploadComponent
  v-model="form.documents"
  :label="$t('documents.upload')"
  accept=".pdf,.doc,.docx"
  :max-size="10"
  :max-files="3"
  multiple
/>

<!-- Botón simple -->
<FileUploadComponent
  v-model="form.file"
  label="Archivo"
  variant="button"
  accept=".xlsx,.csv"
/>
```

---

## 📐 Componentes de Layout

### FormRowComponent - Grid Responsive

```vue
<!-- 2 columnas (por defecto) -->
<FormRowComponent :columns="2" gap="lg">
  <InputComponent
    v-model="form.firstName"
    :label="$t('user.firstName')"
    :error="errors.firstName"
    @blur="validateField('firstName')"
  />
  <InputComponent
    v-model="form.lastName"
    :label="$t('user.lastName')"
    :error="errors.lastName"
    @blur="validateField('lastName')"
  />
</FormRowComponent>

<!-- 3 columnas -->
<FormRowComponent :columns="3" gap="md">
  <InputComponent v-model="form.city" label="Ciudad"/>
  <InputComponent v-model="form.state" label="Estado"/>
  <InputComponent v-model="form.zip" label="CP"/>
</FormRowComponent>

<!-- Auto-fit (se adapta automáticamente) -->
<FormRowComponent columns="auto" gap="lg">
  <InputComponent v-model="form.field1" label="Campo 1"/>
  <InputComponent v-model="form.field2" label="Campo 2"/>
  <InputComponent v-model="form.field3" label="Campo 3"/>
</FormRowComponent>
```

### FormFieldsetComponent - Agrupar Campos

```vue
<!-- Default (sin borde) -->
<FormFieldsetComponent
  :legend="$t('user.personalInfo')"
  :description="$t('user.personalInfoDescription')"
  variant="default"
>
  <InputComponent v-model="form.name" label="Nombre"/>
  <InputComponent v-model="form.email" label="Email"/>
</FormFieldsetComponent>

<!-- Con borde -->
<FormFieldsetComponent
  legend="Dirección de Envío"
  variant="bordered"
>
  <InputComponent v-model="form.address" label="Dirección"/>
  <FormRowComponent :columns="2">
    <InputComponent v-model="form.city" label="Ciudad"/>
    <InputComponent v-model="form.zip" label="CP"/>
  </FormRowComponent>
</FormFieldsetComponent>

<!-- Con fondo -->
<FormFieldsetComponent
  legend="Configuración Avanzada"
  variant="filled"
>
  <SwitchComponent v-model="form.advanced" label="Modo avanzado"/>
  <SwitchComponent v-model="form.debug" label="Debug"/>
</FormFieldsetComponent>
```

---

## 📋 Ejemplos Completos por Tipo de Formulario

### 1. Formulario Simple (Login)

```vue

<script setup lang="ts">
  import {ref} from 'vue'
  import {useI18n} from 'vue-i18n'
  import {useForm} from '@shared/composables/useForm'
  import {createAuthSchemas, type LoginFormData} from '@entities/auth/model/validation/auth.validation'
  import {useAuth} from '../model/useAuth'
  import {
    CardComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent
  } from '@shared/ui/components/atoms'

  const {t} = useI18n()
  const {loginSchema} = createAuthSchemas(t)
  const {login, loading} = useAuth()

  const {form, errors, validateField, validateForm} = useForm<LoginFormData>(
    {email: '', password: ''},
    loginSchema
  )

  const rememberMe = ref(false)

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await login({...form, rememberMe: rememberMe.value})
      } catch (error) {
        // Error handled in useAuth
      }
    }
  }
</script>

<template>
  <CardComponent class="login-form" variant="shadow" padding="lg">
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">{{ $t('auth.loginTitle') }}</h1>
        <p class="form-subtitle">{{ $t('auth.loginSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <InputComponent
          v-model="form.email"
          type="email"
          :label="$t('auth.email')"
          :error="errors.email"
          :required="true"
          @blur="validateField('email')"
        />

        <InputComponent
          v-model="form.password"
          type="password"
          :label="$t('auth.password')"
          :error="errors.password"
          :required="true"
          :show-password-toggle="true"
          @blur="validateField('password')"
        />

        <div class="form-options">
          <CheckboxComponent
            v-model="rememberMe"
            :label="$t('auth.rememberMe')"
          />
          <router-link to="/forgot-password" class="link">
            {{ $t('auth.forgotPassword') }}
          </router-link>
        </div>

        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          full-width
        >
          {{ $t('auth.login') }}
        </ButtonComponent>

        <div class="form-footer">
          <p>
            {{ $t('auth.noAccount') }}
            <router-link to="/register" class="link">
              {{ $t('auth.register') }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </CardComponent>
</template>

<style scoped lang="scss">
  @use '@/shared/styles/_variables' as *;

  .login-form {
    width: 100%;
    max-width: 480px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  .form-header {
    text-align: center;
  }

  .form-title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-sm;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .form-subtitle {
    font-size: $font-size-base;
    color: var(--text-secondary);
    margin: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-footer {
    text-align: center;
    font-size: $font-size-sm;
    color: var(--text-secondary);

    p {
      margin: 0;
    }
  }

  .link {
    color: var(--color-primary);
    font-weight: $font-weight-medium;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary-dark);
    }
  }
</style>
```

### 2. Formulario Complejo (Register)

```vue

<script setup lang="ts">
  import {computed} from 'vue'
  import {useI18n} from 'vue-i18n'
  import {useForm} from '@shared/composables/useForm'
  import {createAuthSchemas, type RegisterFormData} from '@entities/auth/model/validation/auth.validation'
  import {useAuth} from '../model/useAuth'
  import {
    CardComponent,
    FormFieldsetComponent,
    FormRowComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent
  } from '@shared/ui/components/atoms'
  import {UserRoleArray} from '@shared/types/api.types'

  const {t} = useI18n()
  const {registerSchema} = createAuthSchemas(t)
  const {register, loading} = useAuth()

  const roleOptions = computed(() =>
    Object.values(UserRoleArray).map(role => ({
      value: role,
      label: t(`roles.${role}`)
    }))
  )

  const {form, errors, validateField, validateForm} = useForm<RegisterFormData>(
    {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      phone: '',
      mobilePhone: '',
      role: null as any,
    },
    registerSchema
  )

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const {confirmPassword, ...registerData} = form
        await register(registerData)
      } catch (error) {
        // Error handled in useAuth
      }
    }
  }
</script>

<template>
  <CardComponent class="register-form" variant="shadow" padding="lg">
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">{{ $t('auth.registerTitle') }}</h1>
        <p class="form-subtitle">{{ $t('auth.registerSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- Información Personal -->
        <FormFieldsetComponent
          :legend="$t('user.personalInfo')"
          :description="$t('user.personalInfoDescription')"
        >
          <FormRowComponent :columns="2" gap="lg">
            <InputComponent
              v-model="form.firstName"
              :label="$t('user.firstName')"
              :error="errors.firstName"
              :required="true"
              @blur="validateField('firstName')"
            />
            <InputComponent
              v-model="form.lastName"
              :label="$t('user.lastName')"
              :error="errors.lastName"
              :required="true"
              @blur="validateField('lastName')"
            />
          </FormRowComponent>

          <InputComponent
            v-model="form.secondLastName"
            :label="$t('user.secondLastName')"
            :error="errors.secondLastName"
            @blur="validateField('secondLastName')"
          />
        </FormFieldsetComponent>

        <!-- Contacto -->
        <FormFieldsetComponent
          :legend="$t('user.contactInfo')"
          :description="$t('user.contactInfoDescription')"
        >
          <InputComponent
            v-model="form.email"
            type="email"
            :label="$t('auth.email')"
            :error="errors.email"
            :required="true"
            @blur="validateField('email')"
          />

          <FormRowComponent :columns="2" gap="lg">
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
          </FormRowComponent>
        </FormFieldsetComponent>

        <!-- Rol -->
        <SelectComponent
          v-model="form.role"
          :label="$t('user.role')"
          :options="roleOptions"
          :placeholder="$t('user.selectRole')"
          :error="errors.role"
          :required="true"
          @blur="validateField('role')"
        />

        <!-- Seguridad -->
        <FormFieldsetComponent
          :legend="$t('auth.security')"
          :description="$t('auth.securityDescription')"
        >
          <InputComponent
            v-model="form.password"
            type="password"
            :label="$t('auth.password')"
            :error="errors.password"
            :required="true"
            :show-password-toggle="true"
            @blur="validateField('password')"
          />

          <InputComponent
            v-model="form.confirmPassword"
            type="password"
            :label="$t('auth.confirmPassword')"
            :error="errors.confirmPassword"
            :required="true"
            :show-password-toggle="true"
            @blur="validateField('confirmPassword')"
          />
        </FormFieldsetComponent>

        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          full-width
        >
          {{ $t('auth.register') }}
        </ButtonComponent>

        <div class="form-footer">
          <p>
            {{ $t('auth.hasAccount') }}
            <router-link to="/login" class="link">
              {{ $t('auth.login') }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </CardComponent>
</template>

<style scoped lang="scss">
  @use '@/shared/styles/_variables' as *;

  .register-form {
    width: 100%;
    max-width: 700px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  .form-header {
    text-align: center;
  }

  .form-title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-sm;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .form-subtitle {
    font-size: $font-size-base;
    color: var(--text-secondary);
    margin: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  .form-footer {
    text-align: center;
    font-size: $font-size-sm;
    color: var(--text-secondary);

    p {
      margin: 0;
    }
  }

  .link {
    color: var(--color-primary);
    font-weight: $font-weight-semibold;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary-dark);
    }
  }
</style>
```

### 3. Formulario de Perfil

```vue

<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import {useI18n} from 'vue-i18n'
  import {useForm} from '@shared/composables/useForm'
  import {useUser} from '@entities/user/model/useUser'
  import {
    CardComponent,
    FormFieldsetComponent,
    FormRowComponent,
    InputComponent,
    TextAreaComponent,
    FileUploadComponent,
    SwitchComponent,
    ButtonComponent,
    ButtonGroupComponent
  } from '@shared/ui/components/atoms'

  const {t} = useI18n()
  const {updateProfile, loading, user} = useUser()

  const {form, errors, validateField, validateForm, setFieldValue} = useForm({
    avatar: null,
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    website: '',
    publicProfile: true,
    showEmail: false
  }, profileSchema)

  // Cargar datos del usuario
  onMounted(() => {
    if (user.value) {
      Object.keys(form).forEach(key => {
        if (key in user.value) {
          setFieldValue(key, user.value[key])
        }
      })
    }
  })

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await updateProfile(form)
      } catch (error) {
        // Error handled
      }
    }
  }

  const handleCancel = () => {
    // Reset o navegar
  }
</script>

<template>
  <CardComponent title="Mi Perfil" subtitle="Actualiza tu información personal">
    <form @submit.prevent="handleSubmit" class="form">
      <!-- Avatar -->
      <FormFieldsetComponent legend="Foto de Perfil" variant="filled">
        <FileUploadComponent
          v-model="form.avatar"
          accept="image/*"
          :max-size="5"
          :error="errors.avatar"
        />
      </FormFieldsetComponent>

      <!-- Información Personal -->
      <FormFieldsetComponent legend="Información Personal">
        <FormRowComponent :columns="2">
          <InputComponent
            v-model="form.firstName"
            :label="$t('user.firstName')"
            :error="errors.firstName"
            :required="true"
            @blur="validateField('firstName')"
          />
          <InputComponent
            v-model="form.lastName"
            :label="$t('user.lastName')"
            :error="errors.lastName"
            :required="true"
            @blur="validateField('lastName')"
          />
        </FormRowComponent>

        <InputComponent
          v-model="form.email"
          type="email"
          :label="$t('auth.email')"
          :error="errors.email"
          :required="true"
          @blur="validateField('email')"
        />

        <TextAreaComponent
          v-model="form.bio"
          :label="$t('user.bio')"
          :error="errors.bio"
          :rows="4"
          :max-length="200"
          :show-counter="true"
          @blur="validateField('bio')"
        />

        <InputComponent
          v-model="form.website"
          type="url"
          :label="$t('user.website')"
          :error="errors.website"
          placeholder="https://ejemplo.com"
          @blur="validateField('website')"
        />
      </FormFieldsetComponent>

      <!-- Privacidad -->
      <FormFieldsetComponent legend="Privacidad">
        <SwitchComponent
          v-model="form.publicProfile"
          :label="$t('user.publicProfile')"
          description="Permite que otros usuarios vean tu perfil"
        />

        <SwitchComponent
          v-model="form.showEmail"
          :label="$t('user.showEmail')"
          description="Tu email será visible en tu perfil"
        />
      </FormFieldsetComponent>
    </form>

    <template #footer>
      <ButtonGroupComponent align="end" gap="md">
        <ButtonComponent variant="ghost" @click="handleCancel">
          {{ $t('common.cancel') }}
        </ButtonComponent>
        <ButtonComponent
          variant="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          {{ $t('common.save') }}
        </ButtonComponent>
      </ButtonGroupComponent>
    </template>
  </CardComponent>
</template>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
```

---

## ✅ Checklist de Buenas Prácticas

Cuando crees un nuevo formulario, asegúrate de:

- [ ] Usar `useForm` con schema de Zod
- [ ] Usar `CardComponent` como contenedor
- [ ] Incluir título y subtítulo en el header
- [ ] Agrupar campos relacionados con `FormFieldsetComponent`
- [ ] Usar `FormRowComponent` para layouts de múltiples columnas
- [ ] Agregar `:required="true"` a campos obligatorios
- [ ] Agregar `@blur="validateField('fieldName')"` a cada campo
- [ ] Usar `:error="errors.fieldName"` en cada campo
- [ ] Usar `:loading="loading"` en el botón de submit
- [ ] Usar `full-width` en el botón de submit
- [ ] Incluir traducción con i18n

---

## 🎯 Resumen

### ✅ Lo que SÍ debes hacer:

1. **Siempre** usa `useForm` para formularios completos
2. **Siempre** agrupa campos con `FormFieldsetComponent`
3. **Siempre** usa `FormRowComponent` para layouts
4. **Siempre** valida en `@blur`
5. **Siempre** muestra errores con `:error`

### ❌ Lo que NO debes hacer:

1. **No** uses `useFormField` para formularios completos
2. **No** mezcles validación manual con useForm
3. **No** olvides el `validateForm()` en submit
4. **No** uses inputs nativos HTML
5. **No** repitas estilos en cada formulario

---

Tu código actual (LoginForm y RegisterForm) **está perfecto**. Solo necesitas seguir este patrón para futuros
formularios.
