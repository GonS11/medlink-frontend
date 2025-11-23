# 🏥 MEDLINK - GUION COMPLETO DE APLICACIÓN

## 📋 ÍNDICE DE CONTENIDOS

1. [Arquitectura General](#arquitectura-general)
2. [Módulos Compartidos](#módulos-compartidos)
3. [Módulos por Rol](#módulos-por-rol)
4. [Componentes Reutilizables](#componentes-reutilizables)
5. [Flujos de Trabajo](#flujos-de-trabajo)

---

## 🏗️ ARQUITECTURA GENERAL

### Estructura de Carpetas
```
src/
├── core/                      # Funcionalidades core
│   ├── auth/                  # Autenticación y autorización
│   ├── api/                   # Cliente API y servicios
│   ├── guards/                # Guards de navegación
│   └── interceptors/          # Interceptores HTTP
├── shared/                    # Compartido entre módulos
│   ├── components/            # Componentes reutilizables
│   ├── directives/            # Directivas custom
│   ├── pipes/                 # Pipes custom
│   ├── models/                # Interfaces y tipos
│   ├── services/              # Servicios compartidos
│   ├── utils/                 # Utilidades
│   └── styles/                # Estilos globales
├── features/                  # Módulos por funcionalidad
│   ├── admin/                 # Módulo de administración
│   ├── doctor/                # Módulo de doctores
│   ├── nurse/                 # Módulo de enfermeras
│   ├── patient/               # Módulo de pacientes
│   ├── receptionist/          # Módulo de recepcionistas
│   ├── pharmacist/            # Módulo de farmacéuticos
│   ├── laboratory/            # Módulo de laboratorio
│   ├── radiologist/           # Módulo de radiología
│   ├── social-worker/         # Módulo de trabajadores sociales
│   └── technician/            # Módulo de técnicos
└── layouts/                   # Layouts base
    ├── MainLayout.vue
    ├── AuthLayout.vue
    └── PublicLayout.vue
```

---

## 🌐 MÓDULOS COMPARTIDOS (Todos los roles)

### 1. AUTENTICACIÓN Y PERFIL

#### `/login` - Inicio de Sesión
- **Componentes:**
  - `LoginForm.vue` - Formulario de login
  - `ForgotPasswordModal.vue` - Recuperar contraseña
  - `TwoFactorAuth.vue` - Autenticación 2FA (opcional)
- **Funcionalidades:**
  - Login con email/contraseña
  - Recordar sesión
  - Cambio de idioma
  - Recuperación de contraseña
  - Verificación de cuenta

#### `/perfil` - Perfil de Usuario
- **Pestañas:**
  1. **Información Personal**
    - Datos básicos (nombre, email, teléfono)
    - Foto de perfil
    - Cambio de contraseña
    - Preferencias de idioma
  2. **Seguridad**
    - Activar/desactivar 2FA
    - Historial de sesiones
    - Dispositivos conectados
    - Cambiar contraseña
  3. **Notificaciones**
    - Preferencias de notificaciones (email, SMS, push)
    - Configurar alertas personalizadas
  4. **Privacidad**
    - Configuración de privacidad
    - Descargar datos personales (GDPR)
    - Eliminar cuenta

### 2. NOTIFICACIONES

#### `/notificaciones` - Centro de Notificaciones
- **Componentes:**
  - `NotificationList.vue`
  - `NotificationItem.vue`
  - `NotificationFilters.vue`
- **Tipos de Notificaciones:**
  - Citas próximas
  - Resultados disponibles
  - Mensajes de médicos/pacientes
  - Alertas de sistema
  - Recordatorios de medicación
  - Cambios en turnos (personal)
- **Funcionalidades:**
  - Marcar como leído/no leído
  - Eliminar notificaciones
  - Filtros por tipo
  - Búsqueda
  - Configurar preferencias

### 3. MENSAJERÍA INTERNA

#### `/mensajes` - Sistema de Mensajería
- **Componentes:**
  - `ChatList.vue` - Lista de conversaciones
  - `ChatWindow.vue` - Ventana de chat
  - `NewMessageModal.vue` - Nuevo mensaje
- **Funcionalidades:**
  - Chat en tiempo real
  - Enviar archivos adjuntos
  - Búsqueda de mensajes
  - Marcar como importante
  - Archivar conversaciones
  - Estados: enviado, entregado, leído

### 4. CALENDARIO

#### `/calendario` - Calendario Personal
- **Vistas:**
  - Día
  - Semana
  - Mes
  - Agenda (lista)
- **Eventos:**
  - Citas
  - Turnos (personal)
  - Recordatorios
  - Vacaciones
  - Formaciones
- **Funcionalidades:**
  - Crear eventos personales
  - Ver disponibilidad
  - Sincronización con Google Calendar (opcional)
  - Exportar a ICS

### 5. AYUDA Y SOPORTE

#### `/ayuda` - Centro de Ayuda
- **Secciones:**
  1. **FAQ** - Preguntas frecuentes
  2. **Guías** - Tutoriales paso a paso
  3. **Videos** - Videotutoriales
  4. **Contacto** - Formulario de contacto con soporte
  5. **Estado del Sistema** - Estado de servicios
- **Componentes:**
  - `SearchHelp.vue` - Buscador de ayuda
  - `FAQAccordion.vue` - Acordeón de preguntas
  - `SupportTicket.vue` - Crear ticket de soporte

---

## 👨‍💼 MÓDULOS POR ROL

---

## 1️⃣ ADMINISTRADOR (ADMIN)

### Dashboard Principal (`/admin/dashboard`)
- **KPIs Principales:**
  - Total de pacientes registrados
  - Total de personal activo
  - Citas del día en todos los centros
  - Ocupación de camas
  - Ingresos del mes
  - Alertas críticas del sistema
- **Gráficos:**
  - Evolución de pacientes (últimos 12 meses)
  - Distribución de personal por centro
  - Ocupación de consultorios
  - Gráfico de citas por especialidad
  - Tiempos de espera promedio
- **Componentes:**
  - `AdminStatsCards.vue`
  - `SystemHealthMonitor.vue`
  - `QuickActionsPanel.vue`

### Gestión de Usuarios (`/admin/usuarios`)
#### Listado de Usuarios
- **Tabla con columnas:**
  - ID, Nombre completo, Email, Rol, Centro asignado, Estado (activo/inactivo), Último login
- **Filtros:**
  - Por rol
  - Por centro
  - Por estado (activo/inactivo)
  - Por fecha de registro
- **Acciones:**
  - Crear usuario
  - Editar usuario
  - Activar/desactivar
  - Resetear contraseña
  - Ver detalles
  - Eliminar (con confirmación)
  - Exportar lista a Excel/CSV

#### Crear/Editar Usuario
- **Formulario por pasos:**
  1. **Datos Básicos**
    - Nombre, apellidos, email, teléfono
    - Rol (selector)
    - Idioma preferido
  2. **Datos de Rol Específico**
    - Si es Doctor: número colegiado, especialidad, centro, departamento
    - Si es Enfermera: número colegiado, especialización, centro, departamento
    - Si es Paciente: número de tarjeta sanitaria, DNI/NIE, fecha de nacimiento, etc.
    - Si es Recepcionista: número de empleado, centro, puesto
  3. **Permisos**
    - Asignar permisos específicos
    - Acceso a módulos
  4. **Revisión y Confirmación**

### Gestión de Centros de Salud (`/admin/centros`)
#### Listado de Centros
- **Tarjetas de Centros con:**
  - Nombre, tipo, nivel
  - Dirección, ciudad, provincia
  - Capacidad (camas totales, UCI, urgencias)
  - Estado (activo/inactivo)
  - Acreditaciones
- **Filtros:**
  - Por comunidad autónoma
  - Por tipo de centro
  - Por nivel (primario, secundario, terciario)
  - Con urgencias / Sin urgencias
- **Acciones:**
  - Ver detalles
  - Editar
  - Activar/desactivar
  - Ver departamentos
  - Ver estadísticas

#### Detalles de Centro
- **Pestañas:**
  1. **Información General**
    - Datos del centro
    - Contacto
    - Capacidad
    - Servicios disponibles
  2. **Departamentos**
    - Lista de departamentos/servicios
    - Agregar/editar/eliminar departamentos
    - Asignar jefes de servicio
  3. **Personal**
    - Lista de todo el personal del centro
    - Filtros por rol
    - Agregar personal al centro
  4. **Estadísticas**
    - Ocupación histórica
    - Citas atendidas
    - Tiempos de espera promedio
    - Satisfacción de pacientes

#### Crear/Editar Centro
- **Formulario:**
  - Código único
  - Nombre, tipo, nivel
  - Comunidad autónoma
  - Dirección completa
  - Contacto (teléfono, email, web)
  - Capacidad (camas totales, UCI, urgencias)
  - Servicios (urgencias, UCI, helipuerto, hospital docente, público/privado)
  - Acreditaciones

### Gestión de Especialidades Médicas (`/admin/especialidades`)
- **Lista de especialidades**
- **Crear/editar/eliminar especialidades**
- **Asociar especialidades a centros**
- **Ver doctores por especialidad**

### Gestión de Departamentos (`/admin/departamentos`)
- **Lista de departamentos por centro**
- **Crear/editar/eliminar departamentos**
- **Asignar jefes de departamento**
- **Asignar enfermeras supervisoras**
- **Ver personal del departamento**

### Configuración del Sistema (`/admin/configuracion`)
#### Pestañas:
1. **General**
  - Nombre de la aplicación
  - Logo
  - Colores personalizados
  - Idiomas disponibles
  - Zona horaria
  - Formato de fecha/hora
2. **Notificaciones**
  - Configurar plantillas de email
  - Configurar SMS
  - Configurar notificaciones push
  - Horarios de envío
3. **Seguridad**
  - Políticas de contraseñas
  - Tiempo de sesión
  - Intentos de login permitidos
  - Activar 2FA obligatorio
  - Lista blanca/negra de IPs
4. **Citas**
  - Duración predeterminada de citas
  - Antelación mínima para agendar
  - Cancelación permitida hasta
  - Recordatorios automáticos
5. **Facturación**
  - Configurar tarifas
  - Métodos de pago
  - IVA/Impuestos
6. **Integraciones**
  - API keys
  - Webhooks
  - Conectar con sistemas externos
7. **Respaldos**
  - Configurar backups automáticos
  - Descargar backup manual
  - Restaurar backup

### Reportes y Analíticas (`/admin/reportes`)
#### Tipos de Reportes:
1. **Reportes de Actividad**
  - Citas por período
  - Pacientes nuevos
  - Ingresos hospitalarios
  - Consultas por especialidad
2. **Reportes Financieros**
  - Ingresos por centro
  - Ingresos por especialidad
  - Gastos operativos
  - Facturación pendiente
3. **Reportes de Personal**
  - Horas trabajadas por doctor/enfermera
  - Ausencias y bajas
  - Turnos cumplidos
  - Productividad
4. **Reportes de Calidad**
  - Tiempos de espera
  - Satisfacción de pacientes
  - Cumplimiento de protocolos
  - Indicadores de calidad
5. **Reportes Personalizados**
  - Crear reportes con filtros custom
  - Guardar plantillas
  - Programar envío automático

**Funcionalidades:**
- Filtros por rango de fechas
- Filtros por centro
- Filtros por especialidad
- Exportar a PDF, Excel, CSV
- Enviar por email
- Gráficos interactivos
- Comparativas entre períodos

### Auditoría y Logs (`/admin/auditoria`)
- **Registro de Actividades:**
  - Usuario
  - Acción realizada
  - Fecha y hora
  - IP de origen
  - Datos modificados (antes/después)
- **Filtros:**
  - Por usuario
  - Por tipo de acción (crear, editar, eliminar, login, logout)
  - Por módulo
  - Por rango de fechas
- **Exportar logs**
- **Alertas de actividades sospechosas**

---

## 2️⃣ DOCTOR

### Dashboard de Doctor (`/doctor/dashboard`)
- **Resumen del Día:**
  - Turnos del día
  - Citas programadas (próximas 3)
  - Pacientes en espera (en tiempo real)
  - Consultas pendientes
  - Resultados de pruebas para revisar
  - Derivaciones pendientes de responder
- **Acciones Rápidas:**
  - Ver agenda completa
  - Crear nota clínica rápida
  - Prescribir medicamento
  - Solicitar prueba
  - Ver historial de paciente (búsqueda rápida)
- **Estadísticas Personales:**
  - Pacientes atendidos (semana/mes)
  - Horas trabajadas
  - Satisfacción de pacientes
  - Citas completadas vs canceladas
- **Componentes:**
  - `DoctorScheduleWidget.vue`
  - `WaitingPatientsQueue.vue`
  - `QuickPatientSearch.vue`

### Agenda de Citas (`/doctor/agenda`)
#### Vista de Calendario
- **Vistas:** Día, Semana, Mes
- **Información por cita:**
  - Hora
  - Paciente (nombre, foto, edad)
  - Tipo de cita
  - Motivo de consulta
  - Estado (confirmada, en progreso, completada, cancelada)
  - Primera vez / Seguimiento
- **Acciones:**
  - Ver detalles de la cita
  - Iniciar consulta
  - Cancelar/Reprogramar
  - Agregar notas previas
  - Marcar como "paciente llegó"
  - Marcar como "no asistió"
- **Filtros:**
  - Por tipo de cita
  - Por estado
  - Por ubicación (consultorio)
- **Funcionalidades Adicionales:**
  - Arrastrar y soltar para reprogramar
  - Bloquear horarios (vacaciones, formación, etc.)
  - Ver disponibilidad propia
  - Exportar agenda

#### Lista de Pacientes en Espera (Tiempo Real)
- **Mostrar:**
  - Nombre del paciente
  - Hora de llegada
  - Tiempo esperando
  - Prioridad
  - Motivo de consulta
- **Acciones:**
  - Llamar al siguiente paciente
  - Reordenar prioridades
  - Ver ficha rápida

### Mis Pacientes (`/doctor/pacientes`)
#### Listado de Pacientes
- **Tabla con:**
  - Foto, Nombre, Edad, Género
  - Número de tarjeta sanitaria
  - Última consulta
  - Próxima cita
  - Condiciones crónicas (tags)
  - Estado (activo, inactivo)
- **Búsqueda Avanzada:**
  - Por nombre, NIF, número de tarjeta
  - Por diagnóstico
  - Por medicación actual
  - Por rango de edad
  - Por sexo
  - Con/sin citas pendientes
- **Acciones:**
  - Ver historial completo
  - Agendar nueva cita
  - Enviar mensaje
  - Crear nota rápida

#### Ficha de Paciente - Vista Completa
**Pestañas:**

1. **Resumen / Snapshot**
  - Datos demográficos
  - Alergias (destacadas)
  - Condiciones crónicas (badges)
  - Medicación actual
  - Última visita y próxima cita
  - Signos vitales recientes
  - Alertas médicas importantes
  - Gráfico de evolución de peso

2. **Historial Médico**
  - **Lista cronológica de todas las consultas**
  - Filtros por fecha, tipo de consulta, centro
  - Cada entrada muestra:
    - Fecha, doctor, centro, departamento
    - Motivo de consulta
    - Diagnóstico
    - Tratamiento
    - Notas clínicas
    - Archivos adjuntos
  - **Acciones:**
    - Crear nueva entrada
    - Editar (si es propia)
    - Ver detalle completo
    - Imprimir
    - Compartir con otro médico

3. **Prescripciones**
  - **Lista de todas las prescripciones** (activas, completadas, canceladas)
  - Filtros: activas, por medicamento, por fecha
  - Cada prescripción muestra:
    - Medicamento, dosis, frecuencia, duración
    - Fecha de inicio y fin
    - Doctor que prescribe
    - Estado y recargas restantes
  - **Acciones:**
    - Nueva prescripción
    - Renovar prescripción
    - Cancelar prescripción
    - Ver historial de dispensaciones
    - Imprimir receta

4. **Pruebas y Resultados**
  - **Lista de todas las pruebas solicitadas**
  - Filtros: por tipo de prueba, por estado, por fecha
  - Estados: ordenada, programada, en progreso, resultados listos, revisados
  - Cada prueba muestra:
    - Tipo de prueba, nombre
    - Fecha de solicitud y fecha de resultados
    - Doctor solicitante
    - Estado
    - Resultados (si disponibles)
    - Archivos adjuntos (PDFs, imágenes)
  - **Acciones:**
    - Solicitar nueva prueba
    - Ver resultados
    - Descargar archivos
    - Marcar como revisado
    - Añadir interpretación médica
    - Solicitar prueba de seguimiento
  - **Indicador de resultados anormales** (highlight en rojo)

5. **Vacunaciones**
  - **Lista de todas las vacunas administradas**
  - Calendario de vacunación
  - Próximas vacunas recomendadas
  - Cada vacuna muestra:
    - Nombre, tipo, dosis
    - Fecha de administración
    - Próxima dosis
    - Lote, fabricante
    - Reacciones adversas
  - **Acciones:**
    - Registrar nueva vacuna
    - Programar próxima dosis
    - Imprimir cartilla de vacunación

6. **Signos Vitales**
  - **Gráficos de evolución:**
    - Presión arterial
    - Frecuencia cardíaca
    - Temperatura
    - Peso y BMI
    - Saturación de oxígeno
    - Glucosa
  - **Tabla de registros históricos**
  - Filtros por rango de fechas
  - **Acciones:**
    - Registrar nuevos signos vitales
    - Exportar datos
    - Comparar períodos

7. **Derivaciones**
  - **Derivaciones emitidas por este doctor:**
    - Especialidad, centro destino
    - Motivo, fecha
    - Estado (pendiente, programada, completada)
    - Respuesta del especialista
  - **Derivaciones recibidas (si es especialista):**
    - Doctor referente
    - Motivo
    - Resumen clínico
    - Responder derivación
  - **Acciones:**
    - Nueva derivación
    - Ver detalle
    - Responder (si recibida)
    - Cancelar

8. **Documentos y Archivos**
  - Repositorio de documentos del paciente:
    - Informes médicos
    - Imágenes de estudios
    - Consentimientos informados
    - Documentos administrativos
    - Directivas anticipadas
  - **Acciones:**
    - Subir documento
    - Descargar
    - Ver
    - Eliminar
  - Organización por carpetas/categorías

9. **Información Personal**
  - Datos demográficos completos
  - Dirección, teléfonos
  - Contactos de emergencia
  - Tutor legal (si aplica)
  - Seguros médicos
  - Mutua
  - Preferencias (idioma, hospital preferido)
  - **Acciones:**
    - Editar información (limitado al rol)

10. **Notas del Doctor** (Privadas)
  - Notas personales sobre el paciente
  - Solo visibles para el doctor que las crea
  - **Acciones:**
    - Crear nota privada
    - Editar
    - Eliminar

**Acciones Globales en Ficha de Paciente:**
- Imprimir resumen clínico
- Exportar historial completo (PDF)
- Enviar mensaje al paciente
- Agendar nueva cita
- Compartir ficha con otro médico (temporalmente)

### Consultas del Día (`/doctor/consultas`)
- **Cola de Pacientes en Espera**
- **Llamar al siguiente paciente**
- **Iniciar consulta → Abre formulario de consulta**

#### Formulario de Consulta (Modal o Página Completa)
**Secciones:**
1. **Datos del Paciente** (solo lectura, resumen)
2. **Motivo de Consulta**
  - Campo de texto libre
3. **Anamnesis / Historia Clínica**
  - Historia de la enfermedad actual
  - Revisión de sistemas
4. **Exploración Física**
  - Campos estructurados o texto libre
  - Registrar signos vitales en el momento
5. **Diagnóstico**
  - Diagnóstico principal (con buscador CIE-10 / CIAP-2)
  - Diagnósticos secundarios
6. **Plan de Tratamiento**
  - Prescribir medicamentos (interfaz rápida)
  - Solicitar pruebas (laboratorio, imagen, etc.)
  - Derivar a especialista
  - Programar seguimiento
  - Indicaciones al paciente
7. **Notas Clínicas** (evolución)
8. **Archivos Adjuntos** (subir imágenes, documentos)
9. **Baja Laboral** (si aplica)
  - Días de baja
  - Código de baja
10. **Acciones:**
  - Guardar y finalizar consulta
  - Guardar borrador (continuar después)
  - Cancelar

### Prescripciones (`/doctor/prescripciones`)
#### Listado de Prescripciones Emitidas
- **Tabla con:**
  - Paciente
  - Medicamento
  - Dosis, frecuencia
  - Fecha de emisión
  - Estado (activa, completada, cancelada)
  - Recargas restantes
- **Filtros:**
  - Por paciente
  - Por medicamento
  - Por estado
  - Por fecha
- **Acciones:**
  - Ver detalle
  - Renovar prescripción
  - Cancelar prescripción
  - Imprimir receta

#### Crear Nueva Prescripción
- **Búsqueda de paciente**
- **Búsqueda de medicamento** (por nombre, principio activo, código nacional)
- **Formulario:**
  - Medicamento
  - Dosis
  - Frecuencia (selector: cada 8h, cada 12h, 1 vez al día, etc.)
  - Vía de administración
  - Duración del tratamiento
  - Cantidad a dispensar
  - Instrucciones especiales
  - Recargas permitidas
  - Tipo de prescripción (electrónica, papel, hospitalaria, privada)
  - Financiación (SNS, privado, copago)
  - ¿Es medicamento crónico?
  - ¿Requiere autorización especial?
- **Acciones:**
  - Guardar y enviar a farmacia
  - Imprimir receta
  - Enviar copia al paciente (email/SMS)

### Pruebas y Análisis (`/doctor/pruebas`)
#### Listado de Pruebas Solicitadas
- **Tabla con:**
  - Paciente
  - Tipo de prueba
  - Fecha de solicitud
  - Estado (ordenada, programada, en progreso, resultados listos, revisados)
  - Prioridad
  - Resultados anormales (flag)
- **Filtros:**
  - Por paciente
  - Por tipo de prueba
  - Por estado
  - Por prioridad
  - Resultados pendientes de revisar
- **Acciones:**
  - Ver resultados
  - Marcar como revisado
  - Añadir interpretación
  - Solicitar nueva prueba
  - Enviar al paciente

#### Solicitar Nueva Prueba
- **Búsqueda de paciente**
- **Seleccionar tipo de prueba:**
  - Analíticas de sangre
  - Análisis de orina
  - Estudios de imagen (Rx, TAC, RMN, Eco, etc.)
  - ECG, Ergometría
  - Endoscopias
  - Biopsias
  - Pruebas de función (espirometría, etc.)
  - Pruebas genéticas
  - Cultivos
  - Pruebas de alergia
- **Formulario:**
  - Indicación clínica
  - Prioridad (rutinaria, preferente, urgente, emergencia)
  - Observaciones especiales
  - Preparación requerida (ayuno, etc.)
  - Centro donde se realizará
- **Acciones:**
  - Enviar solicitud
  - Imprimir volante
  - Programar cita (si disponible)

### Derivaciones (`/doctor/derivaciones`)
#### Pestañas:
1. **Emitidas por Mí**
  - Lista de derivaciones que he enviado
  - Estado: pendiente, programada, completada, cancelada
  - Ver respuestas de especialistas

2. **Recibidas (si soy especialista)**
  - Derivaciones de otros doctores hacia mí
  - Responder con informe
  - Programar cita con el paciente derivado

#### Crear Nueva Derivación
- **Búsqueda de paciente**
- **Formulario:**
  - Especialidad destino
  - Centro destino (si es diferente)
  - Tipo de derivación (ambulatoria, urgente, preferente, ingreso hospitalario, hospital de día, prueba diagnóstica)
  - Prioridad
  - Motivo de derivación
  - Resumen clínico
  - Pruebas relevantes ya realizadas
  - Medicación actual
  - Observaciones
- **Acciones:**
  - Enviar derivación
  - Imprimir volante
  - Notificar al paciente

### Turnos y Horarios (`/doctor/turnos`)
#### Vista de Mis Turnos
- **Calendario de turnos asignados**
- **Información por turno:**
  - Fecha, tipo de turno (mañana, tarde, noche, guardia)
  - Horario (inicio - fin)
  - Centro y departamento
  - Horas trabajadas
  - Horas extra
  - Estado (programado, confirmado, completado, ausencia, baja médica)
- **Filtros:**
  - Por mes
  - Por tipo de turno
  - Por centro
- **Acciones:**
  - Ver detalle del turno
  - Solicitar cambio de turno
  - Reportar incidencia
  - Fichar entrada/salida (si está habilitado)
  - Ver turnos de compañeros (para cambios)

#### Solicitar Cambio de Turno
- Seleccionar turno a cambiar
- Proponer turno alternativo
- Justificación
- Enviar solicitud al supervisor

#### Disponibilidad y Horarios Regulares
- Ver y editar horarios regulares de consulta
- Bloquear días/horas (vacaciones, formación, etc.)
- Configurar duración de citas
- Configurar ubicaciones (consultorios)

### Mis Estadísticas (`/doctor/estadisticas`)
- **KPIs Personales:**
  - Pacientes atendidos (semana, mes, año)
  - Horas trabajadas
  - Citas completadas vs canceladas
  - Tiempo promedio por consulta
  - Prescripciones emitidas
  - Pruebas solicitadas
  - Derivaciones realizadas
- **Gráficos:**
  - Evolución de consultas
  - Distribución de diagnósticos
  - Tipos de consulta más frecuentes
  - Satisfacción de pacientes (si hay encuestas)
- **Comparativas:**
  - Comparar con el mismo período anterior
  - Comparar con promedios del departamento (opcional)

---

## 3️⃣ ENFERMERA (NURSE)

### Dashboard de Enfermera (`/nurse/dashboard`)
- **Resumen del Día:**
  - Turno actual (horario, ubicación)
  - Pacientes asignados (si es enfermera de planta)
  - Tareas pendientes
  - Medicaciones programadas
  - Citas de enfermería del día
  - Vacunaciones programadas
- **Alertas:**
  - Signos vitales anormales
  - Medicaciones retrasadas
  - Pacientes con cuidados especiales
- **Acciones Rápidas:**
  - Registrar signos vitales
  - Administrar medicación
  - Ver lista de pacientes
  - Crear nota de enfermería
- **Componentes:**
  - `NurseShiftInfo.vue`
  - `AssignedPatientsWidget.vue`
  - `MedicationSchedule.vue`

### Mis Pacientes (`/nurse/pacientes`)
#### Listado de Pacientes Asignados
- **Tabla con:**
  - Nombre, edad, habitación/cama
  - Diagnóstico principal
  - Alergias (destacadas)
  - Última toma de signos vitales
  - Medicación próxima
  - Cuidados especiales (badges)
  - Estado (crítico, estable, alta próxima)
- **Filtros:**
  - Por planta/departamento
  - Por estado
  - Con alertas
- **Acciones:**
  - Ver ficha completa
  - Registrar signos vitales
  - Administrar medicación
  - Crear nota de enfermería
  - Ver plan de cuidados

#### Ficha de Paciente (Vista de Enfermera)
**Pestañas:**
1. **Resumen**
  - Datos básicos
  - Alergias
  - Diagnóstico actual
  - Plan de cuidados
  - Últimos signos vitales
  - Próxima medicación

2. **Signos Vitales**
  - **Registrar Nuevos Signos Vitales** (formulario rápido)
  - Presión arterial
  - Frecuencia cardíaca
  - Temperatura
  - Frecuencia respiratoria
  - Saturación de oxígeno
  - Escala de dolor
  - Glasgow (si aplica)
  - Notas adicionales
  - **Historial de signos vitales** (tabla y gráficos)

3. **Medicación**
  - **Lista de medicamentos programados** (del día)
  - Hora programada, medicamento, dosis, vía
  - Estado: pendiente, administrado, omitido
  - **Administrar Medicación:**
    - Marcar como administrado
    - Registrar hora real de administración
    - Notas (si el paciente la rechazó, reacciones, etc.)
  - **Historial de administraciones**

4. **Cuidados y Procedimientos**
  - Curas
  - Cambios de vendajes
  - Sondajes
  - Drenajes
  - Oxigenoterapia
  - **Registrar nuevo procedimiento**

5. **Notas de Enfermería**
  - Evolución del paciente (narrativa)
  - Incidencias
  - Comunicación con el médico
  - **Crear nueva nota**

6. **Plan de Alta (si aplica)**
  - Cuidados post-alta
  - Educación al paciente y familia
  - Seguimiento ambulatorio

### Agenda de Enfermería (`/nurse/agenda`)
- **Citas programadas** (vacunaciones, curas, extracciones de sangre, etc.)
- **Vistas:** Día, Semana
- **Información por cita:**
  - Paciente, hora, tipo de procedimiento
- **Acciones:**
  - Iniciar atención
  - Registrar procedimiento
  - Reprogramar
  - Cancelar

### Vacunaciones (`/nurse/vacunaciones`)
#### Listado de Vacunaciones Programadas
- **Tabla con:**
  - Paciente
  - Vacuna
  - Dosis
  - Fecha programada
  - Estado (pendiente, administrada)
- **Filtros:**
  - Por fecha
  - Por tipo de vacuna
  - Por campaña
- **Acciones:**
  - Administrar vacuna
  - Ver historial de vacunación del paciente
  - Programar próxima dosis

#### Registrar Vacunación
- **Búsqueda de paciente**
- **Formulario:**
  - Vacuna (selector)
  - Lote
  - Fabricante
  - Fecha de caducidad
  - Sitio de administración
  - Vía (IM, SC, ID, oral)
  - Dosis
  - Próxima dosis (fecha)
  - Reacciones adversas (si las hubo)
  - Consentimiento obtenido
- **Acciones:**
  - Guardar
  - Imprimir comprobante

### Administración de Medicamentos (`/nurse/medicacion`)
#### Vista de Medicaciones Programadas
- **Organizado por horas del día**
- Cada medicación muestra:
  - Paciente
  - Medicamento, dosis, vía
  - Hora programada
  - Estado (pendiente, administrado, omitido)
- **Filtros:**
  - Por paciente
  - Por hora
  - Pendientes
  - Administradas
- **Acciones:**
  - Administrar (abrir modal para confirmar)
  - Omitir (con justificación)
  - Ver historial

#### Registrar Administración
- **Modal con:**
  - Datos del paciente
  - Medicamento, dosis, vía
  - Hora real de administración
  - Notas (reacciones, rechazo del paciente, etc.)
  - Firma digital (si está habilitado)
- **Acción:**
  - Confirmar administración

### Turnos y Horarios (`/nurse/turnos`)
- Similar al módulo de doctores
- **Vista de turnos asignados**
- **Solicitar cambios**
- **Fichar entrada/salida**
- **Ver turnos de compañeros**

### Mis Estadísticas (`/nurse/estadisticas`)
- Pacientes atendidos
- Procedimientos realizados
- Vacunas administradas
- Horas trabajadas
- Incidencias reportadas

---

## 4️⃣ PACIENTE (PATIENT)

### Dashboard de Paciente (`/patient/dashboard`)
- **Resumen Personalizado:**
  - Próxima cita (fecha, hora, doctor, ubicación)
  - Resultados de pruebas disponibles (badge de "nuevos resultados")
  - Prescripciones activas
  - Próxima vacunación
  - Recordatorio de medicación (si está activado)
- **Accesos Rápidos:**
  - Solicitar cita
  - Ver mi historial
  - Descargar resultados
  - Mensajes con mi médico
  - Ver prescripciones
- **Componentes:**
  - `UpcomingAppointmentCard.vue`
  - `NewResultsAlert.vue`
  - `MedicationReminder.vue`

### Mis Citas (`/patient/citas`)
#### Listado de Citas
- **Pestañas:**
  1. **Próximas Citas**
    - Fecha, hora
    - Doctor, especialidad
    - Centro, dirección
    - Tipo de cita
    - Instrucciones (ayuno, documentos a llevar, etc.)
    - **Acciones:**
      - Ver detalle
      - Cancelar cita (hasta X horas antes)
      - Reprogramar (si está permitido)
      - Añadir al calendario (Google, Apple)
      - Obtener indicaciones (mapa)

  2. **Historial de Citas**
    - Fecha, doctor, tipo de cita
    - Estado (completada, cancelada, no asistí)
    - Resumen (si el doctor lo compartió)
    - **Acciones:**
      - Ver detalle
      - Descargar resumen

#### Solicitar Nueva Cita
- **Paso 1: Seleccionar Especialidad**
  - Lista de especialidades disponibles
  - Búsqueda
- **Paso 2: Seleccionar Doctor (opcional)**
  - Lista de doctores de esa especialidad
  - Filtros: centro, disponibilidad
  - Si no selecciona, el sistema asigna
- **Paso 3: Seleccionar Fecha y Hora**
  - Calendario con disponibilidad en tiempo real
  - Horarios disponibles
- **Paso 4: Motivo de la Cita**
  - Campo de texto para describir el motivo
- **Paso 5: Confirmación**
  - Revisar datos
  - Confirmar
  - Recibir email/SMS de confirmación

### Mi Historial Médico (`/patient/historial`)
**Pestañas:**
1. **Resumen General**
  - Información personal
  - Alergias (destacadas)
  - Condiciones crónicas
  - Grupo sanguíneo
  - Contactos de emergencia
  - Médico de cabecera

2. **Consultas**
  - Lista de consultas pasadas
  - Filtros por fecha, doctor
  - Cada consulta muestra:
    - Fecha, doctor
    - Motivo
    - Diagnóstico (si el doctor lo compartió)
    - Tratamiento
  - **Acciones:**
    - Ver detalle
    - Descargar informe

3. **Resultados de Pruebas**
  - Lista de pruebas realizadas
  - Filtros por tipo, fecha
  - Indicador de "nuevos resultados"
  - Cada prueba muestra:
    - Tipo, nombre
    - Fecha
    - Doctor solicitante
    - Estado
    - Resultados (si están disponibles)
  - **Acciones:**
    - Ver resultados
    - Descargar PDF
    - Compartir con otro médico (generar enlace temporal)

4. **Prescripciones**
  - Lista de prescripciones (activas, pasadas)
  - Cada prescripción muestra:
    - Medicamento, dosis, frecuencia
    - Doctor
    - Fecha de emisión
    - Estado
    - Recargas restantes
  - **Acciones:**
    - Ver detalle
    - Solicitar renovación (si está permitido)
    - Descargar receta
    - Historial de retiradas en farmacia

5. **Vacunaciones**
  - Cartilla de vacunación digital
  - Lista de vacunas administradas
  - Próximas vacunas recomendadas
  - **Acciones:**
    - Ver detalle
    - Descargar cartilla
    - Programar próxima vacuna

6. **Documentos**
  - Informes médicos
  - Consentimientos
  - Directivas anticipadas
  - **Acciones:**
    - Ver
    - Descargar
    - Subir documento (si está permitido)

### Mis Prescripciones (`/patient/prescripciones`)
#### Prescripciones Activas
- Lista de medicamentos que debo tomar actualmente
- Información: nombre, dosis, frecuencia, instrucciones
- **Recordatorio de medicación:**
  - Activar/desactivar recordatorios
  - Configurar horarios de notificación
- **Acciones:**
  - Ver detalle
  - Solicitar renovación
  - Descargar receta
  - Ver historial de retiradas

#### Historial de Prescripciones
- Medicamentos pasados
- Filtros por fecha, medicamento

### Resultados de Pruebas (`/patient/resultados`)
- Lista de todos los resultados disponibles
- Filtros: por tipo, por fecha, nuevos
- **Indicador de "nuevo resultado"** (badge)
- Cada resultado:
  - Tipo de prueba
  - Fecha
  - Doctor
  - Estado
- **Acciones:**
  - Ver resultado completo
  - Descargar PDF
  - Compartir con médico externo (link temporal)
  - Imprimir

### Mensajes con mi Médico (`/patient/mensajes`)
- Lista de conversaciones con mis médicos
- Chat en tiempo real
- Enviar mensajes
- Adjuntar archivos (fotos, documentos)
- Estados: enviado, leído

### Mi Perfil y Datos Personales (`/patient/perfil`)
**Pestañas:**
1. **Información Personal**
  - Datos demográficos (nombre, fecha de nacimiento, etc.)
  - Dirección, teléfono, email
  - Foto de perfil
  - **Editar** (algunos campos pueden estar bloqueados)

2. **Datos de Salud**
  - Alergias (editar si el sistema lo permite)
  - Condiciones crónicas
  - Medicación habitual (informativa)
  - Cirugías previas
  - Historia familiar

3. **Contactos de Emergencia**
  - Nombre, teléfono, relación
  - Editar

4. **Seguros y Mutuas**
  - Seguro médico
  - Mutua laboral
  - Número de póliza
  - Editar

5. **Preferencias**
  - Idioma
  - Notificaciones (email, SMS, push)
  - Centro de salud preferido
  - Recordatorios de citas
  - Recordatorios de medicación

6. **Privacidad**
  - ¿Permitir que otros médicos vean mi historial?
  - ¿Compartir datos con investigación? (anonimizados)
  - Descargar mis datos (GDPR)
  - Eliminar cuenta

### Educación y Recursos (`/patient/recursos`)
- **Biblioteca de Salud:**
  - Artículos educativos por especialidad
  - Guías de enfermedades comunes
  - Consejos de prevención
  - Videos educativos
- **FAQ:**
  - Preguntas frecuentes sobre citas, prescripciones, etc.
- **Contacto:**
  - Teléfono de cita previa
  - Email de soporte

---

## 5️⃣ RECEPCIONISTA (RECEPTIONIST)

### Dashboard de Recepcionista (`/receptionist/dashboard`)
- **Resumen del Día:**
  - Citas del día en mi centro/departamento
  - Pacientes en espera (en tiempo real)
  - Citas por confirmar
  - Citas pendientes de check-in
- **Acciones Rápidas:**
  - Buscar paciente
  - Agendar nueva cita
  - Check-in de paciente
  - Ver agenda de doctores
- **Componentes:**
  - `TodayAppointmentsWidget.vue`
  - `WaitingRoomMonitor.vue`
  - `QuickPatientSearch.vue`

### Gestión de Citas (`/receptionist/citas`)
#### Vista de Agenda
- **Seleccionar Centro/Departamento**
- **Seleccionar Doctor** (ver agenda de un doctor específico)
- **Vistas:** Día, Semana
- **Información por cita:**
  - Hora
  - Paciente (nombre, teléfono)
  - Doctor
  - Tipo de cita
  - Estado (confirmada, en espera, en progreso, completada, cancelada, no asistió)
  - Check-in (¿llegó el paciente?)
- **Acciones:**
  - Confirmar cita (llamar al paciente)
  - Check-in (marcar que llegó)
  - Reprogramar
  - Cancelar
  - Ver detalle
  - Imprimir comprobante

#### Crear Nueva Cita
- **Búsqueda de Paciente**
  - Por nombre, NIF, tarjeta sanitaria, teléfono
  - Si no existe, crear paciente nuevo (formulario simplificado)
- **Seleccionar Doctor y Especialidad**
- **Seleccionar Fecha y Hora** (calendario con disponibilidad)
- **Tipo de Cita** (general, seguimiento, urgente, etc.)
- **Motivo**
- **Observaciones**
- **Confirmar y Enviar Recordatorio** (email/SMS)

#### Sala de Espera (Monitoreo en Tiempo Real)
- **Lista de Pacientes en Espera:**
  - Nombre
  - Hora de llegada
  - Doctor
  - Tiempo esperando (actualizado en tiempo real)
  - Estado (en espera, llamado, en consulta)
- **Acciones:**
  - Marcar como "llamado por el doctor"
  - Marcar como "en consulta"
  - Añadir nota
- **Panel Visual:** (opcional)
  - Pantalla de televisión en sala de espera mostrando próximas llamadas

### Gestión de Pacientes (`/receptionist/pacientes`)
#### Listado de Pacientes
- **Tabla con:**
  - Nombre, edad, teléfono
  - Número de tarjeta sanitaria
  - Última visita
  - Próxima cita
- **Búsqueda Avanzada:**
  - Por nombre, NIF, tarjeta sanitaria, teléfono
- **Acciones:**
  - Ver ficha básica (datos de contacto)
  - Editar datos de contacto
  - Agendar cita para el paciente
  - Ver historial de citas del paciente

#### Crear/Editar Paciente
- **Formulario Simplificado:**
  - Nombre, apellidos
  - Fecha de nacimiento
  - NIF/NIE (si disponible)
  - Número de tarjeta sanitaria
  - Teléfono, email
  - Dirección
  - Contacto de emergencia
- **Acciones:**
  - Guardar
  - Agendar primera cita

### Confirmación de Citas (`/receptionist/confirmaciones`)
- **Lista de Citas Pendientes de Confirmar:**
  - Citas de los próximos días que requieren confirmación telefónica
- **Información:**
  - Paciente, teléfono
  - Fecha y hora de la cita
  - Doctor
- **Acciones:**
  - Llamar al paciente (marcar teléfono automáticamente si está integrado)
  - Marcar como confirmada
  - Marcar como no confirmada (paciente no contesta)
  - Cancelar cita (si el paciente no puede asistir)
  - Reprogramar

### Turnos y Horarios (`/receptionist/turnos`)
- Ver mis turnos
- Solicitar cambios
- Fichar entrada/salida
- Ver turnos de compañeros

### Reportes Simples (`/receptionist/reportes`)
- **Reportes Diarios:**
  - Total de citas del día
  - Citas completadas
  - Citas canceladas
  - No asistencias
  - Tiempo promedio de espera
- **Exportar a Excel/PDF**

---

## 6️⃣ FARMACÉUTICO (PHARMACIST)

### Dashboard de Farmacéutico (`/pharmacist/dashboard`)
- **Resumen del Día:**
  - Prescripciones pendientes de dispensar (en mi farmacia)
  - Prescripciones dispensadas hoy
  - Alertas de stock bajo
  - Interacciones detectadas (pendientes de resolver)
- **Acciones Rápidas:**
  - Buscar prescripción
  - Registrar dispensación
  - Gestionar inventario
- **Componentes:**
  - `PendingPrescriptionsWidget.vue`
  - `LowStockAlerts.vue`
  - `InteractionAlerts.vue`

### Dispensación de Medicamentos (`/pharmacist/dispensacion`)
#### Buscar Prescripción
- **Métodos de búsqueda:**
  - Por número de prescripción
  - Por nombre de paciente
  - Por DNI/tarjeta sanitaria
  - Escanear código QR/barras de la receta
- **Mostrar Prescripción:**
  - Datos del paciente
  - Medicamento, dosis, cantidad
  - Doctor prescriptor
  - Fecha de emisión
  - Estado (pendiente, parcialmente dispensada, completada)
  - Recargas restantes
  - Instrucciones especiales

#### Registrar Dispensación
- **Formulario:**
  - Cantidad dispensada
  - Lote del medicamento
  - Fecha de caducidad
  - ¿Se sustituyó por genérico? (indicar medicamento dispensado)
  - Notas del farmacéutico
  - Firma digital
- **Verificaciones Automáticas:**
  - Detectar interacciones medicamentosas (con otras recetas activas del paciente)
  - Alertar si el paciente tiene alergias
  - Verificar dosis
- **Acciones:**
  - Confirmar dispensación
  - Rechazar dispensación (con justificación)
  - Contactar con el médico prescriptor (si hay dudas)
  - Imprimir comprobante

#### Listado de Dispensaciones
- **Tabla con:**
  - Fecha
  - Paciente
  - Medicamento
  - Cantidad
  - Prescripción
  - Doctor
- **Filtros:**
  - Por fecha
  - Por paciente
  - Por medicamento
- **Acciones:**
  - Ver detalle
  - Imprimir comprobante
  - Anular (con justificación y permisos)

### Gestión de Inventario (`/pharmacist/inventario`)
#### Listado de Medicamentos
- **Tabla con:**
  - Nombre del medicamento
  - Código nacional
  - Principio activo
  - Forma farmacéutica
  - Stock actual
  - Stock mínimo
  - Estado (suficiente, bajo, crítico)
  - Ubicación en farmacia
  - Precio
- **Filtros:**
  - Por nombre/código
  - Por principio activo
  - Con stock bajo
  - Caducidad próxima
- **Acciones:**
  - Ver detalle
  - Editar stock
  - Registrar entrada
  - Registrar salida
  - Marcar como caducado
  - Generar pedido

#### Registrar Entrada de Stock
- **Formulario:**
  - Medicamento (búsqueda)
  - Cantidad recibida
  - Lote
  - Fecha de caducidad
  - Proveedor
  - Número de albarán
- **Acción:**
  - Guardar

#### Alertas de Stock
- **Lista de medicamentos con stock bajo o caducidad próxima**
- **Acciones:**
  - Generar pedido automático
  - Marcar como "pedido realizado"
  - Ignorar alerta

#### Medicamentos Próximos a Caducar
- **Lista ordenada por fecha de caducidad**
- **Acciones:**
  - Marcar como caducado
  - Registrar baja del stock
  - Generar reporte de caducados

### Verificación de Interacciones (`/pharmacist/interacciones`)
- **Herramienta de Verificación:**
  - Introducir medicamentos manualmente o buscar prescripciones de un paciente
  - El sistema muestra posibles interacciones
  - Severidad (leve, moderada, grave)
  - Descripción de la interacción
  - Recomendaciones
- **Historial de Interacciones Detectadas:**
  - Fecha
  - Paciente
  - Medicamentos implicados
  - Acción tomada (contactó al médico, rechazó dispensación, etc.)

### Consultas Farmacéuticas (`/pharmacist/consultas`)
- **Atención al Paciente:**
  - Registro de consultas realizadas (sin prescripción)
  - Recomendación de medicamentos OTC
  - Consejos de salud
  - Derivación al médico (si es necesario)
- **Formulario de Consulta:**
  - Paciente (si está registrado)
  - Motivo de consulta
  - Recomendación realizada
  - Productos recomendados
  - Notas
- **Historial de Consultas**

### Reportes de Farmacia (`/pharmacist/reportes`)
- **Reportes Disponibles:**
  - Dispensaciones por período
  - Medicamentos más dispensados
  - Inventario actual
  - Medicamentos caducados
  - Interacciones detectadas
  - Consultas realizadas
- **Filtros por fechas, medicamentos, etc.**
- **Exportar a Excel/PDF**

---

## 7️⃣ PERSONAL DE LABORATORIO (LABORATORY_STAFF)

### Dashboard de Laboratorio (`/laboratory/dashboard`)
- **Resumen del Día:**
  - Muestras pendientes de procesar
  - Muestras en proceso
  - Resultados pendientes de validar
  - Resultados enviados hoy
  - Equipos con mantenimiento pendiente
- **Acciones Rápidas:**
  - Registrar nueva muestra
  - Buscar prueba
  - Validar resultados
- **Componentes:**
  - `PendingSamplesWidget.vue`
  - `ResultsQueue.vue`
  - `EquipmentStatus.vue`

### Gestión de Muestras (`/laboratory/muestras`)
#### Listado de Muestras
- **Tabla con:**
  - Número de muestra
  - Paciente
  - Tipo de muestra (sangre, orina, etc.)
  - Prueba solicitada
  - Doctor solicitante
  - Fecha de recepción
  - Estado (pendiente, en proceso, completada)
  - Prioridad
- **Filtros:**
  - Por estado
  - Por tipo de prueba
  - Por prioridad
  - Por fecha
- **Acciones:**
  - Ver detalle
  - Registrar muestra
  - Iniciar procesamiento
  - Registrar resultados
  - Rechazar muestra (con justificación)

#### Registrar Nueva Muestra
- **Escanear código de barras de la muestra** (si está etiquetada)
- O búsqueda manual de la prueba solicitada
- **Formulario:**
  - Número de muestra
  - Paciente
  - Tipo de muestra
  - Prueba solicitada
  - Doctor solicitante
  - Fecha y hora de recepción
  - Condiciones de la muestra (temperatura, integridad, etc.)
  - Técnico que recibe
- **Acciones:**
  - Registrar muestra
  - Imprimir etiqueta

#### Rechazar Muestra
- **Motivos:**
  - Muestra insuficiente
  - Muestra hemolizada
  - Muestra coagulada
  - Etiquetado incorrecto
  - Muestra fuera de condiciones
- **Acción:**
  - Notificar al centro/doctor solicitante
  - Solicitar nueva muestra

### Procesamiento de Pruebas (`/laboratory/procesamiento`)
#### Lista de Pruebas en Proceso
- **Tabla con:**
  - Número de prueba
  - Paciente
  - Tipo de prueba
  - Estado (pendiente, en proceso, completada, validada)
  - Prioridad
  - Equipo asignado
  - Técnico asignado
- **Acciones:**
  - Iniciar procesamiento
  - Registrar resultados
  - Marcar como completada

#### Registrar Resultados
- **Formulario Dinámico según tipo de prueba:**
  - Ej: Hemograma completo → campos para hemoglobina, hematocrito, leucocitos, plaquetas, etc.
  - Ej: Bioquímica → glucosa, colesterol, triglicéridos, etc.
  - Ej: Orina → color, aspecto, pH, proteínas, glucosa, etc.
- **Valores de referencia** mostrados junto a cada campo
- **Indicador de valores anormales** (automático al comparar con rangos)
- **Notas del técnico**
- **Adjuntar archivos** (gráficos, imágenes de cultivos, etc.)
- **Acciones:**
  - Guardar resultados
  - Enviar a validación
  - Guardar borrador

### Validación de Resultados (`/laboratory/validacion`)
- **Solo personal autorizado** (técnico senior, supervisor, doctor de laboratorio)
- **Lista de resultados pendientes de validar**
- **Revisar:**
  - Resultados
  - Valores de referencia
  - Indicadores anormales
  - Notas del técnico
- **Acciones:**
  - Validar (los resultados se envían al doctor solicitante)
  - Rechazar (con motivo, volver a procesar)
  - Solicitar repetición de prueba
  - Añadir interpretación técnica

### Gestión de Equipos (`/laboratory/equipos`)
#### Listado de Equipos
- **Tabla con:**
  - Nombre del equipo
  - Modelo, fabricante
  - Número de serie
  - Estado (operativo, en mantenimiento, fuera de servicio)
  - Último mantenimiento
  - Próximo mantenimiento
  - Calibración vigente
- **Acciones:**
  - Ver detalle
  - Registrar mantenimiento
  - Registrar calibración
  - Reportar incidencia
  - Ver historial

#### Registrar Mantenimiento/Calibración
- **Formulario:**
  - Equipo
  - Tipo (mantenimiento preventivo, correctivo, calibración)
  - Fecha
  - Técnico responsable
  - Descripción del trabajo realizado
  - Piezas reemplazadas
  - Próximo mantenimiento
  - Firma digital
- **Acción:**
  - Guardar

### Control de Calidad (`/laboratory/calidad`)
- **Registros de Control de Calidad:**
  - Fecha
  - Prueba
  - Equipo
  - Resultados de control (valores esperados vs obtenidos)
  - Técnico
  - Acciones correctivas (si fue necesario)
- **Gráficos de Levey-Jennings** (para seguimiento estadístico)
- **Alertas de valores fuera de control**

### Reportes de Laboratorio (`/laboratory/reportes`)
- **Reportes Disponibles:**
  - Pruebas realizadas por período
  - Pruebas por tipo
  - Tiempos de respuesta (desde recepción hasta validación)
  - Muestras rechazadas
  - Equipos utilizados
  - Control de calidad
- **Filtros por fechas, tipo de prueba, etc.**
- **Exportar a Excel/PDF**

---

## 8️⃣ RADIÓLOGO (RADIOLOGIST)

### Dashboard de Radiólogo (`/radiologist/dashboard`)
- **Resumen del Día:**
  - Estudios pendientes de interpretar
  - Estudios en espera de firma
  - Estudios completados hoy
  - Citas de estudios programados hoy
- **Acciones Rápidas:**
  - Ver lista de estudios pendientes
  - Buscar estudio
  - Abrir PACS (visor de imágenes)
- **Componentes:**
  - `PendingStudiesWidget.vue`
  - `CompletedTodayStats.vue`

### Gestión de Estudios (`/radiologist/estudios`)
#### Listado de Estudios
- **Tabla con:**
  - Número de estudio
  - Paciente (nombre, edad, género)
  - Tipo de estudio (RX, TAC, RMN, Ecografía, Mamografía, etc.)
  - Fecha del estudio
  - Doctor solicitante
  - Indicación clínica
  - Estado (pendiente, en proceso, informado, firmado, enviado)
  - Prioridad
  - Imágenes disponibles
- **Filtros:**
  - Por estado
  - Por tipo de estudio
  - Por prioridad
  - Por fecha
  - Por modalidad
- **Acciones:**
  - Ver imágenes (abrir PACS)
  - Informar estudio
  - Ver informe
  - Firmar informe
  - Comparar con estudios previos

#### Ver Estudio / Abrir PACS
- **Visor de Imágenes Médicas:**
  - Visualización de imágenes DICOM
  - Herramientas de manipulación (zoom, pan, window/level)
  - Mediciones (distancias, ángulos, áreas)
  - Anotaciones
  - Comparación con estudios previos (lado a lado)
  - Reconstrucciones 3D (si aplica)
- **Información del Estudio:**
  - Datos del paciente
  - Indicación clínica
  - Estudios previos disponibles
  - Datos técnicos (protocolo, dosis, etc.)

#### Informar Estudio
- **Plantillas de Informe según tipo de estudio:**
  - Estructura estándar (hallazgos, impresión diagnóstica, recomendaciones)
  - Campos estructurados + texto libre
- **Formulario de Informe:**
  - Técnica utilizada
  - Hallazgos (descripción detallada)
  - Comparación con estudios previos (si existen)
  - Impresión diagnóstica
  - Recomendaciones (seguimiento, estudios adicionales)
  - Clasificación (normal, anormal, incidental, urgente)
  - Adjuntar imágenes clave del estudio
- **Acciones:**
  - Guardar borrador
  - Guardar y firmar
  - Enviar al doctor solicitante
  - Solicitar segunda opinión

#### Firma de Informes
- **Lista de informes pendientes de firma**
- **Revisar informe:**
  - Ver imágenes
  - Leer informe
- **Acciones:**
  - Firmar (firma digital)
  - Solicitar correcciones
  - Rechazar (con motivo)

### Agenda de Radiología (`/radiologist/agenda`)
- **Citas de estudios programados**
- **Información:**
  - Paciente
  - Tipo de estudio
  - Hora programada
  - Sala/equipo asignado
  - Técnico asignado
- **Acciones:**
  - Ver detalle
  - Reprogramar
  - Cancelar
  - Añadir notas de protocolo

### Segundas Opiniones (`/radiologist/segundas-opiniones`)
- **Solicitudes de Segunda Opinión:**
  - Estudio original
  - Radiólogo solicitante
  - Motivo de la consulta
  - Informe original
- **Acciones:**
  - Ver imágenes
  - Revisar informe original
  - Emitir segunda opinión
  - Discutir caso (mensaje interno)

### Protocolos y Guías (`/radiologist/protocolos`)
- **Biblioteca de Protocolos de Imagen:**
  - Por tipo de estudio
  - Indicaciones
  - Contraindicaciones
  - Preparación del paciente
  - Dosis de radiación
  - Protocolos de contraste
- **Búsqueda por palabra clave**

### Estadísticas Personales (`/radiologist/estadisticas`)
- **KPIs:**
  - Estudios informados (semana, mes, año)
  - Tiempo promedio de informe
  - Distribución de estudios por tipo
  - Hallazgos críticos detectados
  - Segundas opiniones realizadas
- **Gráficos y comparativas**

---

## 9️⃣ TRABAJADOR SOCIAL (SOCIAL_WORKER)

### Dashboard de Trabajador Social (`/social-worker/dashboard`)
- **Resumen del Día:**
  - Casos activos asignados
  - Citas del día
  - Seguimientos pendientes
  - Solicitudes de ayuda nuevas
- **Acciones Rápidas:**
  - Ver mis casos
  - Buscar paciente
  - Registrar nueva intervención
- **Componentes:**
  - `ActiveCasesWidget.vue`
  - `UpcomingAppointments.vue`

### Mis Casos (`/social-worker/casos`)
#### Listado de Casos
- **Tabla con:**
  - Paciente
  - Situación (descripción breve)
  - Tipo de caso (socioeconómico, familiar, violencia, adicciones, alta hospitalaria, etc.)
  - Estado (abierto, en progreso, resuelto, cerrado)
  - Prioridad
  - Última intervención
  - Próximo seguimiento
- **Filtros:**
  - Por estado
  - Por tipo de caso
  - Por prioridad
- **Acciones:**
  - Ver detalle del caso
  - Registrar intervención
  - Cerrar caso
  - Derivar a otro profesional

#### Ficha de Caso
**Pestañas:**
1. **Resumen del Caso**
  - Datos del paciente
  - Descripción de la situación
  - Objetivos de la intervención
  - Estado actual
  - Profesionales implicados

2. **Historial de Intervenciones**
  - Lista de todas las intervenciones realizadas
  - Fecha, tipo de intervención, resumen, trabajador social
  - **Registrar Nueva Intervención:**
    - Fecha
    - Tipo (entrevista, visita domiciliaria, coordinación con otros servicios, gestión de recursos, seguimiento)
    - Descripción
    - Acciones tomadas
    - Próximos pasos
    - Notas privadas

3. **Recursos Gestionados**
  - Ayudas económicas solicitadas/tramitadas
  - Derivaciones a servicios sociales externos
  - Gestión de ayudas técnicas
  - Trámites administrativos
  - Enlaces a documentación

4. **Red de Apoyo**
  - Familia
  - Cuidadores
  - Otros profesionales implicados (médicos, psicólogos, etc.)
  - Servicios externos

5. **Documentos**
  - Informes sociales
  - Consentimientos
  - Documentación administrativa
  - **Subir/descargar documentos**

#### Crear Nuevo Caso
- **Búsqueda de Paciente**
- **Formulario:**
  - Tipo de caso
  - Descripción de la situación
  - Objetivos de la intervención
  - Prioridad
  - Profesionales a involucrar
- **Acción:**
  - Crear caso

### Agenda de Citas (`/social-worker/agenda`)
- **Citas programadas** (entrevistas con pacientes/familias)
- **Vistas:** Día, Semana
- **Acciones:**
  - Ver detalle
  - Registrar notas de la cita
  - Reprogramar
  - Cancelar

### Recursos y Derivaciones (`/social-worker/recursos`)
#### Directorio de Recursos
- **Lista de recursos disponibles:**
  - Servicios sociales municipales
  - ONG y asociaciones
  - Centros de acogida
  - Servicios de atención a adicciones
  - Servicios de atención a víctimas de violencia
  - Recursos de empleo
  - Recursos de vivienda
  - Ayudas económicas
  - Ayudas técnicas (sillas de ruedas, camas articuladas, etc.)
- **Información de cada recurso:**
  - Nombre, descripción
  - Contacto
  - Requisitos de acceso
  - Cómo tramitarlo
- **Búsqueda por categoría, palabra clave**

#### Derivaciones Realizadas
- **Listado de derivaciones que he realizado**
- **Estado:** pendiente, en trámite, resuelta
- **Seguimiento**

### Reportes e Informes Sociales (`/social-worker/reportes`)
#### Crear Informe Social
- **Seleccionar paciente**
- **Plantilla de informe:**
  - Datos de identificación
  - Situación sociofamiliar
  - Situación económica
  - Situación de vivienda
  - Red de apoyo
  - Valoración social
  - Propuesta de intervención
  - Recursos recomendados
- **Acciones:**
  - Guardar
  - Imprimir
  - Enviar al médico solicitante
  - Firmar digitalmente

#### Estadísticas
- Casos atendidos
- Casos por tipo
- Recursos gestionados
- Derivaciones realizadas
- Tiempo promedio de resolución de casos

---

## 🔟 TÉCNICO (TECHNICIAN)

### Dashboard de Técnico (`/technician/dashboard`)
- **Resumen del Día:**
  - Procedimientos programados hoy
  - Equipos asignados
  - Mantenimientos pendientes
- **Acciones Rápidas:**
  - Ver agenda de procedimientos
  - Registrar procedimiento
  - Reportar incidencia de equipo
- **Componentes:**
  - `ScheduledProcedures.vue`
  - `EquipmentAssignments.vue`

### Agenda de Procedimientos (`/technician/agenda`)
- **Citas de procedimientos técnicos:**
  - Estudios de imagen (RX, TAC, RMN, Eco)
  - ECG, ergometrías
  - Espirometrías
  - Otros estudios funcionales
- **Información por cita:**
  - Paciente
  - Tipo de procedimiento
  - Hora programada
  - Sala/equipo
  - Doctor solicitante
  - Preparación requerida
- **Acciones:**
  - Ver detalle
  - Iniciar procedimiento
  - Registrar realización
  - Reprogramar
  - Cancelar

### Realizar Procedimiento (`/technician/procedimientos`)
#### Registrar Procedimiento
- **Datos del Procedimiento:**
  - Paciente
  - Tipo de procedimiento
  - Equipo utilizado
  - Técnico que lo realiza
  - Fecha y hora
  - Protocolo aplicado
  - Observaciones (dificultades técnicas, incidencias)
  - Imágenes/archivos generados
- **Para estudios de imagen:**
  - Número de imágenes capturadas
  - Protocolo de adquisición
  - Dosis de radiación (si aplica)
  - Contraste administrado (si aplica)
- **Acción:**
  - Guardar
  - Enviar a PACS (si es imagen)
  - Notificar al radiólogo/médico

### Gestión de Equipos (`/technician/equipos`)
- Similar al módulo de laboratorio
- **Lista de equipos asignados**
- **Registrar uso**
- **Reportar incidencias**
- **Registrar mantenimiento básico**
- **Ver manual del equipo**

### Control de Calidad (`/technician/calidad`)
- **Pruebas de calidad de equipos:**
  - Calibración de equipos de imagen
  - Verificación de calidad de imagen
  - Pruebas de seguridad
- **Registrar resultados de controles**
- **Alertas de equipos fuera de especificaciones**

---

## 🧩 COMPONENTES REUTILIZABLES

### Componentes de UI Básicos
1. **Buttons**
  - `ButtonComponent.vue` (primary, secondary, danger, outline, text, icon)
  - `ButtonGroup.vue`
  - `SplitButton.vue`

2. **Forms**
  - `InputField.vue` (text, email, password, number, tel)
  - `TextareaField.vue`
  - `SelectField.vue`
  - `RadioGroup.vue`
  - `CheckboxField.vue`
  - `CheckboxGroup.vue`
  - `DatePicker.vue`
  - `TimePicker.vue`
  - `DateRangePicker.vue`
  - `FileUpload.vue`
  - `SearchInput.vue`
  - `AutocompleteInput.vue`
  - `TagInput.vue`

3. **Layout**
  - `CardComponent.vue` (ya existente)
  - `ModalComponent.vue`
  - `DrawerComponent.vue`
  - `TabsComponent.vue`
  - `AccordionComponent.vue`
  - `StepperComponent.vue`
  - `SplitterComponent.vue`

4. **Navigation**
  - `SidebarComponent.vue`
  - `TopbarComponent.vue`
  - `BreadcrumbComponent.vue`
  - `PaginationComponent.vue`
  - `MenuComponent.vue`
  - `DropdownMenu.vue`

5. **Data Display**
  - `TableComponent.vue`
  - `DataTable.vue` (con sorting, filtros, paginación)
  - `ListComponent.vue`
  - `BadgeComponent.vue`
  - `ChipComponent.vue`
  - `AvatarComponent.vue`
  - `TagComponent.vue`
  - `TimelineComponent.vue`
  - `ProgressBar.vue`
  - `Spinner.vue`

6. **Feedback**
  - `AlertComponent.vue`
  - `ToastComponent.vue`
  - `NotificationComponent.vue`
  - `TooltipComponent.vue`
  - `PopoverComponent.vue`
  - `ConfirmDialog.vue`
  - `EmptyState.vue`
  - `LoadingOverlay.vue`

7. **Charts**
  - `LineChart.vue`
  - `BarChart.vue`
  - `PieChart.vue`
  - `DoughnutChart.vue`
  - `AreaChart.vue`
  - `StatsCard.vue` (tarjeta con icono + número + tendencia)

8. **Calendar**
  - `CalendarComponent.vue`
  - `EventCard.vue`
  - `DateSelector.vue`

9. **Medical-Specific**
  - `PatientCard.vue` - Tarjeta resumida de paciente
  - `AppointmentCard.vue` - Tarjeta de cita
  - `VitalSignsForm.vue` - Formulario de signos vitales
  - `PrescriptionCard.vue` - Tarjeta de prescripción
  - `AllergyBadge.vue` - Badge de alergia (destacado)
  - `DiagnosisTag.vue` - Tag de diagnóstico
  - `MedicationList.vue` - Lista de medicamentos
  - `TestResultCard.vue` - Tarjeta de resultado de prueba
  - `VitalSignsChart.vue` - Gráfico de evolución de signos vitales
  - `MedicalTimelineItem.vue` - Item de línea de tiempo médica

### Directivas Custom
- `v-permission` - Mostrar/ocultar según permisos del rol
- `v-tooltip` - Tooltip rápido
- `v-click-outside` - Detectar clics fuera de un elemento

### Pipes/Filters
- `formatDate` - Formatear fechas
- `formatTime` - Formatear horas
- `formatDateTime` - Formatear fecha y hora
- `capitalizeFirst` - Capitalizar primera letra
- `truncate` - Truncar texto
- `phoneFormat` - Formatear teléfono
- `nifFormat` - Formatear DNI/NIE

---

## 🔄 FLUJOS DE TRABAJO CLAVE

### 1. Flujo de Cita Médica (Ciclo Completo)

#### Paciente:
1. Solicita cita online (`/patient/citas/nueva`)
2. Selecciona especialidad, doctor, fecha/hora
3. Recibe confirmación por email/SMS
4. Recibe recordatorio 24h antes
5. Llega al centro → Check-in en recepción
6. Espera en sala de espera (monitoreo en tiempo real)
7. Es llamado por el doctor
8. Consulta realizada
9. Recibe prescripciones, pruebas solicitadas, etc.
10. Puede ver resumen de la consulta en su historial

#### Recepcionista:
1. Puede crear cita en nombre del paciente
2. Confirma citas por teléfono
3. Realiza check-in cuando el paciente llega
4. Monitorea sala de espera en tiempo real
5. Gestiona cancelaciones/reprogramaciones

#### Doctor:
1. Ve agenda del día
2. Paciente aparece en "lista de espera" tras check-in
3. Llama al paciente
4. Realiza consulta → completa formulario de consulta
5. Prescribe medicamentos, solicita pruebas, deriva si es necesario
6. Finaliza consulta → se genera registro médico
7. Paciente recibe notificación de nueva entrada en historial

### 2. Flujo de Prescripción y Dispensación

#### Doctor:
1. Prescribe medicamento durante consulta o desde módulo de prescripciones
2. Genera prescripción electrónica
3. Prescripción queda registrada en el sistema

#### Paciente:
1. Recibe notificación de nueva prescripción
2. Puede verla en `/patient/prescripciones`
3. Descarga receta digital (si es necesario)
4. Acude a farmacia

#### Farmacéutico:
1. Busca prescripción en el sistema (por número, nombre paciente, DNI, etc.)
2. Revisa medicamento, dosis, interacciones
3. Dispensa medicamento
4. Registra dispensación en el sistema
5. Imprime comprobante
6. Prescripción se marca como "dispensada"
7. Paciente y doctor reciben notificación

### 3. Flujo de Prueba de Laboratorio

#### Doctor:
1. Solicita prueba durante consulta o desde módulo de pruebas
2. Indica tipo de prueba, prioridad, instrucciones
3. Genera orden de laboratorio
4. Paciente recibe notificación

#### Paciente:
1. Recibe orden de laboratorio (email/SMS/app)
2. Acude al laboratorio (con ayuno si es necesario)

#### Personal de Laboratorio:
1. Recibe al paciente, verifica orden
2. Toma muestra
3. Registra muestra en el sistema
4. Procesa muestra
5. Registra resultados
6. Técnico senior valida resultados
7. Resultados se envían automáticamente al doctor y al paciente

#### Doctor:
1. Recibe notificación de resultados disponibles
2. Revisa resultados en módulo de pruebas
3. Marca como revisado
4. Puede añadir interpretación
5. Contacta al paciente si es necesario (o programa cita de seguimiento)

#### Paciente:
1. Recibe notificación de resultados disponibles
2. Ve resultados en `/patient/resultados`
3. Puede descargar PDF

### 4. Flujo de Derivación a Especialista

#### Médico de Atención Primaria:
1. Durante consulta, decide derivar a especialista
2. Crea derivación en el sistema (`/doctor/derivaciones/nueva`)
3. Selecciona especialidad, centro, prioridad, motivo
4. Adjunta resumen clínico, pruebas relevantes
5. Envía derivación

#### Recepcionista del Centro Especializado:
1. Recibe notificación de nueva derivación
2. Programa cita con el especialista
3. Notifica al paciente

#### Paciente:
1. Recibe notificación con cita programada
2. Acude a la cita

#### Especialista:
1. Ve derivación en `/doctor/derivaciones` (pestaña "Recibidas")
2. Revisa resumen clínico y antecedentes
3. Atiende al paciente
4. Realiza evaluación
5. Responde a la derivación con informe (diagnóstico, tratamiento, recomendaciones)
6. Informe se envía automáticamente al médico referente

#### Médico de Atención Primaria:
1. Recibe notificación de respuesta del especialista
2. Revisa informe
3. Hace seguimiento con el paciente

### 5. Flujo de Turno de Enfermera en Planta

#### Enfermera:
1. Inicia turno → ficha entrada en `/nurse/turnos`
2. Ve lista de pacientes asignados en `/nurse/pacientes`
3. Revisa medicaciones programadas para el turno
4. Inicia ronda de medicación:
  - Administra medicamentos a cada paciente
  - Registra cada administración en tiempo real
5. Registra signos vitales de cada paciente
6. Realiza procedimientos (curas, cambios de vendaje, etc.)
7. Crea notas de enfermería sobre evolución de pacientes
8. Reporta incidencias al médico (si es necesario)
9. Finaliza turno → ficha salida

---

## 📱 CONSIDERACIONES DE DISEÑO MOBILE-FIRST

Dado que mencionas que la app debe funcionar en Desktop y Móvil:

### Desktop (>768px)
- Layout con sidebar persistente (izquierda)
- Header fijo (arriba)
- Contenido principal (centro)
- Widgets y paneles laterales (derecha, opcional)
- Tablas con todas las columnas
- Modales de tamaño completo
- Gráficos grandes e interactivos

### Mobile (<768px)
- Sidebar colapsable (hamburger menu)
- Bottom Tab Bar para navegación principal (pacientes)
- Header simplificado con logo + hamburger
- Cards apiladas verticalmente
- Tablas con scroll horizontal o vista de cards
- Modales de pantalla completa (desde abajo)
- Gráficos adaptados (más simples, menos data points)
- Botones de acción flotantes (FAB) para acciones principales

### Componentes Específicos Mobile
- `BottomTabBar.vue` (para pacientes)
- `MobileHeader.vue`
- `FloatingActionButton.vue`
- `SwipeableCard.vue` (deslizar para acciones rápidas)
- `PullToRefresh.vue`

---

## 🎨 SISTEMA DE DISEÑO - GUÍA DE IMPLEMENTACIÓN

### Uso de Colores según Contexto

#### Estados de Citas
- **Confirmada:** `--color-primary` (azul)
- **Completada:** `--color-secondary` (verde)
- **Cancelada:** `--color-gray-500`
- **No asistió:** `--color-error` (rojo)
- **En progreso:** `--color-warning` (naranja)

#### Estados de Resultados
- **Normales:** `--color-secondary` (verde)
- **Anormales:** `--color-error` (rojo)
- **Pendientes:** `--color-warning` (naranja)

#### Prioridades
- **Urgente/Emergencia:** `--color-error` (rojo)
- **Preferente:** `--color-warning` (naranja)
- **Rutinaria:** `--color-primary` (azul)

#### Badges de Estado
- Usar los colores de `--badge-*-bg` y `--badge-*-text` definidos en variables

### Iconografía Recomendada
- Librería: **Lucide Icons** o **Heroicons** (modernas, outline/solid)
- Tamaño base: 20px (ajustable según contexto)
- Uso consistente de iconos para:
  - Citas: calendario
  - Pacientes: usuario
  - Medicamentos: píldora
  - Pruebas: portapapeles/probeta
  - Resultados: documento
  - Notificaciones: campana
  - Configuración: engranaje
  - Perfil: usuario-círculo

---

## 🚀 TECNOLOGÍAS RECOMENDADAS

### Frontend
- **Framework:** Vue 3 (Composition API)
- **Router:** Vue Router 4
- **Estado:** Pinia (o Vuex 4)
- **HTTP Client:** Axios
- **UI Library (opcional):** PrimeVue, Quasar, o custom components
- **Charts:** Chart.js + vue-chartjs o ApexCharts
- **Calendario:** FullCalendar
- **Date Picker:** VueDatePicker
- **Iconos:** Lucide Icons / Heroicons
- **Notificaciones:** vue-toastification
- **Formularios:** VeeValidate + Yup
- **Internacionalización:** Vue I18n

### Backend (Referencia)
- **Framework:** Express.js (Node.js) o Spring Boot (Java)
- **ORM:** Sequelize / TypeORM (Node.js) o Hibernate (Java)
- **Autenticación:** JWT + Refresh Tokens
- **WebSockets:** Socket.io (para tiempo real: notificaciones, sala de espera)
- **Almacenamiento de Archivos:** AWS S3 / MinIO / Azure Blob
- **PACS Integration:** DICOM Web / Orthanc

### DevOps
- **Containerización:** Docker
- **Orquestación:** Kubernetes (para escalabilidad)
- **CI/CD:** GitHub Actions / GitLab CI
- **Monitoreo:** Sentry (errores), Google Analytics (uso)

---

## 📄 RESUMEN FINAL: PÁGINAS TOTALES

### Por Rol:
- **Admin:** ~20 páginas/vistas principales
- **Doctor:** ~15 páginas/vistas principales
- **Nurse:** ~10 páginas/vistas principales
- **Patient:** ~10 páginas/vistas principales
- **Receptionist:** ~8 páginas/vistas principales
- **Pharmacist:** ~8 páginas/vistas principales
- **Laboratory Staff:** ~8 páginas/vistas principales
- **Radiologist:** ~7 páginas/vistas principales
- **Social Worker:** ~6 páginas/vistas principales
- **Technician:** ~5 páginas/vistas principales

**Total Estimado:** ~100-120 páginas/vistas únicas (sin contar modales, formularios anidados, sub-vistas)

### Componentes Reutilizables:
- **UI Básicos:** ~60 componentes
- **Medical-Specific:** ~10 componentes
- **Total Componentes:** ~70 componentes reutilizables

---

Este guion es extremadamente completo y cubre prácticamente todos los aspectos de una aplicación de gestión médica robusta, siguiendo las mejores prácticas de diseño UX/UI, accesibilidad, y seguridad. Puedes utilizarlo como roadmap para el desarrollo completo de MedLink.

¿Te gustaría que profundice en algún módulo específico o que te ayude con la implementación de algún componente?
