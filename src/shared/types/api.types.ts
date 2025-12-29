// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

// Pagination types
export interface PaginationParams {
  page?: number
  size?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
}

export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  empty: boolean
}

// Utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

