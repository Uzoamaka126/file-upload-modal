<template>
    <div class="message">
        <strong :data-hidden="![states.IDLE, states.HOVERING].includes(props.current)">Upload</strong>
        <strong :data-hidden="![states.UPLOADING].includes(props.current)" class="message-uploading">Uploading</strong>
        <strong :data-hidden="![states.SUCCESS].includes(props.current)" class="message-done">Done!</strong>
    </div>  
  </template>
  
<script setup lang="ts">
    import { computed, watch } from 'vue';
    import { states } from '@/utils/constants';

    const props = withDefaults(defineProps<{ current: string }>(), {
       current: '',
    });
  </script>
  