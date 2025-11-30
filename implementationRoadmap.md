# 🏗️ Arquitectura de la Aplicación MedLink - Diseño por Roles y Funcionalidades

## 📋 Índice de Contenido
1. [Estructura General de la Aplicación](#estructura-general)
2. [División por Roles](#división-por-roles)
3. [Módulos Compartidos](#módulos-compartidos)
4. [Flujos de Trabajo Principales](#flujos-de-trabajo)
5. [Estrategia de DTOs y Permisos](#estrategia-de-dtos)
6. [Roadmap de Implementación](#roadmap)

---

## 1. Estructura General de la Aplicación

```
src/
├── app/                          # Configuración global
├── entities/                     # Entidades de dominio
│   ├── user/                    # Usuario base
│   ├── auth/                    # Autenticación
│   ├── patient/                 # Pacientes
│   ├── doctor/                  # Doctores
│   ├── nurse/                   # Enfermeras
│   ├── receptionist/            # Recepcionistas
│   ├── health-center/           # Centros de salud
│   ├── department/              # Departamentos
│   ├── specialty/               # Especialidades
│   ├── appointment/             # Citas
│   ├── medical-record/          # Historiales médicos
│   ├── prescription/            # Prescripciones
│   ├── lab-test/                # Pruebas de laboratorio
│   ├── vaccination/             # Vacunaciones
│   ├── referral/                # Derivaciones
│   └── shift/                   # Turnos
│
├── features/                     # Características por rol
│   ├── admin/                   # Administración
│   ├── doctor/                  # Funcionalidades de doctor
│   ├── nurse/                   # Funcionalidades de enfermera
│   ├── patient/                 # Funcionalidades de paciente
│   ├── receptionist/            # Funcionalidades de recepcionista
│   └── shared/                  # Funcionalidades compartidas
│
├── shared/                       # Componentes/utils compartidos
└── pages/                        # Páginas de la aplicación
```

---

## 2. División por Roles

### 🔴 ADMIN (Administrador del Sistema)

**Responsabilidades:**
- Gestión completa de usuarios y permisos
- Configuración de centros de salud
- Gestión de departamentos y especialidades
- Reportes y estadísticas globales
- Auditoría del sistema

**Módulos:**

```
features/admin/
├── dashboard/
│   ├── ui/
│   │   └── AdminDashboard.vue           # Dashboard principal
│   ├── model/
│   │   ├── useAdminStats.ts             # Estadísticas globales
│   │   └── useSystemHealth.ts           # Estado del sistema
│   └── api/
│       └── admin-stats.service.ts
│
├── user-management/
│   ├── ui/
│   │   ├── UserListPage.vue             # Lista de usuarios
│   │   ├── UserDetailPage.vue           # Detalle de usuario
│   │   ├── UserCreatePage.vue           # Crear usuario
│   │   └── components/
│   │       ├── UserTable.vue
│   │       ├── UserFilters.vue
│   │       ├── UserRoleSelector.vue
│   │       └── UserStatusBadge.vue
│   ├── model/
│   │   ├── useUserManagement.ts
│   │   └── useUserPermissions.ts
│   └── api/
│       └── user-admin.service.ts
│
├── health-center-management/
│   ├── ui/
│   │   ├── HealthCenterListPage.vue
│   │   ├── HealthCenterDetailPage.vue
│   │   ├── HealthCenterFormPage.vue
│   │   └── components/
│   │       ├── HealthCenterCard.vue
│   │       ├── DepartmentManager.vue
│   │       └── CenterStaffAssignment.vue
│   ├── model/
│   │   └── useHealthCenterManagement.ts
│   └── api/
│       └── health-center-admin.service.ts
│
├── specialty-management/
│   ├── ui/
│   │   ├── SpecialtyListPage.vue
│   │   └── SpecialtyFormPage.vue
│   ├── model/
│   │   └── useSpecialtyManagement.ts
│   └── api/
│       └── specialty-admin.service.ts
│
├── reports/
│   ├── ui/
│   │   ├── ReportsPage.vue
│   │   └── components/
│   │       ├── AppointmentStats.vue
│   │       ├── UserActivityReport.vue
│   │       ├── CenterPerformance.vue
│   │       └── SystemUsageReport.vue
│   ├── model/
│   │   └── useAdminReports.ts
│   └── api/
│       └── reports.service.ts
│
└── audit/
    ├── ui/
    │   ├── AuditLogPage.vue
    │   └── components/
    │       ├── AuditLogTable.vue
    │       └── AuditFilters.vue
    ├── model/
    │   └── useAuditLog.ts
    └── api/
        └── audit.service.ts
```

---

### 🔵 DOCTOR (Médico)

**Responsabilidades:**
- Gestión de citas (ver, completar)
- Historiales médicos (crear, editar, consultar)
- Prescripciones
- Solicitud de pruebas
- Derivaciones/interconsultas
- Gestión de su horario
- Ver sus turnos

**Módulos:**

```
features/doctor/
├── dashboard/
│   ├── ui/
│   │   └── DoctorDashboard.vue          # Dashboard médico
│   ├── model/
│   │   ├── useDoctorStats.ts
│   │   └── useTodaySchedule.ts
│   └── api/
│       └── doctor-stats.service.ts
│
├── appointments/
│   ├── ui/
│   │   ├── AppointmentListPage.vue      # Lista de citas
│   │   ├── AppointmentDetailPage.vue    # Detalle de cita
│   │   ├── TodayAppointmentsPage.vue    # Citas de hoy
│   │   └── components/
│   │       ├── AppointmentCard.vue
│   │       ├── AppointmentTimeline.vue
│   │       ├── AppointmentFilters.vue
│   │       └── NextPatientCard.vue
│   ├── model/
│   │   ├── useDoctorAppointments.ts
│   │   └── useAppointmentActions.ts     # start, complete, cancel
│   └── api/
│       └── doctor-appointments.service.ts
│
├── patients/
│   ├── ui/
│   │   ├── MyPatientsPage.vue           # Mis pacientes
│   │   ├── PatientDetailPage.vue        # Detalle del paciente
│   │   ├── PatientHistoryPage.vue       # Historial completo
│   │   └── components/
│   │       ├── PatientCard.vue
│   │       ├── PatientVitalSigns.vue
│   │       ├── PatientTimeline.vue
│   │       ├── PatientAllergies.vue
│   │       └── PatientMedications.vue
│   ├── model/
│   │   ├── useMyPatients.ts
│   │   └── usePatientHistory.ts
│   └── api/
│       └── doctor-patients.service.ts
│
├── medical-records/
│   ├── ui/
│   │   ├── MedicalRecordListPage.vue
│   │   ├── MedicalRecordCreatePage.vue  # Crear historial
│   │   ├── MedicalRecordDetailPage.vue
│   │   └── components/
│   │       ├── MedicalRecordForm.vue
│   │       ├── DiagnosisInput.vue       # Con búsqueda ICD-10
│   │       ├── VitalSignsForm.vue
│   │       ├── PhysicalExamForm.vue
│   │       └── TreatmentPlanForm.vue
│   ├── model/
│   │   ├── useMedicalRecords.ts
│   │   └── useDiagnosisCodes.ts
│   └── api/
│       └── medical-records.service.ts
│
├── prescriptions/
│   ├── ui/
│   │   ├── PrescriptionListPage.vue
│   │   ├── PrescriptionCreatePage.vue   # Nueva prescripción
│   │   └── components/
│   │       ├── PrescriptionForm.vue
│   │       ├── MedicationSearch.vue     # Búsqueda de medicamentos
│   │       ├── DosageCalculator.vue
│   │       └── PrescriptionPreview.vue
│   ├── model/
│   │   ├── usePrescriptions.ts
│   │   └── useMedicationDatabase.ts
│   └── api/
│       └── prescriptions.service.ts
│
├── lab-tests/
│   ├── ui/
│   │   ├── LabTestListPage.vue
│   │   ├── LabTestOrderPage.vue         # Solicitar prueba
│   │   ├── LabTestResultsPage.vue       # Ver resultados
│   │   └── components/
│   │       ├── TestOrderForm.vue
│   │       ├── TestResultsViewer.vue
│   │       ├── TestTypeSelector.vue
│   │       └── AbnormalValueAlert.vue
│   ├── model/
│   │   ├── useLabTests.ts
│   │   └── useTestResults.ts
│   └── api/
│       └── lab-tests.service.ts
│
├── referrals/
│   ├── ui/
│   │   ├── ReferralListPage.vue
│   │   ├── ReferralCreatePage.vue       # Crear derivación
│   │   └── components/
│   │       ├── ReferralForm.vue
│   │       ├── SpecialistSelector.vue
│   │       ├── ClinicalSummaryForm.vue
│   │       └── ReferralStatus.vue
│   ├── model/
│   │   └── useReferrals.ts
│   └── api/
│       └── referrals.service.ts
│
├── schedule/
│   ├── ui/
│   │   ├── MySchedulePage.vue           # Mi horario
│   │   ├── ScheduleEditPage.vue         # Editar horario
│   │   └── components/
│   │       ├── WeeklySchedule.vue
│   │       ├── ScheduleSlotEditor.vue
│   │       └── BlockTimeDialog.vue
│   ├── model/
│   │   └── useDoctorSchedule.ts
│   └── api/
│       └── doctor-schedule.service.ts
│
└── shifts/
    ├── ui/
    │   ├── MyShiftsPage.vue             # Mis turnos
    │   └── components/
    │       ├── ShiftCalendar.vue
    │       ├── ShiftCard.vue
    │       └── ShiftSwapRequest.vue
    ├── model/
    │   └── useDoctorShifts.ts
    └── api/
        └── doctor-shifts.service.ts
```

---

### 🟢 NURSE (Enfermera)

**Responsabilidades:**
- Toma de signos vitales
- Administración de medicamentos
- Asistencia en consultas
- Registro de vacunaciones
- Preparación de pacientes
- Gestión de turnos

**Módulos:**

```
features/nurse/
├── dashboard/
│   ├── ui/
│   │   └── NurseDashboard.vue
│   ├── model/
│   │   └── useNurseStats.ts
│   └── api/
│       └── nurse-stats.service.ts
│
├── patient-care/
│   ├── ui/
│   │   ├── PatientQueuePage.vue         # Cola de pacientes
│   │   ├── VitalSignsPage.vue           # Tomar signos vitales
│   │   └── components/
│   │       ├── VitalSignsForm.vue
│   │       ├── VitalSignsHistory.vue
│   │       ├── PatientPreparation.vue
│   │       └── TriageForm.vue
│   ├── model/
│   │   ├── usePatientQueue.ts
│   │   └── useVitalSigns.ts
│   └── api/
│       └── nurse-patient-care.service.ts
│
├── vaccinations/
│   ├── ui/
│   │   ├── VaccinationListPage.vue
│   │   ├── VaccinationAdminPage.vue     # Administrar vacuna
│   │   └── components/
│   │       ├── VaccinationForm.vue
│   │       ├── VaccineSchedule.vue
│   │       ├── VaccineBatchSelector.vue
│   │       └── AdverseReactionForm.vue
│   ├── model/
│   │   └── useVaccinations.ts
│   └── api/
│       └── vaccinations.service.ts
│
├── medication-admin/
│   ├── ui/
│   │   ├── MedicationRoundsPage.vue     # Rondas de medicación
│   │   └── components/
│   │       ├── MedicationCheckList.vue
│   │       ├── MedicationAdminForm.vue
│   │       └── MedicationSchedule.vue
│   ├── model/
│   │   └── useMedicationAdmin.ts
│   └── api/
│       └── medication-admin.service.ts
│
└── shifts/
    ├── ui/
    │   ├── MyShiftsPage.vue
    │   └── components/
    │       ├── ShiftCalendar.vue
    │       └── ShiftHandover.vue        # Relevo de turno
    ├── model/
    │   └── useNurseShifts.ts
    └── api/
        └── nurse-shifts.service.ts
```

---

### 🟡 PATIENT (Paciente)

**Responsabilidades:**
- Ver y solicitar citas
- Ver historial médico (limitado)
- Ver prescripciones activas
- Ver resultados de pruebas
- Actualizar datos personales
- Descargar documentos

**Módulos:**

```
features/patient/
├── dashboard/
│   ├── ui/
│   │   └── PatientDashboard.vue
│   ├── model/
│   │   └── usePatientDashboard.ts
│   └── api/
│       └── patient-dashboard.service.ts
│
├── appointments/
│   ├── ui/
│   │   ├── MyAppointmentsPage.vue       # Mis citas
│   │   ├── BookAppointmentPage.vue      # Solicitar cita
│   │   ├── AppointmentDetailPage.vue
│   │   └── components/
│   │       ├── AppointmentCard.vue
│   │       ├── DoctorSelector.vue
│   │       ├── TimeSlotPicker.vue
│   │       └── AppointmentConfirmation.vue
│   ├── model/
│   │   ├── useMyAppointments.ts
│   │   └── useAppointmentBooking.ts
│   └── api/
│       └── patient-appointments.service.ts
│
├── medical-history/
│   ├── ui/
│   │   ├── MyMedicalHistoryPage.vue     # Mi historial
│   │   ├── RecordDetailPage.vue
│   │   └── components/
│   │       ├── HistoryTimeline.vue
│   │       ├── DiagnosisCard.vue
│   │       └── TreatmentCard.vue
│   ├── model/
│   │   └── useMyMedicalHistory.ts
│   └── api/
│       └── patient-history.service.ts
│
├── prescriptions/
│   ├── ui/
│   │   ├── MyPrescriptionsPage.vue      # Mis recetas
│   │   ├── PrescriptionDetailPage.vue
│   │   └── components/
│   │       ├── PrescriptionCard.vue
│   │       ├── ActiveMedicationsList.vue
│   │       └── PrescriptionDownload.vue
│   ├── model/
│   │   └── useMyPrescriptions.ts
│   └── api/
│       └── patient-prescriptions.service.ts
│
├── test-results/
│   ├── ui/
│   │   ├── MyTestResultsPage.vue        # Resultados de pruebas
│   │   ├── TestResultDetailPage.vue
│   │   └── components/
│   │       ├── TestResultCard.vue
│   │       ├── TestResultGraph.vue
│   │       └── DownloadResults.vue
│   ├── model/
│   │   └── useMyTestResults.ts
│   └── api/
│       └── patient-test-results.service.ts
│
└── profile/
    ├── ui/
    │   ├── MyProfilePage.vue            # Mi perfil
    │   ├── UpdateProfilePage.vue
    │   └── components/
    │       ├── ProfileForm.vue
    │       ├── EmergencyContacts.vue
    │       ├── HealthCardInfo.vue
    │       └── InsuranceInfo.vue
    ├── model/
    │   └── useMyProfile.ts
    └── api/
        └── patient-profile.service.ts
```

---

### 🟣 RECEPTIONIST (Recepcionista)

**Responsabilidades:**
- Gestión de citas (crear, modificar, cancelar)
- Registro de llegada de pacientes
- Gestión de documentos básicos
- Atención al paciente

**Módulos:**

```
features/receptionist/
├── dashboard/
│   ├── ui/
│   │   └── ReceptionistDashboard.vue
│   ├── model/
│   │   └── useReceptionistDashboard.ts
│   └── api/
│       └── receptionist-dashboard.service.ts
│
├── appointments/
│   ├── ui/
│   │   ├── AppointmentManagerPage.vue   # Gestionar citas
│   │   ├── CreateAppointmentPage.vue    # Nueva cita
│   │   ├── TodaySchedulePage.vue        # Agenda de hoy
│   │   └── components/
│   │       ├── AppointmentCalendar.vue
│   │       ├── QuickAppointmentForm.vue
│   │       ├── PatientSearch.vue
│   │       ├── DoctorAvailability.vue
│   │       └── AppointmentActions.vue
│   ├── model/
│   │   ├── useAppointmentManager.ts
│   │   └── usePatientSearch.ts
│   └── api/
│       └── receptionist-appointments.service.ts
│
├── patient-check-in/
│   ├── ui/
│   │   ├── CheckInPage.vue              # Registro de llegada
│   │   └── components/
│   │       ├── CheckInForm.vue
│   │       ├── WaitingList.vue
│   │       └── QueueStatus.vue
│   ├── model/
│   │   └── usePatientCheckIn.ts
│   └── api/
│       └── check-in.service.ts
│
└── patient-registry/
    ├── ui/
    │   ├── PatientListPage.vue          # Lista de pacientes
    │   ├── PatientQuickViewPage.vue
    │   └── components/
    │       ├── PatientSearchBar.vue
    │       ├── PatientBasicInfo.vue
    │       └── PatientContactInfo.vue
    ├── model/
    │   └── usePatientRegistry.ts
    └── api/
        └── patient-registry.service.ts
```

---

## 3. Módulos Compartidos (Shared Features)

```
features/shared/
├── calendar/
│   ├── ui/
│   │   └── components/
│   │       ├── CalendarView.vue         # Vista de calendario
│   │       ├── DayView.vue
│   │       ├── WeekView.vue
│   │       └── MonthView.vue
│   └── model/
│       └── useCalendar.ts
│
├── search/
│   ├── ui/
│   │   └── components/
│   │       ├── GlobalSearch.vue         # Búsqueda global
│   │       ├── PatientSearch.vue
│   │       └── DoctorSearch.vue
│   └── model/
│       └── useGlobalSearch.ts
│
├── notifications/
│   ├── ui/
│   │   └── components/
│   │       ├── NotificationCenter.vue
│   │       ├── NotificationItem.vue
│   │       └── NotificationSettings.vue
│   └── model/
│       └── useNotifications.ts
│
└── documents/
    ├── ui/
    │   └── components/
    │       ├── DocumentViewer.vue
    │       ├── DocumentUpload.vue
    │       └── DocumentList.vue
    └── model/
        └── useDocuments.ts
```

---

## 4. Flujos de Trabajo Principales

### 📋 Flujo 1: Gestión de Citas (Completo)

```
1. PACIENTE solicita cita
   └─> patient/appointments/BookAppointmentPage.vue
       ├─> Selecciona centro de salud
       ├─> Selecciona especialidad/doctor
       ├─> Elige fecha y hora disponible
       └─> Confirma cita

2. RECEPCIONISTA confirma/modifica cita
   └─> receptionist/appointments/AppointmentManagerPage.vue
       ├─> Ve todas las citas del día
       ├─> Puede modificar horarios
       └─> Registra llegada del paciente

3. ENFERMERA prepara al paciente
   └─> nurse/patient-care/VitalSignsPage.vue
       ├─> Toma signos vitales
       ├─> Registra peso, altura, presión
       └─> Marca paciente como "listo"

4. DOCTOR atiende al paciente
   └─> doctor/appointments/AppointmentDetailPage.vue
       ├─> Ve historial del paciente
       ├─> Crea nuevo registro médico
       ├─> Emite prescripciones
       ├─> Solicita pruebas
       └─> Completa la cita
```

### 🏥 Flujo 2: Atención Médica Completa

```
1. Llegada del paciente
   └─> RECEPTIONIST: patient-check-in/CheckInPage.vue
       └─> Registra llegada

2. Triage (si es necesario)
   └─> NURSE: patient-care/TriageForm.vue
       └─> Evalúa urgencia y prioridad

3. Consulta médica
   └─> DOCTOR: appointments/AppointmentDetailPage.vue
       ├─> Anamnesis
       ├─> Exploración física
       ├─> Diagnóstico
       └─> Plan de tratamiento

4. Prescripción
   └─> DOCTOR: prescriptions/PrescriptionCreatePage.vue
       └─> Crea receta electrónica

5. Pruebas de laboratorio
   └─> DOCTOR: lab-tests/LabTestOrderPage.vue
       └─> Solicita análisis

6. Derivación (si necesario)
   └─> DOCTOR: referrals/ReferralCreatePage.vue
       └─> Deriva a especialista
```

### 💉 Flujo 3: Vacunación

```
1. Programación
   └─> RECEPTIONIST: Agenda cita de vacunación

2. Preparación
   └─> NURSE: vaccinations/VaccinationAdminPage.vue
       ├─> Verifica historial de vacunación
       ├─> Comprueba contraindicaciones
       └─> Prepara vacuna

3. Administración
   └─> NURSE: vaccinations/VaccinationForm.vue
       ├─> Administra vacuna
       ├─> Registra lote y fecha
       └─> Programa siguiente dosis

4. Seguimiento
   └─> NURSE: Monitoriza reacciones adversas
       └─> Registra en historial
```

---

## 5. Estrategia de DTOs y Permisos

### 🔐 Niveles de Información según Rol

```typescript
// Ejemplo: Patient Data según rol

// DTO para ADMIN (ve TODO)
interface PatientAdminDTO {
  id: number
  userId: number
  healthCardNumber: string
  nif: string
  socialSecurityNumber: string
  personalInfo: { /* ... */ }
  medicalInfo: { /* ... */ }
  financialInfo: { /* ... */ }
  auditInfo: { /* ... */ }
  // TODO
}

// DTO para DOCTOR (ve información médica completa)
interface PatientDoctorDTO {
  id: number
  healthCardNumber: string
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: string
    phone: string
  }
  medicalInfo: {
    allergies: string[]
    chronicConditions: string[]
    currentMedications: string[]
    bloodType: string
    // ...
  }
  emergencyContact: { /* ... */ }
  // NO ve: NIF, seguridad social, info financiera
}

// DTO para NURSE (ve información clínica básica)
interface PatientNurseDTO {
  id: number
  healthCardNumber: string
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: Date
  }
  medicalInfo: {
    allergies: string[]
    vitalSigns: VitalSign[]
  }
  // NO ve: historial completo, diagnósticos
}

// DTO para RECEPTIONIST (ve solo info básica)
interface PatientReceptionistDTO {
  id: number
  healthCardNumber: string
  firstName: string
  lastName: string
  phone: string
  email: string
  primaryDoctor: {
    id: number
    name: string
  }
  // NO ve: información médica
}

// DTO para PATIENT (ve su propia información)
interface PatientSelfDTO {
  id: number
  healthCardNumber: string
  personalInfo: { /* completo */ }
  medicalHistory: MedicalRecordSummary[] // resumido
  prescriptions: Prescription[]
  appointments: Appointment[]
  testResults: TestResult[]
  // NO ve: notas internas del doctor
}
```

### 📊 Matriz de Permisos por Entidad

| Entidad | Admin | Doctor | Nurse | Patient | Receptionist |
|---------|-------|--------|-------|---------|--------------|
| **Users** | CRUD | R (limited) | R (limited) | R (self) | R (limited) |
| **Patients** | CRUD | R (assigned) | R (dept) | R (self) | RU (basic) |
| **Appointments** | CRUD | CRU (own) | R (dept) | CR (own) | CRUD |
| **Medical Records** | R | CRUD (own) | R (limited) | R (own/limited) | - |
| **Prescriptions** | R | CRUD (own) | R (dept) | R (own) | - |
| **Lab Tests** | R | CRU (own) | R (dept) | R (own) | - |
| **Vaccinations** | R | CR | CRUD | R (own) | - |
| **Referrals** | R | CRUD (own) | - | R (own) | - |
| **Health Centers** | CRUD | R | R | R | R |
| **Departments** | CRUD | R | R | R | R |
| **Schedules** | RU | CRUD (own) | R | R | RU |
| **Shifts** | CRUD | R (own) | R (own) | - | R |

**Leyenda:**
- C: Create
- R: Read
- U: Update
- D: Delete
- (own): Solo sus propios registros
- (dept): Solo de su departamento
- (assigned): Solo pacientes asignados
- (limited): Vista limitada

---

## 6. Roadmap de Implementación

### 🎯 Fase 1: Core (Semanas 1-4)
**Prioridad: ALTA**

```
✅ Auth completado

□ Módulos base:
  ├─ Admin Dashboard
  ├─ Doctor Dashboard  
  ├─ Patient Dashboard
  └─ Receptionist Dashboard

□ Gestión de Citas:
  ├─ Listar citas
  ├─ Crear cita (Receptionist)
  ├─ Ver cita (Doctor/Patient)
  └─ Check-in paciente

□ Perfil de Usuario:
  ├─ Ver perfil
  └─ Editar perfil
```

### 🎯 Fase 2: Atención Médica (Semanas 5-8)
**Prioridad: ALTA**

```
□ Historiales Médicos:
  ├─ Crear registro médico
  ├─ Ver historial (Doctor)
  ├─ Ver historial (Patient - limitado)
  └─ Búsqueda de diagnósticos ICD-10

□ Signos Vitales:
  ├─ Registrar signos (Nurse)
  ├─ Ver evolución
  └─ Alertas automáticas

□ Prescripciones:
  ├─ Crear prescripción
  ├─ Ver prescripciones activas
  └─ Historial de prescripciones
```

### 🎯 Fase 3: Pruebas y Procedimientos (Semanas 9-12)
**Prioridad: MEDIA**

```
□ Pruebas de Laboratorio:
  ├─ Solicitar pruebas
  ├─ Ver resultados
  ├─ Alertas de valores anormales
  └─ Gráficos de evolución

□ Vacunaciones:
  ├─ Calendario de vacunación
  ├─ Administrar vacuna
  ├─ Registro de lotes
  └─ Seguimiento de efectos adversos

□ Derivaciones:
  ├─ Crear derivación
  ├─ Ver estado
  └─ Respuesta de especialista
```

### 🎯 Fase 4: Gestión y Reportes (Semanas 13-16)
**Prioridad: MEDIA-BAJA**

```
□ Horarios y Turnos:
  ├─ Gestión de horarios (Doctor)
  ├─ Calendario de turnos
  └─ Intercambio de turnos

□ Reportes (Admin):
  ├─ Estadísticas de citas
  ├─ Rendimiento por centro
  ├─ Uso del sistema
  └─ Exportación de datos

□ Gestión de Centros (Admin):
  ├─ CRUD centros de salud
  ├─ CRUD departamentos
  └─ Asignación de personal
```

### 🎯 Fase 5: Mejoras y Optimización (Semanas 17-20)
**Prioridad: BAJA**

```
□ Notificaciones:
  ├─ Push notifications
  ├─ Email notifications
  └─ SMS recordatorios

□ Telemedicina:
  ├─ Videoconsulta
  └─ Chat médico

□ Analytics avanzado
□ Mobile app
□ Integración con sistemas externos
```

---

## 7. Recomendaciones de Arquitectura

### 🏗️ Patrón de carpetas por feature

```typescript
// Cada feature sigue esta estructura:
features/[role]/[feature]/
├── ui/
│   ├── pages/          # Páginas completas
│   ├── forms/          # Formularios
│   └── components/     # Componentes reutilizables
├── model/
│   ├── use[Feature].ts      # Composable principal
│   ├── [feature].types.ts   # Types específicos
│   └── [feature].utils.ts   # Utilidades
└── api/
    └── [feature].service.ts # API calls
```

### 🔄 Flujo de datos recomendado

```
UI Component
    ↓ (user action)
Composable (useXXX)
    ↓ (execute)
API Service
    ↓ (HTTP request)
Backend
    ↓ (filtered DTO response)
Store (optional)
    ↓
UI Component (update)
```

### 🎨 Componentes compartidos prioritarios

```
1. DataTable (con filtros, paginación, sorting)
2. FormBuilder (generación dinámica de forms)
3. DateRangePicker
4. SearchBar con autocomplete
5. StatusBadge
6. ConfirmDialog
7. LoadingOverlay
8. EmptyState
9. ErrorBoundary
10. Pagination
```

---

## 📝 Notas Finales

1. **DTOs**: Crear endpoints específicos por rol (`/api/patients/my-patients` vs `/api/admin/patients`)

2. **Permisos**: Implementar middleware en backend que filtre automáticamente según rol

3. **Caché**: Usar stores de Pinia para datos frecuentes (lista de centros, especialidades)

4. **Validaciones**: Usar Zod tanto en frontend como backend con schemas compartidos

5. **i18n**: Preparar todas las traducciones desde el inicio (ES, CA, EU, GL, EN)

6. **Accesibilidad**: Todos los formularios deben ser accesibles (ARIA labels, keyboard navigation)

7. **Performance**: Implementar lazy loading de rutas y componentes pesados

8. **Testing**: Priorizar tests E2E para flujos críticos (citas, prescripciones, historiales)

¿Quieres que profundice en alguna sección específica o empecemos con la implementación de algún módulo en particular?
