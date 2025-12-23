import type {UserResponse} from '@entities/user/model/types/user.types'
import type {TableColumn, SortConfig} from '@shared/types/table.types'
import type {PageResponse} from '@shared/types/api.types'

// Tipos de acciones disponibles en la tabla
export type UserTableActionType =
  | 'view'
  | 'edit'
  | 'delete'
  | 'lock'
  | 'unlock'

// Payload del evento action
export interface UserTableAction {
  type: UserTableActionType
  user: UserResponse
}

// Props del componente UsersTable
export interface UserTableProps {
  users: UserResponse[]
  columns: TableColumn[]
  loading?: boolean
  pagination?: PageResponse<UserResponse> | null
}

// Emits del componente UsersTable
export interface UserTableEmits {
  (e: 'action', payload: UserTableAction): void
  (e: 'page-change', page: number): void
  (e: 'sort', config: SortConfig): void
}
