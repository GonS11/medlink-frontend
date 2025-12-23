<script setup lang="ts" generic="T extends Record<string, any>">
import {computed, ref} from 'vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import {Column, SortConfig, TableProps} from "@shared/types/table.types.ts";

const props = withDefaults(defineProps<TableProps<T>>(), {
  emptyMessage: 'No data found',
  rowKey: 'id' as any,
  selectable: false,
  showActions: true,
  rowClickable: true,
  striped: false,
  hover: true,
})

interface Emits<T> {
  (e: 'row-click', row: T): void

  (e: 'page-change', page: number): void

  (e: 'selection-change', selected: T[]): void

  (e: 'sort', config: SortConfig): void
}

const emit = defineEmits<Emits<T>>()
const activeRowKey = computed(() => props.rowKey as keyof T)

const selectedRows = defineModel<T[]>('selected', {default: []})
const sortConfig = ref<SortConfig | null>(null)

const hasSelection = computed(() => selectedRows.value.length > 0)

const allSelected = computed(() => {
  if (!props.data.length) {
    return false
  }
  return props.data.every(row => isRowSelected(row))
})

const someSelected = computed(() => hasSelection.value && !allSelected.value)


function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function getCellValue(row: T, column: Column<T>): any {
  if (column.render) {
    return column.render(row)
  }
  const key = String(column.key)
  if (key.includes('.')) {
    return getNestedValue(row, key)
  }
  return row[column.key as keyof T]
}

function formatCellValue(value: any): string {
  if (value === null || value === undefined) {
    return '-'
  }
  if (typeof value === 'boolean') {
    return value ? '✓' : '✗'
  }
  if (typeof value === 'number') {
    return value.toLocaleString()
  }
  if (value instanceof Date) {
    return value.toLocaleDateString()
  }
  return String(value)
}

function isRowSelected(row: T): boolean {
  const key = activeRowKey.value
  return selectedRows.value.some(selected => selected[key] === row[key])
}

function toggleRowSelection(row: T): void {
  const key = activeRowKey.value
  const isSelected = isRowSelected(row)

  if (isSelected) {
    selectedRows.value = selectedRows.value.filter(selected => selected[key] !== row[key])
  } else {
    selectedRows.value = [...selectedRows.value, row]
  }
  emit('selection-change', selectedRows.value)
}

function toggleAllSelection(): void {
  const key = activeRowKey.value
  if (allSelected.value) {
    const currentPageKeys = props.data.map(row => row[key])
    selectedRows.value = selectedRows.value.filter(row => !currentPageKeys.includes(row[key]))
  } else {
    const newSelections = props.data.filter(row => !isRowSelected(row))
    selectedRows.value = [...selectedRows.value, ...newSelections]
  }
  emit('selection-change', selectedRows.value)
}

function handleSort(column: Column<T>): void {
  if (!column.sortable) {
    return
  }
  const key = String(column.key)
  if (sortConfig.value?.key === key) {
    sortConfig.value.order = sortConfig.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    sortConfig.value = {key, order: 'asc'}
  }
  emit('sort', sortConfig.value)
}

function getSortIcon(column: Column<T>): string {
  if (!column.sortable) {
    return ''
  }
  const key = String(column.key)
  if (sortConfig.value?.key !== key) return '⇅'
  return sortConfig.value.order === 'asc' ? '↑' : '↓'
}

function handleRowClick(row: T): void {
  if (props.rowClickable) {
    emit('row-click', row)
  }
}
</script>

<template>
  <div class="data-table">
    <div v-if="loading && !data.length" class="data-table__state data-table__state--loading">
      <div class="data-table__spinner"></div>
      <p class="data-table__state-text">{{ $t('common.loading') }}</p>
    </div>

    <div v-else-if="!data.length" class="data-table__state data-table__state--empty">
      <p class="data-table__state-text">{{ emptyMessage }}</p>
      <slot name="empty-state"/>
    </div>

    <div v-else class="data-table__container">
      <table
        class="data-table__table"
        :class="{
          'data-table__table--striped': striped,
          'data-table__table--hoverable': hover
        }"
      >
        <thead class="data-table__head">
        <tr class="data-table__row">
          <th v-if="selectable" class="data-table__cell data-table__cell--header data-table__cell--checkbox">
            <input
              type="checkbox"
              class="data-table__checkbox"
              :checked="allSelected"
              :indeterminate="someSelected"
              @change="toggleAllSelection"
            />
          </th>

          <th
            v-for="column in columns"
            :key="String(column.key)"
            class="data-table__cell data-table__cell--header"
            :class="{
                'data-table__cell--sortable': column.sortable,
                'data-table__cell--sorted': sortConfig?.key === String(column.key)
              }"
            :style="{ width: column.width, textAlign: column.align || 'left' }"
            @click="handleSort(column)"
          >
            <div class="data-table__header-content">
              <span>{{ column.label }}</span>
              <span v-if="column.sortable" class="data-table__sort-icon">{{ getSortIcon(column) }}</span>
            </div>
          </th>

          <th v-if="showActions || $slots.actions"
              class="data-table__cell data-table__cell--header data-table__cell--actions">
            {{ $t('common.actions') }}
          </th>
        </tr>
        </thead>

        <tbody class="data-table__body">
        <tr
          v-for="row in data"
          :key="String(row[activeRowKey])"
          class="data-table__row"
          :class="{
              'data-table__row--selected': isRowSelected(row),
              'data-table__row--clickable': rowClickable
            }"
          @click="handleRowClick(row)"
        >
          <td v-if="selectable" class="data-table__cell data-table__cell--checkbox" @click.stop>
            <input
              type="checkbox"
              class="data-table__checkbox"
              :checked="isRowSelected(row)"
              @change="toggleRowSelection(row)"
            />
          </td>

          <td
            v-for="column in columns"
            :key="String(column.key)"
            class="data-table__cell"
            :style="{ textAlign: column.align || 'left' }"
          >
            <slot
              :name="`cell-${String(column.key)}`"
              :row="row"
              :value="getCellValue(row, column)"
            >
              {{ formatCellValue(getCellValue(row, column)) }}
            </slot>
          </td>

          <td v-if="showActions || $slots.actions" class="data-table__cell data-table__cell--actions">
            <slot name="actions" :row="row"/>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="pagination && pagination.totalPages > 1" class="data-table__pagination">
        <div class="data-table__pagination-info">
          <span class="data-table__info-text">
            {{ $t('common.table.showing') }} <strong>{{ data.length }}</strong> {{
              $t('common.table.of')
            }} <strong>{{ pagination.totalElements }}</strong>
          </span>
          <span v-if="hasSelection" class="data-table__selection-info">
            ({{ selectedRows.length }} {{ $t('common.selected') }})
          </span>
        </div>

        <div class="data-table__pagination-controls">
          <ButtonComponent
            variant="ghost"
            size="sm"
            class="data-table__pagination-btn"
            :disabled="pagination.first || loading"
            @click="emit('page-change', pagination.number - 1)"
          >
            ← {{ $t('common.previous') }}
          </ButtonComponent>

          <span class="data-table__page-indicator">
            {{ $t('common.table.page') }} <strong>{{ pagination.number + 1 }}</strong> {{
              $t('common.table.of')
            }} <strong>{{ pagination.totalPages }}</strong>
          </span>

          <ButtonComponent
            variant="ghost"
            size="sm"
            class="data-table__pagination-btn"
            :disabled="pagination.last || loading"
            @click="emit('page-change', pagination.number + 1)"
          >
            {{ $t('common.next') }} →
          </ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./DataTable.scss"></style>
