import { Ref } from "vue";
import { Events } from "../components/types";

// export interface ReducerAction<T = any> {
export interface ReducerAction {
    type: keyof Events | any;
    payload?: any;
}

export type InitialState<T = any> = T;

export type ReducerParam = (Ref<any> | ((action: ReducerAction) => void))[];