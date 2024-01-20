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
          <div class="file-uploader" :data-state="state" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
            <CloudIcon :state="state" />
            <div class="message">
              <strong :data-hidden="![states.IDLE, states.HOVERING].includes(state)">Upload</strong>
              <strong :data-hidden="![states.UPLOADING].includes(state)" class="message-uploading">Uploading</strong>
              <strong :data-hidden="![states.SUCCESS].includes(state)" class="message-done">Done!</strong>
            </div>  
            <div class="progress" :data-hidden="!showProgress">
              <template v-if="showProgress">
                <ProgressBar :duration="TIMEOUT" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { State, UploaderMachineProps, ReducerActionType } from './types'
  import { states, events, TIMEOUT } from '../utils/constants';
  import { useReducer } from '../composables/state';
  import ProgressBar from './ProgressBar.vue';
  import CloudIcon from './CloudIcon.vue';

  const emit = defineEmits(['closeModal'])

  const uploadStateMachine = ref<UploaderMachineProps>({
    initial: states.IDLE,
    states: {
      [states.IDLE]: {
        on: {
          [events.CLICK]: states.UPLOADING,
          [events.MOUSEENTER]: states.HOVERING
        }
      },
      [states.HOVERING]: {
        on: {
          [events.CLICK]: states.UPLOADING,
          [events.MOUSELEAVE]: states.IDLE
        }
      },
      [states.UPLOADING]: {
        on: { [events.UPLOADED]: states.SUCCESS }
      },
      [states.SUCCESS]: {
        on: {
          [events.CLICK]: states.IDLE,
          [events.RESET]: states.IDLE
        }
      }
    }
  });

  function uploaderReducer(state: keyof State, action: ReducerActionType) {
    return (
      (uploadStateMachine.value.states[state] && uploadStateMachine.value.states[state].on[action.type]) || state);
  }

  const [state, dispatch] = useReducer(uploaderReducer, uploadStateMachine.value.initial, null);

  watch(
    () => state,
      (state) => {
        console.log({ state });
        
        switch (state) {
          case states.UPLOADING:
            setTimeout(() => dispatch(events.UPLOADED), TIMEOUT);
            break;
          case states.SUCCESS:
            setTimeout(() => dispatch(events.RESET), TIMEOUT);
            break;
        } 
      },
    { immediate: true }
  );

  const showProgress = computed(() => {
    return [states.UPLOADING, states.SUCCESS].includes(state);
  })

  const onMouseEnter = () => {

  }

  const onMouseLeave = () => {
    
  }

  const onClick = () => {
    
  }

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
