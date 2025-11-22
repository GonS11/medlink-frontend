<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  title?: string
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
})

const cardClasses = computed(() => [
  'card',
  `card-${props.variant}`,
  `card-padding-${props.padding}`,
])
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
      </slot>
    </div>

    <div class="card-body">
      <slot/>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"/>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.card {
  background-color: $bg-primary;
  border-radius: $radius-xl;
  overflow: hidden;
  transition: all $transition-base;

  &-default {
    border: 1px solid $border-color;
  }

  &-bordered {
    border: 2px solid $border-color;
  }

  &-elevated {
    box-shadow: $shadow-lg;

    &:hover {
      box-shadow: $shadow-xl;
      transform: translateY(-2px);
    }
  }

  &-padding {
    &-none {
      .card-body {
        padding: 0;
      }
    }

    &-sm {
      .card-body {
        padding: $spacing-md;
      }
    }

    &-md {
      .card-body {
        padding: $spacing-lg;
      }
    }

    &-lg {
      .card-body {
        padding: $spacing-xl;
      }
    }
  }
}

.card-header {
  padding: $spacing-lg;
  border-bottom: 1px solid $border-color;
  background-color: $bg-secondary;
}

.card-title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
}

.card-body {
  padding: $spacing-lg;
}

.card-footer {
  padding: $spacing-lg;
  border-top: 1px solid $border-color;
  background-color: $bg-secondary;
}
</style>
