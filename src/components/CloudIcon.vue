<template>
    <div class="cloud-icon">
      <svg class="cloud" data-hidden="false" viewBox="0 0 32 32" width="100" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#000" strokeWidth="2" strokeMiterlimit="1.5">
        <path d="M18 22h6.001A5.003 5.003 0 0029 17a4.997 4.997 0 00-3.117-4.634 5.503 5.503 0 00-7.789-3.813 7 7 0 00-13.082 3.859A5.007 5.007 0 002 17c0 2.761 2.232 5 4.999 5H13" />
      </svg>
      <svg class="line" :data-hidden="uploadHoveringState" viewBox="0 0 32 32" width="100" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#000" strokeWidth="2" strokeMiterlimit="1.5">
        <path d="M18 22h-5" />
      </svg>
      <svg class="arrow" :data-hidden="notUploadOrHoveringState" viewBox="0 0 32 32" width="100" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#000" strokeWidth="2" strokeMiterlimit="1.5">
          <path d="M15.5 15.151v11.824-11.824z"/>
          <path d="M12.075 18.34l3.425-3.528 3.425 3.528"/>
      </svg>
      <svg class="check" :data-hidden="notSuccessState" viewBox="0 0 32 32" width="100" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#000" strokeWidth="2" strokeMiterlimit="1.5">
        <path d="M11.4 15.787l3.426 2.553 5.774-5.556" />
      </svg>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { states } from '../utils/constants';

const props = defineProps<{ state: string }>();

const uploadHoveringState = computed(() => {
    return [states.UPLOADING, states.HOVERING].includes(props.state)
})

const notUploadOrHoveringState = computed(() => {
    return ![states.UPLOADING, states.HOVERING].includes(props.state)
})

const notSuccessState = computed(() => {
    return ![states.SUCCESS].includes(props.state)
})
    
</script>