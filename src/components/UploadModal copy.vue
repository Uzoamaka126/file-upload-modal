<template>
  <div class="modal--overlay" ref="">
    <div class="modal--body">
      <div class="modal--content">
        <div class="modal--header">
          <button type="button" class="modal--close" style="line-height: 0px;" @click="$emit('closeModal')">
            <svg viewBox="0 0 24 24" class="icon_close" width="24" height="24">
              <path fill="currentColor" fill-rule="nonzero" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path>
            </svg>
          </button>
        </div>
        <div class="modal--upload--wrap">
          <div class="file-uploader" 
            :data-state="state.current" 
            @mouseenter=" dispatch({ type: 'MOUSEENTER' })" 
            @mouseleave="dispatch({ type: 'MOUSELEAVE' })" 
            @click="handleFileBtnClick"
            >
            <!-- @click="dispatch({ type: 'CLICK' })" -->
          <input
            type="file"
            @change="e => handleFileChange(e)"
            @cancel=""
            ref="fileRef"
            :accept="computedFileTypes"
            v-bind:multiple="props.isMulti"
            :style="{ display: 'none' }"
          />
            <CloudIcon :state="state.current" />
            <Desc :current="state.current" />
            <div class="progress" :data-hidden="!showProgress">
              <ProgressBar v-if="showProgress" :duration="TIMEOUT" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, ref, Ref } from 'vue';
  import { ReducerActionType, HTMLInputEvent, UploadModalProps } from './types'
  import { states, TIMEOUT, uploadStateMachine, defaultFileTypes } from '../utils/constants';
  import { useReducer } from '../composables/reducer';
  import ProgressBar from './ProgressBar.vue';
  import CloudIcon from './CloudIcon.vue';
  import Desc from './Desc.vue';

  const emit = defineEmits(['closeModal']);
  const props = withDefaults(defineProps<Partial<UploadModalProps>>(), {
    isMulti: false,
    mimeTypes: ".pdf",
    styles: () => ({})
  });

  const fileRef: Ref<HTMLInputElement | null> = ref(null);
  const files: Ref<FileList | null> = ref(null);

  // Computed properties
  const computedFileTypes = computed(() => {
    if (props.isMulti) {
      if (props.mimeTypes?.length) {
        return props.mimeTypes;
      } else {
        return defaultFileTypes
      }
    } 
    return props.mimeTypes;
  })

  const handleFileBtnClick = () => {
    console.log({ fileRef: fileRef.value });
    
    // dispatch({ type: "CLICK" });

    fileRef.value!.click();
  }

  const handleFileChange = (event: Event) => {
    // console.log({ event });
    const result = (event.target as HTMLInputEvent['target'])?.files;

    // dispatch({ type: "SELECTED" })

    files.value = result;
  }

  const handleFileUploadCancel = (e: Event) => {
    const target = e.target as HTMLInputEvent['target'];

    console.log(e.cancelable);
    
  }

  const initialState = {
    current: uploadStateMachine.initial
  };

  const reducer = (state: any, action: ReducerActionType) => {
    if (uploadStateMachine.states[state.current]) {
      // console.log({
      //   'uploadStateMachine.states[state.current]': uploadStateMachine.states[state.current].on[action.type],
      //   state, action
      // });
      
      return {
        ...state,
        current: uploadStateMachine.states[state.current].on[action.type]
      }
    } else {
      return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  watch(state, (newState, oldState) => {
    console.log({ newState, oldState });

    switch (newState.current) {
      case states.SELECTION:
        setTimeout(() => dispatch({ type: "SELECTED" }), TIMEOUT);
        break;
      case states.UPLOADING:
        setTimeout(() => dispatch({ type: "UPLOADED" }), TIMEOUT);
        break;
      case states.SUCCESS:
        setTimeout(() => dispatch({ type: "RESET" }), TIMEOUT);
        break;
    } 
  },
  { immediate: true }
  );

  const showProgress = computed(() => {   
    // console.log({ 'state.current': state.current });
     
    return [states.UPLOADING, states.SUCCESS].includes(state.current);
  })
</script>

<style scoped>
.modal--overlay {
  position: fixed; 
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  animation-timing-function: cubic-bezier(.4,0,.2,1);
  background-color: rgba(0,0,0,.5);
  display: flex;
  isolation: isolate;
  justify-content: center;
  overflow: hidden;
  transition: background-color .5s;
  z-index: 1000;
}

.modal--header {
  display: flex;
  justify-content: flex-end;
}

.modal--body {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
  width: 100%;
}

.modal--content {
  background-color: #fefefe;
  margin: 5rem auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
}

.modal--close {
  color: #aaaaaa;
  font-size: 28px;
  outline: none;
  text-align: center;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
}

.modal--close:hover, .modal--close:focus {
  color: #000;
}

.modal--upload-wrap {
  width: 100%;
}
</style>
