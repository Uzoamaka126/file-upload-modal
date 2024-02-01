<template>
  <transition>
    <template v-if="props.persist">
      <transition name="fade" :duration="300" mode="out-in">
        <template>
          <Teleport to="body" :disabled="props.disabled">
            <div class="modal--overlay" v-show="reactiveShow" tabindex="-1" role="dialog">
              <div class="modal--body" @keyup.stop.esc="hide">
                <div ref="focusElem" class="visually-hidden modal__outline" tabindex="0" />
                <div 
                  class="modal--content" 
                  :class="props.modalContentClasses" 
                  v-click-outside="hide"
                  @click.stop="emit('click')"
                >
                  <div class="modal--header" :style="{ justifyContent: fileArr?.length ? 'space-between' : 'flex-end' }">
                    <div v-if="fileArr?.length" class="align-center">
                      <span class="modal--header--title">Uploads</span>
                      <span class="modal--header--add " @click="handleFileBtnClick">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #646cff;transform: ;msFilter:;">
                          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                        </svg>
                      </span>
                    </div>
                    <button type="button" class="modal--close" style="line-height: 0px;" @click="$emit('update:show', false)">
                      <svg viewBox="0 0 24 24" class="icon_close" width="24" height="24">
                        <path fill="currentColor" fill-rule="nonzero" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path>
                      </svg>
                    </button>
                  </div>
                  <div 
                    class="modal--upload--wrap" 
                    ref="dragZoneRef" 
                    :draggable="props.draggable"
                    @dragstart="dragStartHandler" 
                    @dragover.prevent
                    @dragenter.prevent
                    @drop="dropHandler"
                  >
                    <template v-if="!fileArr?.length">
                      <div class="file--upload--wrap" 
                        :data-state="state.current" 
                        @mouseenter=" dispatch({ type: 'MOUSEENTER' })" 
                        @mouseleave="dispatch({ type: 'MOUSELEAVE' })" 
                        @click="handleFileBtnClick"
                      >
                        <CloudIcon :state="state.current" />
                        <div class="message">
                          <p :data-hidden="![states.IDLE, states.HOVERING].includes(state.current)">Drag & Drop or <span class="blue">Choose file </span>to upload</p>
                        </div>  
                      </div>
                    </template>
                    <template v-else>
                      <div class="file--uploaded--wrap">
                        <ul class="file--list" :style="computeFileListHeight">
                          <li v-for="file in fileArr" :key="file.name">
                            <div class="file--item">
                              <div class="success">
                                <span class="file--check--icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fa551e;transform: ;msFilter:;">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                                  </svg>
                                </span>
                                <div class="file--desc">
                                  <p class="file--name">{{ file.name }}</p>
                                  <div class="file--meta">
                                    <p class="file--badge">{{ file.modifiedFileType }}</p>
                                    <p v-if="file.invalidFileType" class="file--badge error">Invalid file type</p>
                                    <p class="file--size">{{ file.modifiedFileSize }}</p>
                                  </div>
                                </div>
                              </div>
                              <span class="file--item--cancel btn btn--text" @click="removeFileByIndex(file.name)">Remove</span>
                            </div>                      
                          </li>
                        </ul>
                        <div class="upload--btns align-center" :class="{ 'double': fileUploadSizeExceeded }">
                          <div v-if="fileUploadSizeExceeded">
                            <p class="error--text">File upload size exceeded. Max size is <strong>5MB</strong></p>
                          </div>
                          <div>
                            <button class="btn btn--outline sm upload--btn--cancel" type="button" @click="closeAndResetModal">Cancel</button>
                            <button 
                              class="btn btn--block sm upload--btn--complete" 
                              type="button"
                              :disabled="disableCompleteBtn" 
                              @click="onUploadComplete"
                            >
                              Finish
                            </button>
                          </div>
                        </div>
                      </div>
                    </template>
                    <input
                      type="file"
                      @change="e => handleFileChange(e)"
                      ref="fileRef"
                      :accept="computedFileTypes"
                      v-bind:multiple="props.isMulti"
                      :style="{ display: 'none' }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Teleport>
        </template>
      </transition>
    </template>
  </transition>
</template>

<script setup lang="ts">
  import { computed, ref, Ref, Teleport, watchEffect, DirectiveBinding, VNode, watch } from 'vue';
  import { 
  HTMLInputEvent, 
  UploadModalProps,
  CustomFile,
} from './types'
  import { states, uploadStateMachine, defaultFileTypes, fileExtensions } from '../utils/constants';
  import { useReducer } from '../composables/reducer';
  // import ProgressBar from './ProgressBar.vue';
  import CloudIcon from './CloudIcon.vue';
import { ReducerAction } from '../composables/types';

  defineModel('show', { required: true });
  defineModel('files', { required: true, type: Array });

  const props = defineProps<Partial<UploadModalProps>>();

  // emits
  const emit = defineEmits(['update:show', 'click', 'update:files']);

  // Refs & definitions
  const reactiveShow = ref(props.show);
  const fileRef: Ref<HTMLInputElement | null> = ref(null);
  const dragZoneRef: Ref<HTMLInputElement | null> = ref(null);
  const fileArr = ref(props.files! || [] as any);
  const fileListUpdater = ref(props.files! || [] as any);
  const isFileUpload = ref(false);
  const initialState = {
    current: uploadStateMachine.initial
  };
  const fileArrTotalSize = ref(0);
  const fileUploadSizeExceeded = ref(false);
  const invalidFileTypeCount = ref(0);
  const dragging = ref(false);

  // Computed properties
  const computedFileTypes = computed(() => {
    if (props.isMulti) {
      if (props.mimeTypes?.length) {
        return props.mimeTypes;
      } else {
        return defaultFileTypes
      }
    }  else {
      return props.mimeTypes;
    }
  });

  const computeFileListHeight = computed(() => {    
    if (fileArr.value!?.length > 4) {
      return { height: '370px', overflow: 'scroll' }
    } else {
      return { height: 'auto', overflow: 'auto' }
    }
  });

  const showProgressBar = computed(() => {            
    // return [states.UPLOADING, states.SUCCESS].includes(state.value.current);
    return false
  })

  const disableCompleteBtn = computed(() => {
    if (invalidFileTypeCount.value > 0) {
      return true
    } 
    
    if (!fileArr.value.length) {
      return true
    }

    if (fileArrTotalSize.value > (5000 * 1000)) {
      return true
    }

    return false
  })

  // methods
  const closeModal = () => {
    reactiveShow.value = false;
    emit('update:show', false);
  }

  const hide = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const validFileType = (type: string) => {    
    return props.mimeTypes!.includes(type);
  }

  const returnFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size >= 1024 && size < 1048576) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size >= 1048576) {
      return `${(size / 1048576).toFixed(1)} MB`;
    } else {
      return `${size} bytes`
    }
  }

  const fileItemTransform = (item: CustomFile): CustomFile => {
    item.modifiedFileType = fileExtensions[item.type] || item.type;

    if (!validFileType(item.modifiedFileType)) {          
      invalidFileTypeCount.value = invalidFileTypeCount.value + 1;
      item.invalidFileType = true;
    }

    item.modifiedFileSize = returnFileSize(item.size);
    
    fileArrTotalSize.value = item.size + fileArrTotalSize.value;

    return item;
  } 

  const removeFileByIndex = (name: string) => {    
    fileListUpdater.value = fileArr.value.filter((item) => {
      if (item.name === name) {
        fileArrTotalSize.value = fileArrTotalSize.value - item?.size;

        if (item?.invalidFileType) {
          invalidFileTypeCount.value = invalidFileTypeCount.value - 1;
        }
      };

      return item?.name !== name
    });

    emit('update:files', fileListUpdater.value)
  }

  const handleFileBtnClick = () => {    
    fileRef.value!.click();
  }

  const handleFileChange = (event: Event) => {
    const result = (event.target as HTMLInputEvent['target'])?.files;
    
    if (result?.length) {            
      isFileUpload.value = true;
            
      for (let i = 0; i < result.length; i++) {
        const item = result[i] as CustomFile;

        const transformedItem = fileItemTransform(item)

        fileListUpdater.value.push(transformedItem)
      }
      
      emit('update:files', fileListUpdater.value);
      typeof dispatch === 'function' && dispatch({ type: "CLICK" });
    }
  }

  const closeAndResetModal = () => {
    fileListUpdater.value = [];
    dragZoneRef.value = null;
    fileRef.value = null;
    dragging.value = false;
    fileUploadSizeExceeded.value = false;
    isFileUpload.value = false;
    invalidFileTypeCount.value = 0;
    fileArrTotalSize.value = 0;

    if (typeof dispatch === 'function') {
      dispatch({ type: "RESET" });
    }

    emit('update:files', []);

    closeModal();
  }

  const reducer = (state: any, action: ReducerAction) => {    
    if (uploadStateMachine.states[state.current]) {
      return {
        ...state,
        current: uploadStateMachine.states[state.current].on[action.type]
      }
    } else {
      return state
    }
  }

  const onUploadComplete = () => {
    const payload = {
      files: fileArr.value,
    };

    emit("onComplete", payload); // return the selected files back to the parent
    closeAndResetModal();
  }

  const dragStartHandler = (event: DragEvent) => {
    event.dataTransfer!.dropEffect = 'move'
    event.dataTransfer!.effectAllowed = 'move'
    
    event.dataTransfer!.setData("text/plain", event.target!.id);
  }

  const dropHandler = (event: DragEvent) => {
    event.preventDefault();
    dragging.value = false;

    // Get the data, which is the id of the source element
    const files = event.dataTransfer!.files;

    if (files?.length) {            
      isFileUpload.value = true;
            
      for (let i = 0; i < files.length; i++) {
        const item = files[i] as CustomFile;
        const transformedItem = fileItemTransform(item)

        fileListUpdater.value.push(transformedItem)
      }
      
      // Emit an event with the dropped files
      emit('update:files', fileListUpdater.value);

      typeof dispatch === 'function' && dispatch({ type: "CLICK" });
    }
  }

  // directives
  const vClickOutside = {
    mounted(el: Element & any, binding: DirectiveBinding, vNode: VNode) {
      if (typeof binding.value !== "function") {
        // const compName = vNode.;
        let warn = `[Vue-click-outside:] provided expression '${binding.value}' is not a function, but is required`;
        console.warn(warn);
      }

      // Define Handler and cache it on the element
      const bubble = binding.modifiers.bubble;

      const handler = (event: any) => {
        if (bubble || (!el.contains(event.target) && el !== event.target)) {
          binding.value(event);
        }
      };
      el.__vueClickOutside__ = handler;

      // add Event Listeners
      document.addEventListener("click", handler);
    },

    unmounted(el: Element & any) {
      // Remove Event Listeners
      document.removeEventListener("click", el.__vueClickOutside__);
      el.__vueClickOutside__ = null;
    },
  }

  // lifecycle hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  
  watch(() => props.files, (newVal) => {    
    if (newVal) {
      fileArr.value = newVal
    }
  }, { immediate: true, deep: true })

  watchEffect(() => {
    reactiveShow.value = props.show;

    if (state.value.current === states.UPLOADING) {
      setTimeout(() => typeof dispatch === 'function' && dispatch({ type: "UPLOADED" }), 1000);
        return;
    }

    if (isFileUpload.value && !fileArr.value?.length) {
      
      typeof dispatch === 'function' && dispatch({ type: "RESET" });
      isFileUpload.value = false;
    }

    if (fileArrTotalSize.value > props.maxUploadSize!) {
      fileUploadSizeExceeded.value = true;
    }
  });
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
  position: relative;
  margin-bottom: 1rem;
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
  /* min-height: 407px; */
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
