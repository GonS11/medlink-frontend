import {computed, Ref} from 'vue';
import {useI18n} from 'vue-i18n';
import type {HealthCenterResponse} from '@entities/healthCenter/model/types/healthCenter.types';
import type {
  FormattedHealthCenterName,
  FormattedHealthCenterLocation,
  HealthCenterFormatters
} from '@entities/healthCenter/model/types/health.composables.types';

export function useHealthCenterFormatters(healthCenter: Ref<HealthCenterResponse | null | undefined>): HealthCenterFormatters {
  const {t} = useI18n();

  const formatName = computed<FormattedHealthCenterName>(() => {
    if (!healthCenter.value) {
      return {main: '', secondary: '', type: ''};
    }
    return {
      main: healthCenter.value.name,
      secondary: healthCenter.value.code,
      type: t(`healthCenter.types.${healthCenter.value.type}`)
    };
  });

  const formatLocation = computed<FormattedHealthCenterLocation>(() => {
    if (!healthCenter.value) {
      return {main: '', secondary: '', full: ''};
    }
    const {address, city, province, postalCode} = healthCenter.value;
    return {
      main: `${city}, ${province}`,
      secondary: address,
      full: `${address}, ${postalCode} ${city} (${province})`
    };
  });

  const formatBeds = computed<string>(() => {
    if (!healthCenter.value) return '';
    const {totalBeds, icuBeds, emergencyBeds} = healthCenter.value;

    const details = [];
    if (icuBeds > 0) details.push(`UCI: ${icuBeds}`);
    if (emergencyBeds > 0) details.push(`Urg: ${emergencyBeds}`);

    if (details.length > 0) {
      return `${totalBeds} Total (${details.join(', ')})`;
    }
    return `${totalBeds}`;
  });

  const hasServices = computed<boolean>(() => {
    if (!healthCenter.value) return false;
    return healthCenter.value.hasEmergency ||
      healthCenter.value.hasICU ||
      healthCenter.value.hasHeliport ||
      healthCenter.value.isTeachingHospital;
  });

  const servicesCount = computed<number>(() => {
    if (!healthCenter.value) return 0;
    let count = 0;
    if (healthCenter.value.hasEmergency) count++;
    if (healthCenter.value.hasICU) count++;
    if (healthCenter.value.hasHeliport) count++;
    if (healthCenter.value.isTeachingHospital) count++;
    return count;
  });

  return {
    formatName,
    formatLocation,
    formatBeds,
    hasServices,
    servicesCount
  };
}

/**
 * Formateadores estáticos sin reactividad para uso en templates
 */
export const healthCenterFormattersStatic = {
  formatName(healthCenter: HealthCenterResponse, t: (key: string) => string): FormattedHealthCenterName {
    return {
      main: healthCenter.name,
      secondary: healthCenter.code,
      type: t(`healthCenter.types.${healthCenter.type}`)
    }
  },

  formatLocation(healthCenter: HealthCenterResponse, t: (key: string) => string): FormattedHealthCenterLocation {
    return {
      main: `${healthCenter.city}, ${healthCenter.province}`,
      secondary: t(`autonomousCommunities.${healthCenter.autonomousCommunity}`),
      full: `${healthCenter.address}, ${healthCenter.postalCode} ${healthCenter.city}, ${healthCenter.province}`
    }
  },

  formatBeds(healthCenter: HealthCenterResponse, t: (key: string) => string): string {
    const parts: string[] = []

    if (healthCenter.totalBeds) {
      parts.push(`${healthCenter.totalBeds} ${t('fields.totalBeds')}`)
    }
    if (healthCenter.icuBeds) {
      parts.push(`${healthCenter.icuBeds} ${t('fields.icuBeds')}`)
    }
    if (healthCenter.emergencyBeds) {
      parts.push(`${healthCenter.emergencyBeds} ${t('fields.emergencyBeds')}`)
    }

    return parts.length > 0 ? parts.join(' | ') : '-'
  }
}
