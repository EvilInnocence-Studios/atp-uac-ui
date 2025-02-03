import { IToggle } from "@core/lib/useToggle";
import { SafeUser } from "@uac-shared/user/types";

export declare interface IProfileEditorProps {
    user: SafeUser | null;
    isLoading: boolean;
    update: (field:keyof SafeUser) => (value:string) => void;
    passwordReset: IToggle;
    openModal: () => void;
    resetToken: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IProfileEditorInputProps {
    title?: string;
    userId?: string;
}

export type ProfileEditorProps = IProfileEditorInputProps & IProfileEditorProps;