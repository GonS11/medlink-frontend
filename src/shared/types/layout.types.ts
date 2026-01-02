import {Component} from "vue";

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

export interface EntityDetailPageWrapperProps {
  title: string
  subtitle?: string
  backRoute: string
  loading?: boolean
  showEdit?: boolean
  showDelete?: boolean
  entityName: string
  emptyStateIcon?: Component
  showEmpty?: boolean
}

export interface EntityManagementWrapperProps {
  title: string
  subtitle: string
  showCreateButton?: boolean
  createButtonText: string
  showHeaderActions?: boolean
}

