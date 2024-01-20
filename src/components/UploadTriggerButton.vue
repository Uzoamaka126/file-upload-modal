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

const props = withDefaults(defineProps<TriggerButtonProps>(), {
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
.btn {
  display: inline-block;
  line-height: 24px; /* 150% */
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 5px !important;
  transition: all 0.3s ease-in-out;
  font-family: inherit;
  outline: none;
  font-weight: 500 !important;
}

.btn.sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn.md {
  padding: 8px 16px;
  font-size: 14px;
}

.btn.lg {
  padding: 12px 16px;
  font-size: 16px;
}

.btn span {
  color: inherit;
}

.btn svg {
  fill: inherit;
}

.btn--block {
  background-color: #646cff;
  border: transparent;
  color: #f2f2f2;
}

.btn-block:focus, .btn-block:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.btn--text {
  outline: none;
  border: none;
  background: transparent !important;
  font-size: 14px;
  box-shadow: none;   
  opacity: 1; 
  font-weight: 600;
}

.btn--text {
  color: #646cff;
}

.btn--text:hover {
  color: #5258da;
}

.btn--outline {
  background: transparent;
  box-shadow: none !important;
  border: 1px solid #646cff;
  background: #fff;
  color: #646cff;
}
</style>
  