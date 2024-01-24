<template>
  <div class="app">
    <button 
      class="btn" 
      type="button" 
      v-bind="$attrs"
      :class="[props.buttonOptions.classes, btnTypeClass, props.buttonOptions.size]" 
      :style="props.buttonOptions.styleObj"
      :disabled="props.buttonOptions.disabled" 
      @click="triggerUploadModal"
    >
    <span>
        <slot v-if="props.buttonOptions.iconPosition === 'left'" name="left-icon" />
        <span>
            {{ props.buttonOptions.label }}
        </span>
        <slot v-if="props.buttonOptions.iconPosition === 'right'" name="suffix-icon" />
    </span>
    </button>
    <template v-if="isModalOpen">
      <UploadModal @closeModal="triggerUploadModal" v-bind="{ ...props.modalOptions }" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AppProps } from './components/types.ts';
import UploadModal from './components/UploadModal.vue'

const isModalOpen = ref(false);

const props = withDefaults(defineProps<Partial<AppProps>>(), {
  buttonOptions: () => ({
    buttonType: 'text',
    label: 'Click to upload',
    disabled: false,
    isCustomIcon: false,
    iconPosition: "none",
    size: 'md',
    classes: '',
    styleObj: null
  }),
  modalOptions: () => ({})
});

const triggerUploadModal = () => {  
  isModalOpen.value = !isModalOpen.value;
}

const btnTypeClass = computed(() => {
  return `btn--${props.buttonOptions.buttonType}` || 'btn--block'
});

</script>

<style scoped>
.app {
  position: relative;
}
</style>
