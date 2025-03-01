import { IModal } from "@core/lib/useModal";

export declare interface ILoginFormProps {
    userName: string;
    password: string;
    email: string;
    setUserName: (userName: string) => void;
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    login: () => void;
    forgotPassword: () => void;
    forgotUsername: () => void;
    forgotUserNameForm: IModal;
    createAccountForm: IModal;
    createAccount: () => void;
    modal:IModal;
}

// What gets passed into the component from the parent as attributes
export declare interface ILoginFormInputProps {
    inline: boolean;
}

export type LoginFormProps = ILoginFormInputProps & ILoginFormProps;