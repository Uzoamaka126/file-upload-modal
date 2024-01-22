export interface TriggerButtonProps {
    buttonType?: "text" | "block" | "outline";
    styleObj?: Record<string, string>;
    label: string;
    iconPosition?: "left" | "right" | "none";
    isCustomIcon?: boolean;
    classNames?: Array<string>;
    disabled?: boolean;
    size?: "sm" | "md" | "lg"
}

export type UploadModalProps = {
    options?: {
        isMulti?: boolean;
        isApiKey?: boolean;
    }
    callback: () => void;
}

// export type State = "IDLE" | "HOVERING" | "UPLOADING" | "SUCCESS";
export type State = {
    IDLE: "IDLE"; 
    HOVERING: "HOVERING"; 
    UPLOADING: "UPLOADING"; 
    SUCCESS: "SUCCESS"
}

export type Events = {
    MOUSEENTER: "MOUSEENTER"; 
    MOUSELEAVE: "MOUSELEAVE"; 
    CLICK: "CLICK"; 
    SUCCESS: "SUCCESS"; 
    RESET: "RESET"; 
    UPLOADED: "UPLOADED"
}

export type UploaderMachineProps = {
    initial: string;
    states: { 
        [x: string]: { 
            on: { 
                [x: string]: string; 
            }; 
        }; 
    };
    // states: Record<keyof State, {
    //     on: Record<keyof Events, valueof<State>>
    // }>
}

export type ReducerActionType = {
    type: keyof Events | any
}

export type event = 'mouseenter' | 'mouseleave' | 'click' | "uploaded" | 'reset'

// Ref<{ initial: string; states: { [x: string]: { on: { [x: string]: string; }; }; }; }>
