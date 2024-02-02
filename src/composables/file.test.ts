import { expect, it, describe } from 'vitest';
import { shallowMount } from '@vue/test-utils'
import UploadModalVue from '../components/UploadModal.vue';
import { useReducer } from './reducer';
import { useState } from './state';
import { ref } from 'vue';

describe('test composables', () => {
    it('should mount component', () => {
        const wrapper = shallowMount(UploadModalVue, {
          global: {
            stubs: ['CloudIcon'],
          },
        });
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('return a new state and dispatch with useReducer call', async () => {
        const initialState = ref(0)

        function sampleReducer(state: any, action: any) {
            switch(action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        };

        const [state, dispatch] = useReducer(sampleReducer, initialState.value);
        
        expect(state.value).toBe(0);

        await dispatch!({ type: 'INCREMENT' });
      
        expect(state.value).toBe(1)
    })

    it('return a readonly state and setter function with useState', async () => {
        const [state, setState] = useState(0);
        
        expect(state.value).toBe(0);

        await setState(1)
      
        expect(state.value).toBe(1);
    })
});