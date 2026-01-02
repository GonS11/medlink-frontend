<script setup lang="ts">
import {computed, toRef} from 'vue'
import {useI18n} from 'vue-i18n'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import DetailSection from '@shared/ui/components/molecules/DetailSection/DetailSection.vue'
import SkeletonLoader from '@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue'
import DataField from '@shared/ui/components/molecules/DataFieldComponent/DataFieldComponent.vue'
import EmergencyIcon from "@shared/ui/icons/EmergencyIcon.vue"
import ICUIcon from "@shared/ui/icons/ICUIcon.vue"
import HeliportIcon from "@shared/ui/icons/HeliportIcon.vue"
import TeachingHospitalIcon from "@shared/ui/icons/TeachingHospitalIcon.vue"
import type {
  HealthCenterDetailViewProps,
  HealthCenterField,
  HealthCenterServiceField
} from "@entities/healthCenter/model/types/health.ui.types.ts"
import {useHealthCenterFormatters} from "@entities/healthCenter/model/composables/useHealthCenterFormatter.ts"
import {
  getHealthCenterLevelVariant,
  getHealthCenterTypeVariant,
  getHealthCenterTypeIcon
} from "@entities/healthCenter/model/config/useHealthCenterConfig.ts"

const props = defineProps<HealthCenterDetailViewProps>()
const {t} = useI18n()

const healthCenterRef = toRef(props, 'healthCenter')
const {formatBeds} = useHealthCenterFormatters(healthCenterRef)

const basicInfoFields = computed<HealthCenterField[]>(() => [
  {key: 'code', label: t('fields.code')},
  {key: 'name', label: t('fields.name')},
  {
    key: 'type',
    label: t('fields.type'),
    formatter: (value: string) => t(`healthCenter.types.${value}`)
  },
  {
    key: 'level',
    label: t('fields.level'),
    formatter: (value: string) => t(`healthCenter.levels.${value}`)
  }
])

const locationFields = computed<HealthCenterField[]>(() => [
  {
    key: 'autonomousCommunity',
    label: t('fields.autonomousCommunity'),
    formatter: (value: string) => t(`autonomousCommunities.${value}`)
  },
  {key: 'address', label: t('fields.address')},
  {key: 'city', label: t('fields.city')},
  {key: 'province', label: t('fields.province')},
  {key: 'postalCode', label: t('fields.postalCode')}
])

const contactFields = computed<HealthCenterField[]>(() => [
  {key: 'phone', label: t('fields.phone')},
  {key: 'emergencyPhone', label: t('fields.emergencyPhone')},
  {key: 'email', label: t('fields.email')},
  {key: 'website', label: t('fields.website'), isLink: true}
])

const capacityFields = computed<HealthCenterField[]>(() => [
  {key: 'totalBeds', label: t('fields.totalBeds')},
  {key: 'icuBeds', label: t('fields.icuBeds'), conditional: true},
  {key: 'emergencyBeds', label: t('fields.emergencyBeds'), conditional: true},
  {
    key: 'totalBeds',
    label: t('fields.bedsDetail'),
    customValue: formatBeds.value
  }
])

const services = computed<HealthCenterServiceField[]>(() => [
  {
    key: 'hasEmergency',
    label: t('fields.hasEmergency'),
    variant: 'error',
    icon: EmergencyIcon
  },
  {
    key: 'hasICU',
    label: t('fields.hasICU'),
    variant: 'warning',
    icon: ICUIcon
  },
  {
    key: 'hasHeliport',
    label: t('fields.hasHeliport'),
    variant: 'info',
    icon: HeliportIcon
  },
  {
    key: 'isTeachingHospital',
    label: t('fields.isTeachingHospital'),
    variant: 'accent',
    icon: TeachingHospitalIcon
  }
])

const getFieldValue = (field: HealthCenterField): string | undefined => {
  if (!props.healthCenter) {
    return undefined
  }

  const value = props.healthCenter[field.key]

  if (field.customValue !== undefined) {
    return field.customValue
  }
  if (field.formatter && value != null) {
    return field.formatter(value)
  }
  if (value != null) {
    return value.toString()
  }

  return undefined
}

const shouldShowField = (field: HealthCenterField): boolean => {
  if (!field.conditional) {
    return true
  }
  if (!props.healthCenter) {
    return false
  }

  const value = props.healthCenter[field.key]
  return value != null && value !== 0 && value !== ''
}
</script>

<template>
  <div class="health-center-view">
    <!-- Header -->
    <header class="health-center-view__header">
      <div class="health-center-view__icon-wrapper">
        <SkeletonLoader v-if="loading" circle width="80px" height="80px"/>
        <div v-else class="health-center-view__icon">
          <component :is="getHealthCenterTypeIcon(healthCenter!.type)"/>
        </div>
      </div>

      <div class="health-center-view__title-group">
        <template v-if="loading">
          <SkeletonLoader width="350px" height="2rem" class="mb-2"/>
          <SkeletonLoader width="250px" height="1rem" class="mb-2"/>
          <SkeletonLoader width="200px" height="1rem"/>
        </template>
        <template v-else-if="healthCenter">
          <h2 class="health-center-view__name">{{ healthCenter.name }}</h2>
          <p class="health-center-view__subtitle">
            {{ healthCenter.code }} • {{ healthCenter.city }}, {{ healthCenter.province }}
          </p>

          <div class="health-center-view__badges">
            <BadgeComponent :variant="getHealthCenterTypeVariant(healthCenter.type)">
              {{ t(`healthCenter.types.${healthCenter.type}`) }}
            </BadgeComponent>
            <BadgeComponent :variant="getHealthCenterLevelVariant(healthCenter.level)">
              {{ t(`healthCenter.levels.${healthCenter.level}`) }}
            </BadgeComponent>
            <BadgeComponent :variant="healthCenter.isPublic ? 'success' : 'secondary'">
              {{ healthCenter.isPublic ? t('healthCenter.public') : t('healthCenter.private') }}
            </BadgeComponent>
          </div>
        </template>
      </div>
    </header>

    <hr class="health-center-view__divider"/>

    <!-- Contenido en Grid -->
    <div class="health-center-view__grid">
      <!-- Información Básica -->
      <DetailSection :title="t('entities.healthCenter.basicInfo')">
        <DataField
          v-for="field in basicInfoFields"
          :key="field.key"
          :label="field.label"
          :value="getFieldValue(field)"
          :loading="loading"
        />
      </DetailSection>

      <!-- Ubicación -->
      <DetailSection :title="t('entities.healthCenter.locationInfo')">
        <DataField
          v-for="field in locationFields"
          :key="field.key"
          :label="field.label"
          :value="getFieldValue(field)"
          :loading="loading"
        />
      </DetailSection>

      <!-- Contacto -->
      <DetailSection :title="t('entities.healthCenter.contactInfo')">
        <template v-for="field in contactFields" :key="field.key">
          <!-- Campo normal -->
          <DataField
            v-if="!field.isLink"
            :label="field.label"
            :value="getFieldValue(field)"
            :loading="loading"
          />
          <!-- Campo link (website) -->
          <DataField
            v-else
            :label="field.label"
            :loading="loading"
          >
            <a
              v-if="healthCenter?.website"
              :href="healthCenter.website"
              target="_blank"
              class="health-center-view__link"
            >
              {{ healthCenter.website }}
            </a>
          </DataField>
        </template>
      </DetailSection>

      <!-- Capacidad -->
      <DetailSection
        v-if="loading || (healthCenter?.totalBeds && healthCenter.totalBeds > 0)"
        :title="t('entities.healthCenter.capacityInfo')"
      >
        <DataField
          v-for="(field, index) in capacityFields"
          :key="`${field.key}-${index}`"
          v-show="shouldShowField(field)"
          :label="field.label"
          :value="getFieldValue(field)"
          :loading="loading"
        />
      </DetailSection>

      <!-- Servicios -->
      <DetailSection
        :title="t('entities.healthCenter.services')"
        class="health-center-view__section--full"
      >
        <div class="health-center-view__services">
          <DataField
            v-for="service in services"
            :key="service.key"
            :label="service.label"
            :loading="loading"
          >
            <BadgeComponent
              v-if="healthCenter"
              :variant="healthCenter[service.key] ? service.variant : 'secondary'"
              :icon="healthCenter[service.key] ? service.icon : undefined"
              size="sm"
            >
              {{ healthCenter[service.key] ? t('common.yes') : t('common.no') }}
            </BadgeComponent>
          </DataField>
        </div>
      </DetailSection>

      <!-- Acreditaciones -->
      <DetailSection
        v-if="loading || healthCenter?.accreditations"
        :title="t('entities.healthCenter.accreditations')"
        class="health-center-view__section--full"
      >
        <DataField :label="t('fields.accreditations')" :loading="loading">
          <p v-if="healthCenter?.accreditations" class="health-center-view__accreditations">
            {{ healthCenter.accreditations }}
          </p>
        </DataField>
      </DetailSection>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./HealthCenterDetailView.scss"></style>
