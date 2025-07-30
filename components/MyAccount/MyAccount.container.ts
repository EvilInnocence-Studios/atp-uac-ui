import { useNavigate } from "react-router";
import { pipe, prepend } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { MyAccountComponent } from "./MyAccount.component";
import { IMyAccountInputProps, IMyAccountProps, MyAccountProps } from "./MyAccount.d";

const injectMyAccountProps = createInjector(({}:IMyAccountInputProps):IMyAccountProps => {
    const navigate = useNavigate();

    const changeTab = pipe<string, string, any>(prepend('/my-account/'), navigate);
    
    return {changeTab};
});

const connect = inject<IMyAccountInputProps, MyAccountProps>(mergeProps(
    injectMyAccountProps,
));

export const MyAccount = connect(MyAccountComponent);
