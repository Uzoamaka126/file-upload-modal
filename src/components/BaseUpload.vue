<template>
    <div>
        <component :is="props.buttonTag" @click="emit('toggle-modal')" :class="props.buttonClass">
            <slot name="triggerButton" />
        </component>
        <div>
            <UploadModal 
                v-bind="props" 
                v-model:show="props.showModal"
                v-model:files="fileList"
                @close="emit('toggle-modal')"
                />
                <!-- @update:files="setFiles"  -->
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { AppProps } from '../components/types.ts';
  import { ref } from 'vue';
  import UploadModal from '../components/UploadModal.vue'
  
  const emit = defineEmits(['toggle-modal'])
  
  const props = withDefaults(defineProps<Partial<AppProps>>(), {
    buttonTag: 'button',
    showModal: false,
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

  const handleFileUploadComplete = (payload: FileList) => {
    return payload;
  }
</script>
  
<style scoped>
  .app {
    position: relative;
  }
</style>  