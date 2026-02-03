import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { useLoggedInUser } from "@uac/lib/login/services";
import { createInjector, inject, mergeProps } from "unstateless";
import { useLoginForm } from "../../lib/useLoginForm";
import icon from './icon.svg';
import { LoginModalComponent } from "./LoginModal.component";
import { ILoginModalInputProps, ILoginModalProps, LoginModalProps } from "./LoginModal.d";

const injectLoginModalProps = createInjector(({}:ILoginModalInputProps):ILoginModalProps => {
    const [user] = useLoggedInUser();
    const loginModal = useLoginForm();
    
    return {user, loginModal};
});

const connect = inject<ILoginModalInputProps, LoginModalProps>(mergeProps(
    injectLoginModalProps,
));
export const connectLoginModal = connect;

export const LoginModal = withLayoutMetadata(
    overridable<ILoginModalInputProps>(connect(LoginModalComponent)),
    {
        name: "LoginModal",
        category: "UAC",
        displayName: "Login Modal",
        icon,
        description: "",
    }
);
