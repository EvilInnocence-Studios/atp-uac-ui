import { overridable } from "@core/lib/overridable";
import { useLoggedInUser } from "@uac/lib/login/services";
import { createInjector, inject, mergeProps } from "unstateless";
import { LoginModalComponent } from "./LoginModal.component";
import { ILoginModalInputProps, ILoginModalProps, LoginModalProps } from "./LoginModal.d";

const injectLoginModalProps = createInjector(({}:ILoginModalInputProps):ILoginModalProps => {
    const [user] = useLoggedInUser();
    
    return {user};
});

const connect = inject<ILoginModalInputProps, LoginModalProps>(mergeProps(
    injectLoginModalProps,
));

export const LoginModal = overridable<ILoginModalInputProps>(connect(LoginModalComponent));
