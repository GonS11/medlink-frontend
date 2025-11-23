<script setup lang="ts">
import type {UserResponse} from '@entities/user/model/user.types'
import type {PageResponse} from '@shared/types/api.types'
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";

interface Props {
  users: UserResponse[]
  pagination: PageResponse<UserResponse> | null
  loading?: boolean
}

defineProps<Props>()

defineEmits<{
  lock: [userId: number]
  unlock: [userId: number]
  pageChange: [page: number]
}>()
</script>
<template>
  <div class="users-table">
    <div v-if="loading && !users.length" class="loading">
      <div class="spinner"></div>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>{{ $t('user.firstName') }}</th>
            <th>{{ $t('user.lastName') }}</th>
            <th>{{ $t('auth.email') }}</th>
            <th>{{ $t('user.role') }}</th>
            <th>{{ $t('common.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
                <span :class="['role-badge', `role-${user.role.toLowerCase()}`]">
                  {{ $t(`roles.${user.role}`) }}
                </span>
            </td>
            <td>
                <span :class="['status-badge', user.isActive ? 'active' : 'inactive']">
                  {{ user.isActive ? $t('common.active') : $t('common.inactive') }}
                </span>
            </td>
            <td>
              <div class="actions">
                <ButtonComponent
                  v-if="!user.isAccountLocked"
                  variant="ghost"
                  size="sm"
                  @click="$emit('lock', user.id)"
                >
                  {{ $t('user.lockAccount') }}
                </ButtonComponent>
                <ButtonComponent
                  v-else
                  variant="ghost"
                  size="sm"
                  @click="$emit('unlock', user.id)"
                >
                  {{ $t('user.unlockAccount') }}
                </ButtonComponent>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="pagination" class="pagination">
        <ButtonComponent
          variant="ghost"
          :disabled="pagination.first"
          @click="$emit('pageChange', pagination.number - 1)"
        >
          {{ $t('common.previous') }}
        </ButtonComponent>

        <span class="pagination-info">
          Page {{ pagination.number + 1 }} of {{ pagination.totalPages }}
        </span>

        <ButtonComponent
          variant="ghost"
          :disabled="pagination.last"
          @click="$emit('pageChange', pagination.number + 1)"
        >
          {{ $t('common.next') }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;


.users-table {
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-3xl;
  gap: $spacing-lg;

  .spinner {
    width: 40px;
    height: 40px;
  }
}

.table-wrapper {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: $spacing-md;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      font-weight: $font-weight-semibold;
      color: var(--text-secondary);
      background: var(--bg-secondary);
    }

    tr:hover {
      background: var(--bg-tertiary);
    }
  }
}

.role-badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;

  &.role-admin {
    background: rgba(var(--color-primary), 0.1);
    color: var(--color-primary);
  }

  &.role-doctor {
    background: rgba(var(--color-secondary), 0.1);
    color: var(--color-secondary);
  }

  &.role-nurse {
    background: rgba(var(--color-accent), 0.1);
    color: var(--color-accent);
  }

  &.role-patient {
    background: rgba(var(--text-muted), 0.1);
    color: var(--text-muted);
  }
}

.status-badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;

  &.active {
    background: rgba(var(--color-success), 0.1);
    color: var(--color-success);
  }

  &.inactive {
    background: rgba(var(--color-error), 0.1);
    color: var(--color-error);
  }
}

.actions {
  display: flex;
  gap: $spacing-sm;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-lg;
  margin-top: $spacing-xl;
}

.pagination-info {
  font-weight: $font-weight-medium;
  color: var(--text-secondary);
}
</style>
