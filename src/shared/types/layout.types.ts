export interface SidebarProps {
  collapsed?: boolean
  mobileOpen?: boolean
}

export interface ListPageLayoutProps {
  title: string
  subtitle?: string
  showCreate?: boolean
  createLabel?: string
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
}

export interface DetailPageLayoutProps {
  title: string
  subtitle?: string
  loading?: boolean
  showEdit?: boolean
  showDelete?: boolean
}
