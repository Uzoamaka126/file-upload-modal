<template>
  <div>
    <BaseUpload>
      <template #triggerButton>Click here to upload</template>
    </BaseUpload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { AppProps } from './components/types.ts';
import BaseUpload from './components/BaseUpload.vue'

</script>

<style scoped>
.app {
  position: relative;
}
</style>
