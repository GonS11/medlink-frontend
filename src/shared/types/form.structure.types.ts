export interface FormProps {
  title?: string
  subtitle?: string
  loading?: boolean
  variant?: 'default' | 'shadow' | 'borderless' | 'elevated' | 'outlined'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
}

export interface FormSectionProps {
  title?: string // Título de la sección (Legend)
  description?: string // Texto de ayuda debajo del título
  variant?: 'clean' | 'bordered' | 'filled' // Estilo visual
  disabled?: boolean
}

export interface FormLayoutProps {
  columns?: 1 | 2 | 3 | 4 | 'auto' // Número de columnas
  gap?: 'sm' | 'md' | 'lg' | 'xl' // Espacio entre elementos
  responsive?: boolean // Si true, pasa a 1 columna en móvil automáticamente
  align?: 'start' | 'center' | 'end' // Alineación vertical de los items
}
