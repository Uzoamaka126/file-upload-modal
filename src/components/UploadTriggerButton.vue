<template>
    <button 
        class="btn" 
        type="button" 
        v-bind="$attrs"
        :class="[props.classNames, btnTypeClass, props.size]" 
        :style="props.styleObj"
        :disabled="props.disabled" 
        @click="$emit('click')"
    >
        <span>
            <slot v-if="props.iconPosition === 'left'" name="left-icon" />
            <span>
                {{ props.label }}
            </span>
            <slot v-if="props.iconPosition === 'right'" name="suffix-icon" />
        </span>
    </button>
  </template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { TriggerButtonProps } from './types';

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<Partial<TriggerButtonProps>>(), {
  buttonType: 'text',
  label: 'Click to upload',
  disabled: false,
  isCustomIcon: false,
  iconPosition: "none",
  size: 'md',
});

const btnTypeClass = computed(() => {
    return `btn--${props.buttonType}` || 'btn--block'
})

</script>
  
<style scoped>
</style>
  