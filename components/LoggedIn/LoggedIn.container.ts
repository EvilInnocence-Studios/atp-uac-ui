import { overridable } from "@core/lib/overridable";
import { useLoggedInUser } from "@uac/lib/login/services";
import { createInjector, inject, mergeProps } from "unstateless";
import { LoggedInComponent } from "./LoggedIn.component";
import { ILoggedInInputProps, ILoggedInProps, LoggedInProps } from "./LoggedIn.d";

const injectLoggedInProps = createInjector(({yes, no}:ILoggedInInputProps):ILoggedInProps => {
    const [loggedInUser] = useLoggedInUser();
    const loggedIn = !!loggedInUser && !!loggedInUser.loginToken;

    return yes && loggedIn || no && !loggedIn
        ? {show: true}
        : {show: false};
});

const connect = inject<ILoggedInInputProps, LoggedInProps>(mergeProps(
    injectLoggedInProps,
));
export const connectLoggedIn = connect;

export const LoggedIn = overridable<ILoggedInInputProps>(connect(LoggedInComponent));
