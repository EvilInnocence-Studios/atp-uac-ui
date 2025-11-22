import { IModal } from "@core/lib/useModal";

export declare interface ILoginFormProps {
    appName: string;
    userName: string;
    password: string;
    email: string;
    logoUrl: string;
    setUserName: (userName: string) => void;
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    login: () => void;
    forgotLogin: () => void;
    forgotLoginForm: IModal;
    createAccountForm: IModal;
    createAccount: () => void;
    modal: IModal;
}

// What gets passed into the component from the parent as attributes
export declare interface ILoginFormInputProps {
    inline?: boolean;
    classes?: any;
}

export type LoginFormProps = ILoginFormInputProps & ILoginFormProps;