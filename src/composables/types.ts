export type ReducerReturnPayload<T> = {
    state: T,
    dispatch: (action: ReducerAction<T>) => void;
}

type ReducerAction<T> = {
    type: string | Record<string, string>;
    payload: T;
}

export type InitialState<T> = T;

export type ReducerParam<T> = (state: T, action: ReducerAction<T>) => void;

export type UseReducer<Type> = (
    reducer: ReducerParam<Type>, 
    initialState: InitialState<Type>, 
    init: any 
) => ReducerReturnPayload<Type>