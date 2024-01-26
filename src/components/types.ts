export interface TriggerButtonProps {
    buttonType: "text" | "block" | "outline";
    styleObj: Record<string, string> | null;
    label: string;
    iconPosition: "left" | "right" | "none";
    isCustomIcon: boolean;
    classes: string;
    disabled: boolean;
    size: "sm" | "md" | "lg"
}

export type ModalStyles = Partial<CSSStyleDeclaration> & {}
export interface UploadModalProps {
    isMulti: boolean;
    isApiKey: boolean;
    maxUploadSize: number;
    styles: ModalStyles;
    classes: string;
    mimeTypes: string;
    isDropActive: boolean;
    
    onComplete: () => void;
    onCancel: () => void;
    onClose: () => void;
    onOpen: () => void;
    onFileSelected: () => void;
    onFileUploadCompleted: () => void;
}

export type AppProps = {
    buttonOptions: TriggerButtonProps,
    modalOptions: Partial<UploadModalProps>
}

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

export type event = 'mouseenter' | 'mouseleave' | 'click' | "uploaded" | 'reset';

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface CustomFile extends File {
    isDrag: boolean;
    modifiedFileSize: string;
    modifiedFileType: string;
    isFileTypeValid: boolean;
}
