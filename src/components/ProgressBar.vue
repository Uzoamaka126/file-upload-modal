<template>
    <progress min="0" max="100" ref="" :value="progressValue" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{ duration: number }>();
let intervalId: any;

  const progressValue = ref(0);

  const setProgressValue = () => {
    progressValue.value += progressValue.value + 1;
  }

  onMounted(() => {
    intervalId = setInterval(() => {
        setProgressValue()
    }, props.duration / 100);
  })

  onUnmounted(() => clearInterval(intervalId));
</script>