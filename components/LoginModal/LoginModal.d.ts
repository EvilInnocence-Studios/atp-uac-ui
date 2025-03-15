import { IModal } from "@core/lib/useModal";
import { ILoginResponse } from "@uac-shared/login/types";

export declare interface ILoginModalProps {
    user: ILoginResponse;
}

// What gets passed into the component from the parent as attributes
export declare interface ILoginModalInputProps {
    modal: IModal;
}

export type LoginModalProps = ILoginModalInputProps & ILoginModalProps;