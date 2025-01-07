import { createInjector, inject, mergeProps } from "unstateless";
import {LoginFormComponent} from "./LoginForm.component";
import {ILoginFormInputProps, LoginFormProps, ILoginFormProps} from "./LoginForm.d";
import { useState } from "react";
import { services } from "@core/lib/api";
import { useModal } from "@core/lib/useModal";
import { useLoginForm } from "@uac/lib/useLoginForm";

const injectLoginFormProps = createInjector(({}:ILoginFormInputProps):ILoginFormProps => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const forgotUserNameForm = useModal();
    const createAccountForm = useModal();
    const modal = useLoginForm();

    const login = () => {
        services().login({userName, password});
    }

    const forgotPassword = () => {
        services().forgotPassword(userName);
    }

    const forgotUsername = () => {
        services().forgotUsername(email);
        forgotUserNameForm.close();
    }

    return {userName, setUserName, password, setPassword, email, setEmail, login, forgotPassword, forgotUsername, forgotUserNameForm, modal, createAccountForm};
});

const connect = inject<ILoginFormInputProps, LoginFormProps>(mergeProps(
    injectLoginFormProps,
));

export const LoginForm = connect(LoginFormComponent);
