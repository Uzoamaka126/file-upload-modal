<template>
  <div>
    <component :is="props.buttonTag" @click="emit('open')" :class="props.buttonClass">
      <slot name="triggerButton" />
    </component>
    <div>
      <UploadModal v-bind="props" v-model:show="props.show" v-model:files="props.files" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadModal from './components/UploadModal.vue'
import { AppProps } from './components/types';
// import BaseUpload from './components/BaseUpload.vue'

const emit = defineEmits(['open']);

const props = withDefaults(defineProps<Partial<AppProps>>(), {
  buttonTag: 'button',
  buttonClass: 'btn btn--text sm',
  isMulti: false,
  mimeTypes: ".pdf",
  maxUploadSize: 5000 * 1000, // 5MB
  styles: () => ({}),
  persist: true,
  align: 'center',
  disabled: false,
  modalContentClasses: '',
  files: null,
  show: false,

});
</script>

<style scoped>
.app {
  position: relative;
}
</style>
