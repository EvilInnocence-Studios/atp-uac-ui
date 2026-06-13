import { overridable } from "@core/lib/overridable";
import { isLoggedIn } from "@uac/lib/login/services";
import clsx from "clsx";
import { LoginForm } from "../LoginForm";
import { LoginModalProps } from "./LoginModal.d";
import styles from './LoginModal.module.scss';

export const LoginModalComponent = overridable(({ loginModal, user, classes = styles }: LoginModalProps) => {
    return <div className={clsx(classes.loginFormContainer, "loginModalContainer")} style={{ display: loginModal.visible && !isLoggedIn(user) ? "block" : "none" }}>
        <LoginForm />
    </div>;
});
