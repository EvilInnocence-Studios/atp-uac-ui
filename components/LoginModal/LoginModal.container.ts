import { createInjector, inject, mergeProps } from "unstateless";
import {LoginModalComponent} from "./LoginModal.component";
import {ILoginModalInputProps, LoginModalProps, ILoginModalProps} from "./LoginModal.d";
import { useLoggedInUser } from "@uac/lib/login/services";

const injectLoginModalProps = createInjector(({}:ILoginModalInputProps):ILoginModalProps => {
    const [user] = useLoggedInUser();
    
    return {user};
});

const connect = inject<ILoginModalInputProps, LoginModalProps>(mergeProps(
    injectLoginModalProps,
));

export const LoginModal = connect(LoginModalComponent);
