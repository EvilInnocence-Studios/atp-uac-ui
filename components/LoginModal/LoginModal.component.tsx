import { isLoggedIn } from "@uac/lib/login/services";
import { LoginForm } from "../LoginForm";
import {LoginModalProps} from "./LoginModal.d";
import styles from './LoginModal.module.scss';

export const LoginModalComponent = ({modal, user}:LoginModalProps) =>
    <div className={styles.loginFormContainer} style={{display: modal.visible && !isLoggedIn(user) ? "block" : "none"}}>
        <LoginForm />
    </div>;
