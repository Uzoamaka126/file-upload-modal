<template>
    <div>
        <component :is="props.buttonTag" @click="emit('toggle-modal')" :class="props.buttonClass">
            <slot name="triggerButton" />
        </component>
        <div>
            <UploadModal 
                v-model="props.showModal"
                v-bind="props" 
                @close="emit('toggle-modal')"
                @onComplete="handleFileUploadComplete" 
            />
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { AppProps } from '../components/types.ts';
  import UploadModal from '../components/UploadModal.vue'
  
  const emit = defineEmits(['toggle-modal', 'update'])
  
  const props = withDefaults(defineProps<Partial<AppProps>>(), {
    buttonTag: 'button',
    showModal: false,
    buttonClass: 'btn btn--text sm',
    isMulti: false,
    mimeTypes: ".pdf",
    maxUploadSize: 5000 * 1000, // 5MB
    styles: () => ({}),
    persist: true,
    align: 'center',
    disabled: false,
    modalContentClasses: ''
  });
  
  const handleFileUploadComplete = (payload: FileList) => {
    return payload;
  }
</script>
  
<style scoped>
  .app {
    position: relative;
  }
</style>  