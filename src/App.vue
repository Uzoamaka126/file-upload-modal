<template>
  <div>
    <!-- <component :is="props.buttonTag" class="btn" @click="triggerUploadModal">
      <slot />
    </component>
    <template v-if="isModalOpen">
      <UploadModal 
        v-bind="{ ...props.modalOptions }" 
        @closeModal="triggerUploadModal"
        @onComplete="handleFileUploadComplete" 
      />
    </template> -->
    <BaseUpload 
      :show-modal="isModalOpen" 
      @toggle-modal="toggleModalDisplay"
    >
      <template #triggerButton>Click here to upload</template>
    </BaseUpload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { AppProps } from './components/types.ts';
import BaseUpload from './components/BaseUpload.vue'

const isModalOpen = ref(false);

const toggleModalDisplay = () => {  
  isModalOpen.value = !isModalOpen.value;
}

const handleFileUploadComplete = (payload: FileList) => {
  return payload;
}
</script>

<style scoped>
.app {
  position: relative;
}
</style>
