import { IModal } from "@core/lib/useModal";
import { ILoginResponse } from "@uac-shared/login/types";

export declare interface ILoginModalProps {
    user: ILoginResponse;
    loginModal: IModal;
}

// What gets passed into the component from the parent as attributes
export declare interface ILoginModalInputProps {
    classes?: any;
}

export type LoginModalProps = ILoginModalInputProps & ILoginModalProps;