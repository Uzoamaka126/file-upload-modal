export type ModalStyles = Partial<CSSStyleDeclaration> & {};

export type FileListProps<T> = T[];

export interface UploadModalProps {
    isMulti: boolean;
    isApiKey: boolean;
    maxUploadSize: number;
    styles: ModalStyles;
    modalContentClasses: string;
    mimeTypes: string;
    show: boolean;
    persist: boolean;
    align: 'center' | 'middle' | 'left' | 'right' | 'bottom';
    disabled: boolean;
    draggable: boolean;
    files: FileListProps<any> | null
}

export type AppProps = Partial<UploadModalProps> & {
    buttonTag: string;
    buttonClass: string;
}

export type Events = {
    MOUSEENTER: "MOUSEENTER"; 
    MOUSELEAVE: "MOUSELEAVE"; 
    CLICK: "CLICK"; 
    SUCCESS: "SUCCESS"; 
    RESET: "RESET"; 
    UPLOADED: "UPLOADED"
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface CustomFile extends File {
    modifiedFileSize: string;
    modifiedFileType: string;
    invalidFileType: boolean;
}
