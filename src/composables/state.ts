import { readonly, ref } from 'vue';
import { ReducerParam, UseReducer, ReducerReturnPayload, InitialState } from './types';

export function useState(initialState: any) {
  const state = ref(initialState);

  const setState = (newState: any) => {
    state.value = newState;
  };
  
  return [readonly(state), setState];
}

export function useReducer(
  reducer: ReducerParam<any>, 
  initialState: InitialState<any>, 
  init: any
) {
  const state = ref(init ? init(initialState) : initialState);

  const dispatch = (action: any) => {
    state.value = reducer(state.value, action);
  };

  return [readonly(state.value), dispatch];
};