<script setup lang="ts">
import {ref, computed} from 'vue'
import {FileUploadProps} from "@shared/types/reports.types.ts";

const props = withDefaults(defineProps<FileUploadProps>(), {
  disabled: false,
  required: false,
  multiple: false,
  maxSize: 10,
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
const uploadError = ref('')

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
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const validateFiles = (filesToValidate: FileList | File[]): File[] => {
  uploadError.value = ''
  const validFiles: File[] = []
  const fileArray = Array.from(filesToValidate)

  // Validar número máximo de archivos
  if (!props.multiple && fileArray.length > 1) {
    uploadError.value = 'Solo puedes subir un archivo'
    emit('error', uploadError.value)
    return []
  }

  if (props.maxFiles && fileArray.length > props.maxFiles) {
    uploadError.value = `Solo puedes subir hasta ${props.maxFiles} archivos`
    emit('error', uploadError.value)
    return []
  }

  // Validar cada archivo
  for (const file of fileArray) {
    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024)
    if (props.maxSize && fileSizeMB > props.maxSize) {
      uploadError.value = `El archivo ${file.name} excede el tamaño máximo de ${props.maxSize}MB`
      emit('error', uploadError.value)
      continue
    }

    // Validar tipo de archivo
    if (props.accept) {
      const acceptedTypes = props.accept.split(',').map(type => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const fileType = file.type

      const isAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return fileExtension === acceptedType
        }
        if (acceptedType.endsWith('/*')) {
          return fileType.startsWith(acceptedType.replace('/*', ''))
        }
        return fileType === acceptedType
      })

      if (!isAccepted) {
        uploadError.value = `Tipo de archivo no permitido: ${file.name}`
        emit('error', uploadError.value)
        continue
      }
    }

    validFiles.push(file)
  }

  return validFiles
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const validFiles = validateFiles(target.files)
  if (validFiles.length === 0) return

  const newValue = props.multiple ? validFiles : validFiles[0]
  emit('update:modelValue', newValue)
  emit('change', validFiles)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  if (props.disabled) return

  const droppedFiles = event.dataTransfer?.files
  if (!droppedFiles || droppedFiles.length === 0) return

  const validFiles = validateFiles(droppedFiles)
  if (validFiles.length === 0) return

  const newValue = props.multiple ? validFiles : validFiles[0]
  emit('update:modelValue', newValue)
  emit('change', validFiles)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  isDragging.value = false
}

const removeFile = (index: number) => {
  const currentFiles = [...files.value]
  currentFiles.splice(index, 1)

  const newValue = props.multiple
    ? (currentFiles.length > 0 ? currentFiles : null)
    : null

  emit('update:modelValue', newValue)
}

const openFileDialog = () => {
  if (!props.disabled && fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const getFilePreview = (file: File): string | null => {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
}
</script>

<template>
  <div class="file-upload-wrapper">
    <label v-if="label" class="file-upload-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="file-input-hidden"
      @change="handleFileChange"
    />

    <!-- Dropzone Variant -->
    <div
      v-if="variant === 'dropzone'"
      class="file-dropzone"
      :class="{
        'file-dropzone-dragging': isDragging,
        'file-dropzone-disabled': disabled,
        'file-dropzone-error': error || uploadError,
      }"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="openFileDialog"
    >
      <div class="file-dropzone-content">
        <svg
          class="file-dropzone-icon"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 8V30M24 8L18 14M24 8L30 14M8 30V38C8 39.1046 8.89543 40 10 40H38C39.1046 40 40 39.1046 40 38V30"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="file-dropzone-text">
          <span class="file-dropzone-text-primary">
            Haz clic para seleccionar
          </span>
          <span class="file-dropzone-text-secondary">
            o arrastra y suelta archivos aquí
          </span>
        </p>
        <p v-if="accept || maxSize" class="file-dropzone-hint">
          <span v-if="accept">{{ accept }}</span>
          <span v-if="accept && maxSize"> · </span>
          <span v-if="maxSize">Máx. {{ maxSize }}MB</span>
        </p>
      </div>
    </div>

    <!-- Button Variant -->
    <button
      v-else
      type="button"
      class="file-button"
      :disabled="disabled"
      @click="openFileDialog"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 4V14M10 4L7 7M10 4L13 7M4 14V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Seleccionar archivo{{ multiple ? 's' : '' }}
    </button>

    <!-- File Preview List -->
    <div v-if="hasFiles && showPreview" class="file-list">
      <div
        v-for="(file, index) in files"
        :key="`${file.name}-${index}`"
        class="file-item"
      >
        <div class="file-item-preview">
          <img
            v-if="getFilePreview(file)"
            :src="getFilePreview(file)!"
            :alt="file.name"
            class="file-item-image"
          />
          <svg
            v-else
            class="file-item-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="file-item-info">
          <p class="file-item-name">{{ file.name }}</p>
          <p class="file-item-size">{{ formatFileSize(file.size) }}</p>
        </div>

        <button
          type="button"
          class="file-item-remove"
          :disabled="disabled"
          @click.stop="removeFile(index)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <p v-if="error || uploadError" class="file-upload-error">
      {{ error || uploadError }}
    </p>
    <p v-else-if="hint" class="file-upload-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./FileUploadComponent.scss"></style>
