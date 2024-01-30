<template>
  <transition>
    <template v-if="props.persist">
      <transition name="fade" :duration="300" mode="out-in">
        <div>
          <Teleport to="body" :disabled="props.disabled">
            <div class="modal--overlay" v-show="reactiveShow" tabindex="-1" role="dialog">
              <div class="modal--body" @keyup.stop.esc="hide">
                <div ref="focusElem" class="visually-hidden modal__outline" tabindex="0" v-click-outside="hide" />
                <div class="modal--content" :class="props.modalContentClasses" @click.stop="emit('click')">
                  <div class="modal--header" :style="{ justifyContent: fileArr?.length ? 'space-between' : 'flex-end' }">
                    <div v-if="fileArr?.length" class="align-center">
                      <span class="modal--header--title">Uploads</span>
                      <span class="modal--header--add " @click="handleFileBtnClick">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #646cff;transform: ;msFilter:;">
                          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                        </svg>
                      </span>
                    </div>
                    <button type="button" class="modal--close" style="line-height: 0px;" @click="$emit('toggleModal', false)">
                      <svg viewBox="0 0 24 24" class="icon_close" width="24" height="24">
                        <path fill="currentColor" fill-rule="nonzero" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="modal--upload--wrap">
                    <template v-if="!fileArr?.length">
                      <div class="file--upload--wrap" 
                        :data-state="state.current" 
                        @mouseenter=" dispatch({ type: 'MOUSEENTER' })" 
                        @mouseleave="dispatch({ type: 'MOUSELEAVE' })" 
                        @click="handleFileBtnClick"
                      >
                        <CloudIcon :state="state.current" />
                        <div class="message">
                          <strong :data-hidden="![states.IDLE, states.HOVERING].includes(state.current)">Upload a file</strong>
                          <strong :data-hidden="![states.UPLOADING].includes(state.current)" class="message-uploading">Uploading</strong>
                          <strong :data-hidden="![states.SUCCESS].includes(state.current)" class="message-done">Done!</strong>
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
                                  <svg v-if="!isFileCancelled" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #83c3ad; transform: ;msFilter:;">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
                                  </svg>
                                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fa551e;transform: ;msFilter:;">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                                  </svg>
                                </span>
                                <div class="file--desc">
                                  <p class="file--name">{{ file.name }}</p>
                                  <div class="file--meta">
                                    <p class="file--badge">{{ file.modifiedFileType }}</p>
                                    <p class="file--size">{{ file.modifiedFileSize }}</p>
                                  </div>
                                </div>
                              </div>
                              <span class="file--item--cancel btn btn--text" @click="removeFileByIndex(file.name)">Remove</span>
                            </div>
                           
                          </li>
                          <div class="upload--btns align-center" :class="{ 'double': fileUploadSizeExceeded }">
                            <div v-if="fileUploadSizeExceeded">
                              <p class="error--text">File upload size exceeded. Max size is <strong>5MB</strong></p>
                            </div>
                            <div>
                              <button class="btn btn--outline sm upload--btn--cancel" type="button" @click="closeAndResetModal">Cancel</button>
                              <button class="btn btn--block sm upload--btn--complete" type="button" @click="onUploadComplete">Finish</button>
                            </div>
                          </div>
                        </ul>
                      </div>
                    </template>
                    <input
                      type="file"
                      @change="e => handleFileChange(e)"
                      @cancel="handleFileCancel"
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
        </div>
      </transition>
    </template>
  </transition>
</template>

<script setup lang="ts">
  import { computed, ref, Ref, Teleport, watchEffect, watch, DirectiveBinding, VNode } from 'vue';
  import { 
  ReducerActionType, 
  HTMLInputEvent, 
  UploadModalProps,
  CustomFile,
} from './types'
  import { states, uploadStateMachine, defaultFileTypes, fileExtensions } from '../utils/constants';
  import { useReducer } from '../composables/reducer';
  // import ProgressBar from './ProgressBar.vue';
  import CloudIcon from './CloudIcon.vue';

  const emit = defineEmits(['toggle-modal', 'click', 'close-modal',  'onComplete', 'OnCancel', 'onFileCompleted', 'onFileSelected']);

  defineModel({
    required: true,
    set: () => ({
      prop: "showModal",
      event: "toggle-modal",
    })
  });

  const props = defineProps<Partial<UploadModalProps>>();

  // Refs & definitions
  const reactiveShow = ref(props.showModal);
  const fileRef: Ref<HTMLInputElement | null> = ref(null);

  // const files: Ref<FileList | null> = ref(null);
  const fileArr = ref([] as any[])
  const isFileUpload = ref(false);
  const isFileCancelled = ref(false);
  const initialState = {
    current: uploadStateMachine.initial
  };
  const fileArrTotalSize = ref(0);
  const fileUploadSizeExceeded = ref(false);
  const invalidFileType = ref(0);

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
    // console.log({ "state.current": state.value.current });
          
    // return [states.UPLOADING, states.SUCCESS].includes(state.value.current);
    return false
  })

  // methods
  const hide = (event: Event) => {
    console.log({ event, el });
    
      // event.preventDefault();
    // event.stopPropagation();
  }

  const validFileType = (type: string) => {
    return props.mimeTypes.includes(type);
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

  const removeFileByIndex = (name: string) => {    
    fileArr.value = fileArr.value.filter((item) => {
      if (item.name === name) {
        fileArrTotalSize.value = fileArrTotalSize.value - item?.size;
      };

      return item?.name !== name
    });

    // const dt = new DataTransfer();
      
    // for (let i = 0; i < file.value!.length; i++) {
    //   const item = files.value![i];

    //   if (index !== i)
    //     dt.items.add(item)
    //   }
    
    // files.value = dt.files;  
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

        if (!validFileType(item.type)) {
          invalidFileType.value = invalidFileType.value + 1;
          item.isFileTypeValid = false;
        }
        item.modifiedFileSize = returnFileSize(item.size);
        item.modifiedFileType = fileExtensions[item.type] || item.type;
        
        fileArrTotalSize.value = item.size + fileArrTotalSize.value;

        fileArr.value.push(item)
      }
    
      dispatch({ type: "CLICK" })
    }
  }

  const handleFileCancel = (event: Event) => {
    console.log("Cancelled.");
  }

  const closeAndResetModal = () => {
    fileArr.value = [];
    fileRef.value = null;
    isFileUpload.value = false;

    dispatch({ type: "RESET" });

    emit("close-modal")
  }

  const reducer = (state: any, action: ReducerActionType) => {    
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
    }
    emit("onComplete", payload); // return the selected files back to the parent
    emit("close-modal");
  }

  // directives
  const vClickOutside = {
    bind: (el: Element, binding: DirectiveBinding, vNode: VNode) => {
      console.log({ el, binding, vNode });
      
      // // Provided expression must evaluate to a function.
      // if (typeof binding.value !== "function") {
      //     const compName = vNode.context.name;
      //     let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
      //     if (compName) {
      //         warn += `Found in component '${compName}'`;
      //     }

      //     console.warn(warn);
      // }
      // // Define Handler and cache it on the element
      // const bubble = binding.modifiers.bubble;
      // const handler = (e) => {
      //     if (bubble || (!el.contains(e.target) && el !== e.target)) {
      //         binding.value(e);
      //     }
      // };
      // el.__vueClickOutside__ = handler;

      // // add Event Listeners
      // document.addEventListener("click", handler);
    },

    unbind: (el: any) => {
      // Remove Event Listeners
      // document.removeEventListener("click", el.__vueClickOutside__);
      // el.__vueClickOutside__ = null;
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState);  

  watch(reactiveShow, (newValue) => {
    if (newValue) {
      emit("toggle-modal");
    }
  })

  watchEffect(() => {
    if (props.showModal) {
      reactiveShow.value = true;
    }

    if (state.value.current === states.UPLOADING) {
      setTimeout(() => dispatch({ type: "UPLOADED" }), 1000);
        return;
    }

    if (isFileUpload.value && !fileArr.value?.length) {
      dispatch({ type: "RESET" });
      isFileUpload.value = false;
    }

    if (fileArrTotalSize.value > props.maxUploadSize) {
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
