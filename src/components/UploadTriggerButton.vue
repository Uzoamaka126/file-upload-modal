<template>
    <button 
        class="btn" 
        type="button" 
        v-bind="$attrs"
        :class="[props.classNames, btnTypeClass, props.size]" 
        :style="props.styleObj"
        :disabled="props.disabled" 
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
import { reactive, computed } from 'vue';

import { TriggerButtonProps } from './types';
    const props = withDefaults(defineProps<TriggerButtonProps>(), {
        buttonType: 'outline',
        label: 'Click to upload',
        disabled: false,
        isCustomIcon: false,
        iconPosition: "none",
        size: 'md'
    });

    const btnTypeClass = computed(() => {
        return `btn--${props.buttonType}` || 'btn--block'
    })

</script>
  
  
<style scoped>

</style>
  