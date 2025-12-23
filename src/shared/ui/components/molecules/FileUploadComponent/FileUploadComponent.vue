<script setup lang="ts">
import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import UploadIcon from '@shared/ui/icons/UploadIcon.vue'
import FileGenericIcon from '@shared/ui/icons/FileGenericIcon.vue'
import RemoveIcon from '@shared/ui/icons/RemoveIcon.vue'
import {FileUploadProps} from "@shared/types/component.molecules.types.ts";
import CloudUploadIcon from "@shared/ui/icons/CloudUploadIcon.vue";

const {t} = useI18n()

const props = withDefaults(defineProps<FileUploadProps>(), {
  disabled: false,
  required: false,
  multiple: false,
  maxSize: 10, // MB
  maxFiles: 5,
  showPreview: true,
  variant: 'dropzone',
})

const emit = defineEmits<{
  'update:modelValue': [value: File | File[] | null]
  change: [files: File[]]
  error: [message: string]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const internalError = ref<string | null>(null)

const files = computed(() => {
  if (!props.modelValue) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const hasFiles = computed(() => files.value.length > 0)

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFilePreview = (file: File): string | null => {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
}

const validateFiles = (fileList: FileList | File[]): File[] => {
  internalError.value = null
  const validFiles: File[] = []
  const filesArray = Array.from(fileList)

  if (!props.multiple && filesArray.length > 1) {
    internalError.value = t('fileUpload.errors.singleFile')
    emit('error', internalError.value)
    return []
  }

  if (props.multiple && props.maxFiles && filesArray.length > props.maxFiles) {
    internalError.value = t('fileUpload.errors.maxFiles', {max: props.maxFiles})
    emit('error', internalError.value)
    return []
  }

  // Validar cada archivo
  for (const file of filesArray) {
    // Tamaño
    const sizeMB = file.size / (1024 * 1024)
    if (props.maxSize && sizeMB > props.maxSize) {
      internalError.value = t('fileUpload.errors.fileSize', {name: file.name, size: props.maxSize})
      emit('error', internalError.value)
      continue
    }

    // Tipo (Extensión/MIME)
    if (props.accept) {
      const acceptedTypes = props.accept.split(',').map(t => t.trim().toLowerCase())
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
      const fileType = file.type.toLowerCase()

      const isAllowed = acceptedTypes.some(type => {
        if (type.startsWith('.')) return type === fileExt
        if (type.endsWith('/*')) return fileType.startsWith(type.replace('/*', ''))
        return type === fileType
      })

      if (!isAllowed) {
        internalError.value = t('fileUpload.errors.fileType', {name: file.name})
        emit('error', internalError.value)
        continue
      }
    }

    validFiles.push(file)
  }

  return validFiles
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) {
    return
  }

  const validated = validateFiles(target.files)
  if (!validated.length) {
    return
  }

  const newValue = props.multiple ? validated : validated[0]
  emit('update:modelValue', newValue)
  emit('change', validated)

  target.value = ''
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  if (props.disabled) {
    return
  }

  const droppedFiles = event.dataTransfer?.files
  if (!droppedFiles?.length) {
    return
  }

  const validated = validateFiles(droppedFiles)
  if (!validated.length) {
    return
  }

  const newValue = props.multiple ? validated : validated[0]
  emit('update:modelValue', newValue)
  emit('change', validated)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
}

const removeFile = (index: number) => {
  const currentFiles = [...files.value]
  currentFiles.splice(index, 1)

  const newValue = props.multiple
    ? (currentFiles.length ? currentFiles : null)
    : null

  emit('update:modelValue', newValue)
}

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInputRef.value?.click()
  }
}
</script>

<template>
  <div class="file-upload">
    <label v-if="label" class="file-upload__label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <input
      ref="fileInputRef"
      type="file"
      class="file-upload__input-hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleFileChange"
    />

    <div
      v-if="variant === 'dropzone'"
      class="file-upload__dropzone"
      :class="{
        'file-upload__dropzone--dragging': isDragging,
        'file-upload__dropzone--disabled': disabled,
        'file-upload__dropzone--error': error || internalError
      }"
      @click="triggerFileInput"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <div class="file-upload__content">
        <CloudUploadIcon :label="$t('icons.cloudUpload')" class="file-upload__icon"/>

        <div class="file-upload__text-group">
          <span class="file-upload__cta">{{ t('fileUpload.cta') }}</span>
          <span class="file-upload__subtext">{{ t('fileUpload.subtext') }}</span>
        </div>

        <p v-if="accept || maxSize" class="file-upload__meta">
          <span v-if="accept">{{ accept }}</span>
          <span v-if="accept && maxSize"> · </span>
          <span v-if="maxSize">{{ t('fileUpload.maxSize', {size: maxSize}) }}</span>
        </p>
      </div>
    </div>

    <div v-else class="file-upload__button-wrapper">
      <ButtonComponent
        variant="outline"
        :disabled="disabled"
        @click="triggerFileInput"
      >
        <template #icon>
          <UploadIcon :label="$t('icons.uploadFile')"/>
        </template>
        {{ multiple ? t('fileUpload.selectFiles') : t('fileUpload.selectFile') }}
      </ButtonComponent>
    </div>

    <ul v-if="hasFiles && showPreview" class="file-upload__list">
      <li v-for="(file, index) in files" :key="index" class="file-item">
        <div class="file-item__preview">
          <img
            v-if="getFilePreview(file)"
            :src="getFilePreview(file)!"
            :alt="file.name"
            class="file-item__img"
          />
          <FileGenericIcon :label="$t('icons.genericFile')" v-else class="file-item__icon"/>
        </div>

        <div class="file-item__info">
          <p class="file-item__name" :title="file.name">{{ file.name }}</p>
          <p class="file-item__size">{{ formatFileSize(file.size) }}</p>
        </div>

        <button
          type="button"
          class="file-item__remove"
          :disabled="disabled"
          @click="removeFile(index)"
          :aria-label="t('fileUpload.removeFile')"
        >
          <RemoveIcon :label="$t('icons.removeFile')"/>
        </button>
      </li>
    </ul>

    <p v-if="error || internalError" class="file-upload__error">
      {{ error || internalError }}
    </p>
    <p v-else-if="hint" class="file-upload__hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./FileUploadComponent.scss"></style>
