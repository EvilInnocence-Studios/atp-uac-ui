import { Setter } from "unstateless";

export declare interface IPasswordResetProps {
    oldPassword: string;
    newPassword: string;
    setOldPassword: Setter<string>;
    setNewPassword: Setter<string>;
    update: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IPasswordResetInputProps {
    resetToken?: string;
    onUpdate?: () => void;
}

export type PasswordResetProps = IPasswordResetInputProps & IPasswordResetProps;