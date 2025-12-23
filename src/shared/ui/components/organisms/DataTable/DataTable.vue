<script setup lang="ts" generic="T extends Record<string, any>">
import {computed, ref} from 'vue'
import {useI18n} from "vue-i18n"
import {Column, SortConfig, TableProps} from "@shared/types/table.types.ts"
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import SkeletonLoader from '@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue'
import CheckIcon from "@shared/ui/icons/CheckIcon.vue"
import XIcon from "@shared/ui/icons/XIcon.vue"
import ChevronDownIcon from "@shared/ui/icons/ChevronDownIcon.vue"
import CheckComponent from "@shared/ui/components/atoms/CheckComponent/CheckComponent.vue";
import ArrowLeftIcon from "@shared/ui/icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "@shared/ui/icons/ArrowRightIcon.vue";


const {t} = useI18n()

const props = withDefaults(defineProps<TableProps<T>>(), {
  emptyMessage: '',
  rowKey: 'id' as any,
  selectable: false,
  showActions: true,
  rowClickable: false,
  striped: false,
  hover: true,
  loading: false,
  data: () => [],
  columns: () => []
})

const emit = defineEmits<{
  (e: 'row-click', row: T): void
  (e: 'page-change', page: number): void
  (e: 'selection-change', selected: T[]): void
  (e: 'sort', config: SortConfig): void
}>()

const activeRowKey = computed(() => props.rowKey as keyof T)
const selectedRows = defineModel<T[]>('selected', {default: []})
const sortConfig = ref<SortConfig | null>(null)

// --- Selection Logic ---

const hasSelection = computed(() => selectedRows.value.length > 0)

const allSelected = computed(() => {
  if (!props.data.length) return false
  const visibleIds = props.data.map(row => row[activeRowKey.value])
  return visibleIds.every(id =>
    selectedRows.value.some(selected => selected[activeRowKey.value] === id)
  )
})

const isIndeterminate = computed(() => {
  if (!props.data.length || allSelected.value) return false
  return selectedRows.value.some(selected =>
    props.data.some(row => row[activeRowKey.value] === selected[activeRowKey.value])
  )
})

function isRowSelected(row: T): boolean {
  const key = activeRowKey.value
  return selectedRows.value.some(selected => selected[key] === row[key])
}

function toggleRowSelection(row: T, isChecked: boolean): void {
  const key = activeRowKey.value

  if (!isChecked) {
    selectedRows.value = selectedRows.value.filter(selected => selected[key] !== row[key])
  } else {
    if (!isRowSelected(row)) {
      selectedRows.value = [...selectedRows.value, row]
    }
  }
  emit('selection-change', selectedRows.value)
}

function toggleAllSelection(isChecked: boolean): void {
  const key = activeRowKey.value
  const visibleRows = props.data

  if (!isChecked) {
    const visibleKeys = visibleRows.map(r => r[key])
    selectedRows.value = selectedRows.value.filter(selected => !visibleKeys.includes(selected[key]))
  } else {
    const newSelections = visibleRows.filter(row => !isRowSelected(row))
    selectedRows.value = [...selectedRows.value, ...newSelections]
  }
  emit('selection-change', selectedRows.value)
}

// --- Cell Rendering ---

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function getCellValue(row: T, column: Column<T>): any {
  if (column.render) return column.render(row)
  const key = String(column.key)
  return key.includes('.') ? getNestedValue(row, key) : row[column.key as keyof T]
}

function formatCellValue(value: any): string {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'number') return value.toLocaleString()
  if (value instanceof Date) return value.toLocaleDateString()
  return String(value)
}

// --- Sorting ---

function handleSort(column: Column<T>): void {
  if (!column.sortable) return

  const key = String(column.key)
  let order: 'asc' | 'desc' = 'asc'

  if (sortConfig.value?.key === key) {
    order = sortConfig.value.order === 'asc' ? 'desc' : 'asc'
  }

  sortConfig.value = {key, order}
  emit('sort', sortConfig.value)
}

// --- Events ---

function handleRowClick(row: T): void {
  if (props.rowClickable) {
    emit('row-click', row)
  }
}

function handlePageChange(page: number): void {
  emit('page-change', page)
}
</script>

<template>
  <div class="data-table">
    <div class="data-table__container">
      <table
        class="data-table__table"
        :class="{
          'data-table__table--striped': striped,
          'data-table__table--hoverable': hover && !loading
        }"
      >
        <!-- Table Header -->
        <thead class="data-table__head">
        <tr class="data-table__row">
          <!-- Selection Column -->
          <th
            v-if="selectable"
            class="data-table__cell data-table__cell--header data-table__cell--checkbox"
          >
            <CheckComponent
              :model-value="allSelected"
              :indeterminate="isIndeterminate"
              size="sm"
              @update:model-value="toggleAllSelection"
            />
          </th>

          <!-- Data Columns -->
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
            <div
              class="data-table__header-content"
              :class="`data-table__header-content--${column.align || 'left'}`"
            >
              <span class="data-table__header-text">{{ column.label }}</span>

              <span v-if="column.sortable" class="data-table__sort-icon">
                <ChevronDownIcon
                  :label="$t('icons.chevronDown')"
                  class="data-table__sort-arrow"
                  :class="{
                    'data-table__sort-arrow--asc': sortConfig?.key === String(column.key) && sortConfig?.order === 'asc',
                    'data-table__sort-arrow--desc': sortConfig?.key === String(column.key) && sortConfig?.order === 'desc',
                    'data-table__sort-arrow--inactive': sortConfig?.key !== String(column.key)
                  }"
                />
              </span>
            </div>
          </th>

          <!-- Actions Column -->
          <th
            v-if="showActions || $slots.actions"
            class="data-table__cell data-table__cell--header data-table__cell--actions"
          >
            {{ t('common.actions') }}
          </th>
        </tr>
        </thead>

        <!-- Loading State -->
        <tbody v-if="loading" class="data-table__body">
        <tr
          v-for="i in (pagination?.size || 5)"
          :key="`skeleton-${i}`"
          class="data-table__row"
        >
          <td v-if="selectable" class="data-table__cell">
            <SkeletonLoader width="20px" height="20px"/>
          </td>
          <td
            v-for="col in columns"
            :key="`skeleton-col-${String(col.key)}`"
            class="data-table__cell"
          >
            <SkeletonLoader width="80%"/>
          </td>
          <td v-if="showActions || $slots.actions" class="data-table__cell">
            <SkeletonLoader width="100%"/>
          </td>
        </tr>
        </tbody>

        <!-- Empty State -->
        <tbody v-else-if="!data.length" class="data-table__body">
        <tr class="data-table__row">
          <td
            :colspan="columns.length + (selectable ? 1 : 0) + ((showActions || $slots.actions) ? 1 : 0)"
            class="data-table__cell data-table__cell--empty"
          >
            <div class="data-table__empty-state">
              <slot name="empty-state">
                <p class="data-table__empty-message">
                  {{ emptyMessage || t('common.table.noData') }}
                </p>
              </slot>
            </div>
          </td>
        </tr>
        </tbody>

        <!-- Data Rows -->
        <tbody v-else class="data-table__body">
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
          <!-- Selection Cell -->
          <td
            v-if="selectable"
            class="data-table__cell data-table__cell--checkbox"
            @click.stop
          >
            <CheckComponent
              :model-value="isRowSelected(row)"
              size="sm"
              @update:model-value="(val: boolean) => toggleRowSelection(row, val)"
            />
          </td>

          <!-- Data Cells -->
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
              <!-- Boolean Values -->
              <div
                v-if="typeof getCellValue(row, column) === 'boolean'"
                class="data-table__cell-boolean"
              >
                <CheckIcon
                  :label="$t('icons.check')"
                  v-if="getCellValue(row, column)"
                  class="data-table__boolean-icon data-table__boolean-icon--true"
                />
                <XIcon
                  :label="$t('icons.X')"
                  v-else
                  class="data-table__boolean-icon data-table__boolean-icon--false"
                />
              </div>

              <!-- Other Values -->
              <span v-else class="data-table__cell-content">
                {{ formatCellValue(getCellValue(row, column)) }}
              </span>
            </slot>
          </td>

          <!-- Actions Cell -->
          <td
            v-if="showActions || $slots.actions"
            class="data-table__cell data-table__cell--actions"
            @click.stop
          >
            <div class="data-table__actions-wrapper">
              <slot name="actions" :row="row"/>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination && pagination.totalPages > 1"
      class="data-table__pagination"
    >
      <div class="data-table__pagination-info">
        <span class="data-table__info-text">
          {{ t('common.table.showing') }}
          <strong class="data-table__info-highlight">
            {{
              (pagination.number * pagination.size) + 1
            }}-{{ Math.min((pagination.number + 1) * pagination.size, pagination.totalElements) }}
          </strong>
          {{ t('common.table.of') }}
          <strong class="data-table__info-highlight">{{ pagination.totalElements }}</strong>
        </span>
        <span
          v-if="hasSelection"
          class="data-table__selection-info"
        >
          ({{ selectedRows.length }} {{ t('common.selected') }})
        </span>
      </div>

      <div class="data-table__pagination-controls">
        <ButtonComponent
          variant="ghost"
          size="sm"
          :disabled="pagination.first || loading"
          @click="handlePageChange(pagination.number - 1)"
        >
          <template #icon>
            <ArrowLeftIcon :label="$t('icons.arrowLeft')"/>
          </template>
          {{ t('common.previous') }}
        </ButtonComponent>

        <span class="data-table__page-indicator">
          {{ pagination.number + 1 }} / {{ pagination.totalPages }}
        </span>

        <ButtonComponent
          variant="ghost"
          size="sm"
          :disabled="pagination.last || loading"
          @click="handlePageChange(pagination.number + 1)"
        >
          {{ t('common.next') }}
          <template #icon>
            <ArrowRightIcon :label="$t('icons.arrowRight')"/>
          </template>
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./DataTable.scss"></style>
