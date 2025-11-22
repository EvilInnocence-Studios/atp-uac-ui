import { Setter } from "unstateless";

export declare interface IPasswordResetProps {
    newPassword: string;
    setNewPassword: Setter<string>;
    oldPassword: string;
    setOldPassword: Setter<string>;
    update: () => void;
    requireOldPassword: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IPasswordResetInputProps {
    userId?: string;
    onUpdate?: () => void;
    successMsg?: string;
    failMsg?: string;
    classes?: any;
}

export type PasswordResetProps = IPasswordResetInputProps & IPasswordResetProps;