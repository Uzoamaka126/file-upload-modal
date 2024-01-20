<template>
  <div class="app">
    <UploadTriggerButton @click="triggerUploadModal" />
    <template v-if="isModalOpen">
      <UploadModal @closeModal="triggerUploadModal" />
    </template>
    <ddd />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadModal from './components/UploadModal.vue'
import ddd from './components/ddd.vue'
import UploadTriggerButton from './components/UploadTriggerButton.vue';

const isModalOpen = ref(false);

const triggerUploadModal = () => {
  isModalOpen.value = !isModalOpen.value;
}
</script>

<style scoped>
.app {
  position: relative;
}
</style>
