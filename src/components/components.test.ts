import { expect, it, describe } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils'
import UploadModal from '../components/UploadModal.vue';
import App from '../App.vue';

describe('App', () => {
    it('should render app with default props', () => {
        const wrapper = mount(App, {
            props: {
                buttonTag: 'button',
                buttonClass: 'btn btn--text sm',
                isMulti: false,
                mimeTypes: ".pdf",
                maxUploadSize: 5000 * 1000, // 5MB
                styles: {},
                persist: true,
                align: 'center',
                disabled: false,
                modalContentClasses: '',
                files: null,
                show: false
            },
            template: `
                <component :is="props.buttonTag" @click="isOpen = true" :class="props.buttonClass">
                    <slot name="triggerButton" />
                </component>
                <upload-modal v-bind="props" v-model:show="props.show" v-model:files="props.files" />
            `,
            components: { UploadModal }
        })

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.props('show')).toBe(false);
        expect(wrapper.props('isMulti')).toBe(false);
        expect(wrapper.props('maxUploadSize')).toBe(5000 * 1000);
        expect(wrapper.props('files')).toBe(null);
    });

    it('should render upload modal component', () => {
        const wrapper = shallowMount(UploadModal, {
          global: {
            stubs: ['CloudIcon'],
          },
        });
        expect(wrapper.html()).toMatchSnapshot()
    });

    // it('show and files model values on modal component should be updated', async () => {
    //     const wrapper = mount(UploadModal, {
    //         props: {
    //             show: false,
    //             // 'onUpdate:show': (val: boolean) => wrapper.setProps({ show: val }),
    //             files: null,
    //             // 'onUpdate:files': (files: any[]) => wrapper.setProps({ files })
    //         },
    //         // data() {
    //         //     return {
    //         //       admin: true
    //         //     }
    //         // }
    //     })
    //     const modalEl = wrapper.get('#modalOverlay');

    //     console.log({ modalEl });

    //     expect(modalEl.isVisible()).toBe(false)

    //     wrapper.setProps({ show: true });

    //     expect(modalEl.isVisible()).toBe(true)
        
    //     // const filesInput = wrapper.find('div');

    //     // await showVModel.isVisible(true)
    //     // await filesInput.setValue([])
    // })

    // it('test show model prop', async () => {
    //     const wrapper = mount(UploadModal, {
    //         props: {
    //             show: false,
    //             // 'onUpdate:show': (val: boolean) => wrapper.setProps({ show: val }),
    //             files: null,
    //             // 'onUpdate:files': (files: any[]) => wrapper.setProps({ files })
    //         },
    //     })

    //     expect(wrapper.get('#modalOverlay').isVisible()).toBe(false)

    //     wrapper.setProps({ show: true });

    //     expect(wrapper.get('#modalOverlay').isVisible()).toBe(true)
    // })
})