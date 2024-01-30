<!-- <button 
    class="btn" 
    type="button" 
    v-bind="$attrs"
    :class="[props.buttonOptions.classes, btnTypeClass, props.buttonOptions.size]" 
    :style="props.buttonOptions.styleObj"
    :disabled="props.buttonOptions.disabled" 
    @click="triggerUploadModal"
>
    <span>
        <slot v-if="props.buttonOptions.iconPosition === 'left'" name="left-icon" />
        <span>
            {{ props.buttonOptions.label }}
        </span>
        <slot v-if="props.buttonOptions.iconPosition === 'right'" name="suffix-icon" />
    </span>
</button> -->
<!-- make it a component and pass stuff inside including emits -->     

<!-- 
  <FileUploadVue

  >
    <button class="btn" type="button" @click="emit('trigger-upload-modal')"> pass in whatever component that fires the upload modal when clicked
      Click here to upload
    </button>
  </FileUploadVue>
 -->

 <!-- 

    const props = withDefaults(defineProps<Partial<AppProps>>(), {
        // buttonType: 'text',
        // buttonLabel: 'Click to upload',
        // disabled: false,
        // isCustomIcon: false,
        // iconPosition: "none",
        // size: 'md',
        // classes: '',
        // styleObj: null,
    });

    const triggerUploadModal = () => {  
    // isModalOpen.value = !isModalOpen.value;
    }

    const handleFileUploadComplete = (payload: FileList) => {
        return payload;
    }

    const btnTypeClass = computed(() => {
        return `btn--${props.buttonOptions.buttonType}` || 'btn--block'
    });
-->