<template>
  <div>
    <component :is="props.buttonTag" @click="openModal" :class="props.buttonClass">
        <slot name="triggerButton" />
    </component>
    <div>
        <UploadModal v-bind="props" v-model:show="isModalOpen" v-model:files="fileList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadModal from './components/UploadModal.vue'
import { AppProps } from './components/types';

// import { AppProps } from './components/types.ts';
// import BaseUpload from './components/BaseUpload.vue'
const props = withDefaults(defineProps<Partial<AppProps>>(), {
  buttonTag: 'button',
  buttonClass: 'btn btn--text sm',
  isMulti: true,
  mimeTypes: ".pdf",
  maxUploadSize: 5000 * 1000, // 5MB
  styles: () => ({}),
  persist: true,
  align: 'center',
  disabled: false,
  modalContentClasses: '',
  files: null
});

  const fileList = ref([] as any[]);

  const isModalOpen = ref(false);

  const openModal = () => {  
    isModalOpen.value = true;
  }
</script>

<style scoped>
.app {
  position: relative;
}
</style>
