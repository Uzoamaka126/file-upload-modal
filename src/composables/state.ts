import { readonly, ref } from 'vue';

export function useState(initialState: any) {
  const state = ref(initialState);

  const setState = (newState: any) => {
    state.value = newState;
  };

  const readonlyState = readonly(state);
  
  return [readonlyState, setState];
}