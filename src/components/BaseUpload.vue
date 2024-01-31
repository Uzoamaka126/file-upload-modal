<template>
    <div>
        <component :is="props.buttonTag" @click="isModalOpen = true" :class="props.buttonClass">
            <slot name="triggerButton" />
        </component>
        <div>
            <UploadModal 
                v-bind="props" 
                v-model:show="isModalOpen"
                v-model:files="fileList"
            />
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

  const toggleModalDisplay = () => {  
    isModalOpen.value = !isModalOpen.value;
  }

</script>
  
<style scoped>
  .app {
    position: relative;
  }
</style>  