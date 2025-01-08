import { createInjector, inject, mergeProps } from "unstateless";
import {LoginFormComponent} from "./LoginForm.component";
import {ILoginFormInputProps, LoginFormProps, ILoginFormProps} from "./LoginForm.d";
import { useState } from "react";
import { services } from "@core/lib/api";
import { useModal } from "@core/lib/useModal";
import { useLoginForm } from "@uac/lib/useLoginForm";
import dayjs from "dayjs";
import { all } from "ts-functional";
import { flash } from "@core/lib/flash";

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

    const createAccount = () => {
        services().user.create({
            userName, password, email,
            prefix: "", firstName: "", lastName: "",
            mustUpdatePassword: false,
            suffix: "",
            createdAt: dayjs().toISOString(),
        }).then(all(createAccountForm.close, modal.close, flash.success("Account created"), login));
    }

    return {
        userName, setUserName,
        password, setPassword,
        email, setEmail,
        login, forgotPassword, forgotUsername, forgotUserNameForm, modal,
        createAccountForm, createAccount
    };
});

const connect = inject<ILoginFormInputProps, LoginFormProps>(mergeProps(
    injectLoginFormProps,
));

export const LoginForm = connect(LoginFormComponent);
