// ✅ entities/{entity}/model/use{Entity}.ts
export function use{Entity}() {
  const store = use{Entity}Store()
  const {items, pagination} = storeToRefs(store)

  const entityStore = {
    items,
    pagination,
    setItems: store.setItems,
    setPagination: store.setPagination,
    updateItem: store.updateItem,
    removeItem: store.removeItem,
  }

  const entityService = {
    getAll: {entity}Service.getAll,
    getById: {entity}Service.getById,
    create: {entity}Service.create,
    update: {entity}Service.update,
    delete: {entity}Service.delete,
  }

  const crud = useEntityCrud(entityStore, entityService, '{Entity}')

  // Acciones específicas aquí (si las hay)

  return {
    ...crud,
    // acciones específicas
  }
}


<!-- ✅ pages/{entity}Page.vue -->
<script setup lang="ts">
const {items, loading, pagination, fetchAll, create, update, remove} = use{Entity}()
const {canCreate, canEdit, canDelete} = use{Entity}Permissions()
const {confirm} = useConfirm()
const createModal = useModal()
const editModal = useModal()

  // Handlers simples usando los composables
  </script>
