import { ref, reactive } from 'vue';
import { ReducerParam, InitialState } from './types';

export function useReducer(reducer: any, initialState: InitialState): ReducerParam {
    const state = reactive(initialState);
    const stateRef = ref(state);

    const dispatch = (action: any) => {
        stateRef.value = reducer(stateRef.value, action);
    };

    return [stateRef, dispatch];
};