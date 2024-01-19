export interface TriggerButtonProps {
    buttonType?: "text" | "block" | "outline";
    styleObj?: Record<string, string>;
    label: string;
    iconPosition?: "left" | "right" | "none";
    isCustomIcon?: boolean;
    classNames?: Array<string>;
    disabled?: boolean;
    size: "sm" | "md" | "lg"
}
