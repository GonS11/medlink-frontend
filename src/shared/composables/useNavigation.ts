import {computed} from 'vue'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {usePermissions} from '@shared/composables/usePermissions'
import {hasAllPermissions, hasAnyPermission, type Permission} from '@shared/config/permissions.config'
import {MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS, type NavigationItem} from '@shared/constants/navigation.constants'
import type {UserRole} from '@shared/types/permissions.types'


export function useNavigation() {
  const authStore = useAuthStore()
  const {can} = usePermissions()

  const hasRole = (role: UserRole): boolean => {
    return authStore.userRole === role
  }

  const hasAnyRole = (roles: UserRole[]): boolean => {
    const userRole = authStore.userRole
    if (!userRole) return false
    return roles.includes(userRole)
  }

  const canAll = (...permissions: Permission[]): boolean => {
    const userRole = authStore.userRole
    if (!userRole) return false
    return hasAllPermissions(userRole, permissions)
  }

  const canAny = (...permissions: Permission[]): boolean => {
    const userRole = authStore.userRole
    if (!userRole) return false
    return hasAnyPermission(userRole, permissions)
  }

  const canAccessNavItem = (item: NavigationItem): boolean => {
    if (item.isDivider) {
      if (item.permissions) {
        return canAny(...item.permissions)
      }
      return false
    }

    if (!item.roles && !item.permissions) return true

    if (item.roles && !hasAnyRole(item.roles)) return false

    if (item.permissions) {
      const hasRequiredPermissions = item.requireAll
        ? canAll(...item.permissions)
        : canAny(...item.permissions)

      if (!hasRequiredPermissions) return false
    }

    return true
  }

  const filterNavItems = (items: NavigationItem[]): NavigationItem[] => {
    const filtered: NavigationItem[] = []

    for (const item of items) {
      if (!canAccessNavItem(item)) continue

      if (item.isDivider) {
        const hasItemsAfter = items.slice(items.indexOf(item) + 1).some(nextItem =>
          !nextItem.isDivider && canAccessNavItem(nextItem)
        )
        if (hasItemsAfter && filtered.length > 0) {
          filtered.push(item)
        }
        continue
      }

      if (item.children) {
        const filteredChildren = filterNavItems(item.children)
        if (filteredChildren.length === 0) continue
        filtered.push({...item, children: filteredChildren})
      } else {
        filtered.push(item)
      }
    }

    return filtered
  }

  const mainNavItems = computed(() => filterNavItems([...MAIN_NAV_ITEMS]))
  const footerNavItems = computed(() => filterNavItems([...FOOTER_NAV_ITEMS]))
  const secondaryNavItems = computed(() => footerNavItems.value) // Alias

  return {
    mainNavItems,
    footerNavItems,
    secondaryNavItems,
    can,
    canAll,
    canAny,
    hasRole,
    hasAnyRole,
  }
}
