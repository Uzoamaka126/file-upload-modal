<template>
  <div class="app">
    <UploadTriggerButton @click="triggerUploadModal" v-bind="{ ...fileUploadOptions.buttonOptions} " />
    <template v-if="isModalOpen">
      <UploadModal @closeModal="triggerUploadModal" v-bind="{ ...fileUploadOptions.modalOptions }" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TriggerButtonProps, UploadModalProps } from './components/types.ts';
import UploadModal from './components/UploadModal.vue'
import UploadTriggerButton from './components/UploadTriggerButton.vue';

const isModalOpen = ref(false);

const fileUploadOptions = {
  buttonOptions: {} as TriggerButtonProps,
  modalOptions: {} as UploadModalProps
}

const triggerUploadModal = () => {  
  isModalOpen.value = !isModalOpen.value;
}
</script>

<style scoped>
.app {
  position: relative;
}
</style>
