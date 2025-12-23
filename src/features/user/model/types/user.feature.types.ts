import type {UserResponse} from "@entities/user/model/types/user.types"
import type {PageResponse} from "@shared/types/api.types"
import type {TableColumn} from "@shared/types/table.types"

/**
 * Props para UsersTable
 */
export interface UserTableProps {
  users: UserResponse[]
  columns: TableColumn[]
  loading?: boolean
  pagination?: PageResponse<UserResponse> | null
}

/**
 * Eventos que emite UsersTable
 */
export interface UserTableEmits {
  (e: 'row-click', user: UserResponse): void
  (e: 'page-change', page: number): void
  (e: 'action', action: UserTableAction): void
}

/**
 * Tipos de acciones disponibles en la tabla
 */
export type UserTableActionType = 'view' | 'edit' | 'delete' | 'lock' | 'unlock'

/**
 * Acción ejecutada desde la tabla
 */
export interface UserTableAction {
  type: UserTableActionType
  user: UserResponse
}
