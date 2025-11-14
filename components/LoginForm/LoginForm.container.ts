import { useSetting } from "@common/lib/setting/services";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useModal } from "@core/lib/useModal";
import { useLoginForm } from "@uac/lib/useLoginForm";
import dayjs from "dayjs";
import { useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { LoginFormComponent } from "./LoginForm.component";
import { ILoginFormInputProps, ILoginFormProps, LoginFormProps } from "./LoginForm.d";

const injectLoginFormProps = createInjector(({}:ILoginFormInputProps):ILoginFormProps => {
    const appName = useSetting("siteName");
    const logoUrl = useSetting("siteLogoUrl");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const forgotLoginForm = useModal();
    const createAccountForm = useModal();
    const modal = useLoginForm();

    const login = () => {
        services().login({userName, password});
    }

    const forgotLogin = () => {
        services().forgotLogin(email);
        forgotLoginForm.close();
    }

    const createAccount = () => {
        services().user.create({
            userName, password, email,
            prefix: "", firstName: "", lastName: "",
            mustUpdatePassword: false,
            suffix: "",
            subscriptionId: null,
            createdAt: dayjs().toISOString(),
        }).then(all(createAccountForm.close, modal.close, flash.success("Account created"), login));
    }

    return {
        appName, logoUrl,
        userName, setUserName,
        password, setPassword,
        email, setEmail,
        login, forgotLogin, forgotLoginForm, modal,
        createAccountForm, createAccount
    };
});

const connect = inject<ILoginFormInputProps, LoginFormProps>(mergeProps(
    injectLoginFormProps,
));

export const LoginForm = overridable<ILoginFormInputProps>(connect(LoginFormComponent));
