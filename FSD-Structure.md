# 🏥 MedLink - Arquitectura FSD (Feature-Sliced Design)

## 📁 Estructura Completa del Proyecto

```
medlink-frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── app/                          # ⚙️ Capa de Aplicación
│   │   ├── providers/                # Providers globales
│   │   │   ├── RouterProvider.vue
│   │   │   ├── StoreProvider.vue
│   │   │   └── ThemeProvider.vue
│   │   ├── styles/                   # Estilos globales
│   │   │   ├── index.scss
│   │   │   ├── variables.scss
│   │   │   ├── reset.scss
│   │   │   └── utilities.scss
│   │   ├── config/                   # Configuración de la app
│   │   │   ├── api.ts
│   │   │   ├── routes.ts
│   │   │   └── constants.ts
│   │   ├── App.vue                   # Componente raíz
│   │   └── main.ts                   # Entry point
│   │
│   ├── pages/                        # 📄 Capa de Páginas
│   │   ├── auth/                     # Páginas de autenticación
│   │   │   ├── login/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── LoginPage.vue
│   │   │   │   │   └── LoginForm.vue
│   │   │   │   ├── model/
│   │   │   │   │   └── useLogin.ts
│   │   │   │   └── index.ts
│   │   │   └── forgot-password/
│   │   │
│   │   ├── doctor/                   # Páginas de doctor
│   │   │   ├── dashboard/
│   │   │   │   ├── ui/
│   │   │   │   │   └── DoctorDashboardPage.vue
│   │   │   │   ├── model/
│   │   │   │   │   └── useDoctorDashboard.ts
│   │   │   │   └── index.ts
│   │   │   ├── appointments/
│   │   │   ├── patients/
│   │   │   ├── prescriptions/
│   │   │   └── lab-tests/
│   │   │
│   │   ├── patient/                  # Páginas de paciente
│   │   │   ├── dashboard/
│   │   │   ├── appointments/
│   │   │   ├── medical-history/
│   │   │   └── prescriptions/
│   │   │
│   │   ├── admin/                    # Páginas de admin
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── health-centers/
│   │   │   └── reports/
│   │   │
│   │   └── nurse/                    # Páginas de enfermera
│   │
│   ├── widgets/                      # 🧩 Capa de Widgets (Composiciones)
│   │   ├── appointments/
│   │   │   ├── upcoming-appointments/
│   │   │   │   ├── ui/
│   │   │   │   │   └── UpcomingAppointments.vue
│   │   │   │   ├── model/
│   │   │   │   │   └── useUpcomingAppointments.ts
│   │   │   │   └── index.ts
│   │   │   └── appointment-calendar/
│   │   │
│   │   ├── stats/
│   │   │   ├── doctor-stats/
│   │   │   │   ├── ui/
│   │   │   │   │   └── DoctorStatsCards.vue
│   │   │   │   ├── model/
│   │   │   │   │   └── useDoctorStats.ts
│   │   │   │   └── index.ts
│   │   │   └── patient-stats/
│   │   │
│   │   ├── patient/
│   │   │   ├── patient-search/
│   │   │   ├── patient-queue/
│   │   │   └── patient-info-panel/
│   │   │
│   │   └── notifications/
│   │       └── notification-center/
│   │
│   ├── features/                     # ✨ Capa de Features (Funcionalidades)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── LoginButton.vue
│   │   │   │   │   └── LoginForm.vue
│   │   │   │   ├── model/
│   │   │   │   │   ├── authStore.ts
│   │   │   │   │   ├── useAuth.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── api/
│   │   │   │   │   └── authApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── logout/
│   │   │   └── password-reset/
│   │   │
│   │   ├── appointment/
│   │   │   ├── create-appointment/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── CreateAppointmentModal.vue
│   │   │   │   │   └── AppointmentForm.vue
│   │   │   │   ├── model/
│   │   │   │   │   ├── useCreateAppointment.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── api/
│   │   │   │   │   └── appointmentApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── cancel-appointment/
│   │   │   ├── reschedule-appointment/
│   │   │   └── check-in-appointment/
│   │   │
│   │   ├── prescription/
│   │   │   ├── create-prescription/
│   │   │   ├── renew-prescription/
│   │   │   └── dispense-prescription/
│   │   │
│   │   ├── lab-test/
│   │   │   ├── request-lab-test/
│   │   │   ├── upload-results/
│   │   │   └── validate-results/
│   │   │
│   │   ├── medical-record/
│   │   │   ├── create-medical-record/
│   │   │   ├── edit-medical-record/
│   │   │   └── share-medical-record/
│   │   │
│   │   ├── theme/
│   │   │   ├── toggle-theme/
│   │   │   │   ├── ui/
│   │   │   │   │   └── ThemeToggle.vue
│   │   │   │   ├── model/
│   │   │   │   │   ├── themeStore.ts
│   │   │   │   │   └── useTheme.ts
│   │   │   │   └── index.ts
│   │   │   └── theme-settings/
│   │   │
│   │   └── notification/
│   │       ├── send-notification/
│   │       └── mark-as-read/
│   │
│   ├── entities/                     # 🎯 Capa de Entidades
│   │   ├── user/
│   │   │   ├── ui/
│   │   │   │   ├── UserCard.vue
│   │   │   │   ├── UserAvatar.vue
│   │   │   │   └── UserBadge.vue
│   │   │   ├── model/
│   │   │   │   ├── userStore.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── useUser.ts
│   │   │   ├── api/
│   │   │   │   └── userApi.ts
│   │   │   ├── lib/
│   │   │   │   └── helpers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── patient/
│   │   │   ├── ui/
│   │   │   │   ├── PatientCard.vue
│   │   │   │   ├── PatientAvatar.vue
│   │   │   │   ├── PatientInfo.vue
│   │   │   │   └── AllergyBadge.vue
│   │   │   ├── model/
│   │   │   │   ├── patientStore.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── usePatient.ts
│   │   │   ├── api/
│   │   │   │   └── patientApi.ts
│   │   │   ├── lib/
│   │   │   │   └── patientHelpers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── doctor/
│   │   │   ├── ui/
│   │   │   │   ├── DoctorCard.vue
│   │   │   │   └── DoctorBadge.vue
│   │   │   ├── model/
│   │   │   │   ├── doctorStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── api/
│   │   │   │   └── doctorApi.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── appointment/
│   │   │   ├── ui/
│   │   │   │   ├── AppointmentCard.vue
│   │   │   │   ├── AppointmentStatusBadge.vue
│   │   │   │   └── AppointmentTimeline.vue
│   │   │   ├── model/
│   │   │   │   ├── appointmentStore.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── useAppointment.ts
│   │   │   ├── api/
│   │   │   │   └── appointmentApi.ts
│   │   │   ├── lib/
│   │   │   │   └── appointmentHelpers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── prescription/
│   │   │   ├── ui/
│   │   │   │   ├── PrescriptionCard.vue
│   │   │   │   └── PrescriptionStatusBadge.vue
│   │   │   ├── model/
│   │   │   │   ├── prescriptionStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── api/
│   │   │   │   └── prescriptionApi.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── medical-record/
│   │   │   ├── ui/
│   │   │   │   ├── MedicalRecordCard.vue
│   │   │   │   └── DiagnosisTag.vue
│   │   │   ├── model/
│   │   │   │   ├── medicalRecordStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── api/
│   │   │   │   └── medicalRecordApi.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── lab-test/
│   │   │   ├── ui/
│   │   │   │   ├── LabTestCard.vue
│   │   │   │   └── TestResultBadge.vue
│   │   │   ├── model/
│   │   │   │   ├── labTestStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── api/
│   │   │   │   └── labTestApi.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── health-center/
│   │   │   ├── ui/
│   │   │   │   └── HealthCenterCard.vue
│   │   │   ├── model/
│   │   │   │   ├── healthCenterStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── api/
│   │   │   │   └── healthCenterApi.ts
│   │   │   └── index.ts
│   │   │
│   │   └── notification/
│   │       ├── ui/
│   │       │   ├── NotificationCard.vue
│   │       │   └── NotificationBadge.vue
│   │       ├── model/
│   │       │   ├── notificationStore.ts
│   │       │   └── types.ts
│   │       ├── api/
│   │       │   └── notificationApi.ts
│   │       └── index.ts
│   │
│   └── shared/                       # 🔧 Capa Compartida
│       ├── ui/                       # Componentes UI base
│       │   ├── button/
│       │   │   ├── Button.vue
│       │   │   └── index.ts
│       │   ├── input/
│       │   │   ├── Input.vue
│       │   │   ├── Textarea.vue
│       │   │   └── index.ts
│       │   ├── select/
│       │   │   ├── Select.vue
│       │   │   └── index.ts
│       │   ├── checkbox/
│       │   │   ├── Checkbox.vue
│       │   │   └── index.ts
│       │   ├── radio/
│       │   │   ├── Radio.vue
│       │   │   └── index.ts
│       │   ├── card/
│       │   │   ├── Card.vue
│       │   │   └── index.ts
│       │   ├── modal/
│       │   │   ├── Modal.vue
│       │   │   └── index.ts
│       │   ├── drawer/
│       │   │   ├── Drawer.vue
│       │   │   └── index.ts
│       │   ├── tabs/
│       │   │   ├── Tabs.vue
│       │   │   ├── TabPanel.vue
│       │   │   └── index.ts
│       │   ├── table/
│       │   │   ├── Table.vue
│       │   │   ├── DataTable.vue
│       │   │   └── index.ts
│       │   ├── badge/
│       │   │   ├── Badge.vue
│       │   │   └── index.ts
│       │   ├── avatar/
│       │   │   ├── Avatar.vue
│       │   │   └── index.ts
│       │   ├── spinner/
│       │   │   ├── Spinner.vue
│       │   │   └── index.ts
│       │   ├── alert/
│       │   │   ├── Alert.vue
│       │   │   └── index.ts
│       │   ├── toast/
│       │   │   ├── Toast.vue
│       │   │   └── index.ts
│       │   ├── tooltip/
│       │   │   ├── Tooltip.vue
│       │   │   └── index.ts
│       │   └── pagination/
│       │       ├── Pagination.vue
│       │       └── index.ts
│       │
│       ├── api/                      # Cliente API base
│       │   ├── client.ts             # Axios/Fetch configurado
│       │   ├── interceptors.ts       # Interceptores HTTP
│       │   └── types.ts              # Tipos API generales
│       │
│       ├── lib/                      # Utilidades y helpers
│       │   ├── date/
│       │   │   ├── formatDate.ts
│       │   │   ├── parseDate.ts
│       │   │   └── index.ts
│       │   ├── validation/
│       │   │   ├── validators.ts
│       │   │   └── index.ts
│       │   ├── format/
│       │   │   ├── formatPhone.ts
│       │   │   ├── formatCurrency.ts
│       │   │   └── index.ts
│       │   ├── storage/
│       │   │   ├── localStorage.ts
│       │   │   ├── sessionStorage.ts
│       │   │   └── index.ts
│       │   └── permissions/
│       │       ├── checkPermission.ts
│       │       └── index.ts
│       │
│       ├── config/                   # Configuración compartida
│       │   ├── constants.ts
│       │   ├── env.ts
│       │   └── index.ts
│       │
│       ├── types/                    # Tipos TypeScript globales
│       │   ├── common.ts
│       │   ├── api.ts
│       │   └── index.ts
│       │
│       └── composables/              # Composables compartidos
│           ├── useDebounce.ts
│           ├── useLocalStorage.ts
│           ├── useMediaQuery.ts
│           ├── useClickOutside.ts
│           └── index.ts
│
├── .env.local                        # Variables de entorno locales
├── .env.production                   # Variables de entorno producción
├── tsconfig.json                     # Configuración TypeScript
├── vite.config.ts                    # Configuración Vite
└── package.json                      # Dependencias
```

## 📚 Convenciones FSD

### 1. **Estructura de Segmentos (Slices)**

Cada segmento tiene esta estructura:

```
feature-name/
├── ui/           # Componentes de interfaz
├── model/        # Estado, lógica, tipos
├── api/          # Llamadas a la API
├── lib/          # Utilidades específicas
├── config/       # Configuración (opcional)
└── index.ts      # Public API del segmento
```

### 2. **Public API (index.ts)**

Cada carpeta expone su API pública:

```typescript
// entities/patient/index.ts
export {PatientCard} from './ui/PatientCard.vue'
export {usePatient} from './model/usePatient'
export {patientStore} from './model/patientStore'
export type {Patient, PatientFilters} from './model/types'
```

### 3. **Imports entre Capas**

Reglas de importación:

- ✅ Capa superior puede importar de capa inferior
- ❌ Capa inferior NO puede importar de capa superior
- ✅ Dentro de la misma capa, evitar imports cruzados

```typescript
// ✅ Correcto: page importa de widget
import {UpcomingAppointments} from '@/widgets/appointments'

// ✅ Correcto: widget importa de entity
import {AppointmentCard} from '@/entities/appointment'

// ❌ Incorrecto: entity importa de feature
// import { CreateAppointment } from '@/features/appointment'
```

### 4. **Gestión de Estilos**

Cada componente gestiona sus propios estilos:

```vue

<template>
  <div class="patient-card">
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
  // Lógica del componente
</script>

<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;
  .patient-card {
    background-color: var(--card-bg);
    border-radius: var(--radius-lg);
    // Estilos específicos del componente
  }
</style>
```

### 5. **Separación de Responsabilidades**

#### Componente UI (PatientCard.vue)

```vue

<script setup lang="ts">
  // Solo props, emits, y lógica de presentación
  import type {Patient} from '../model/types'

  interface Props {
    patient: Patient
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    click: [patient: Patient]
  }>()
</script>
```

#### Composable (usePatient.ts)

```typescript
// Toda la lógica de negocio
export function usePatient(patientId: Ref<string>) {
  const store = usePatientStore()
  const isLoading = ref(false)

  const fetchPatient = async () => {
    isLoading.value = true
    await store.fetchPatient(patientId.value)
    isLoading.value = false
  }

  return {
    patient: computed(() => store.getPatientById(patientId.value)),
    isLoading,
    fetchPatient
  }
}
```

#### Store (patientStore.ts)

```typescript
// Estado global y mutaciones
export const usePatientStore = defineStore('patient', () => {
  const patients = ref<Patient[]>([])

  const fetchPatients = async () => {
    const data = await patientApi.getPatients()
    patients.value = data
  }

  return {
    patients,
    fetchPatients
  }
})
```

---

## 🎯 Beneficios de FSD

1. **Escalabilidad** - Agregar features sin afectar otras partes
2. **Mantenibilidad** - Cada feature es independiente
3. **Reutilización** - Componentes y lógica compartida clara
4. **Testing** - Fácil testear cada capa por separado
5. **Onboarding** - Nuevos desarrolladores entienden la estructura rápido
6. **Colaboración** - Equipos pueden trabajar en features sin conflictos

---

## 📖 Guía de Desarrollo

### Crear una nueva Feature

1. Crear carpeta en `features/`
2. Crear estructura: ui/, model/, api/
3. Implementar componente en ui/
4. Crear composable en model/
5. Crear llamada API en api/
6. Exportar en index.ts

### Crear una nueva Entity

1. Crear carpeta en `entities/`
2. Definir tipos en model/types.ts
3. Crear store en model/store.ts
4. Crear API en api/
5. Crear componentes UI en ui/
6. Exportar en index.ts

### Crear una nueva Page

1. Crear carpeta en `pages/`
2. Crear componente en ui/
3. Componer usando widgets y features
4. Crear composable si necesita lógica específica
5. Registrar ruta en app/config/routes.ts

---

A continuación, te mostraré ejemplos concretos de cada pieza...
