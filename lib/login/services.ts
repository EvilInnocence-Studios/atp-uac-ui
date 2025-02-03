import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { ILoginRequest, ILoginResponse } from "@uac-shared/login/types";
import { IPermission } from "@uac-shared/permissions/types";
import { notification } from "antd";
import { useEffect } from "react";
import { memoizePromise } from "ts-functional";
import { Setter, useLocalStorage, useSharedState } from "unstateless";

const emptyUser = {
    userName: '',
    id: "0",
    email: "",
    mustUpdatePassword: false,
    prefix: "",
    firstName: "",
    lastName: "",
    suffix: "",
    createdAt: "",
};
const emptyLoggedInUser = {user: emptyUser, loginToken: '', permissions: []};

export const useLoggedInUserRaw = useLocalStorage.object<ILoginResponse>('loggedInUser', emptyLoggedInUser);
export const isLoggedIn = (user:ILoginResponse) => !!user.loginToken;
export const getLoginToken = () => useLoggedInUserRaw.getValue().loginToken;
export const getCurrentUser = () => useLoggedInUserRaw.getValue().user;

const loadDefaultPermissions = memoizePromise(() => services().permission.default());

export const useLoggedInUser = ():[ILoginResponse, Setter<ILoginResponse>] => {
    const [user, setUser] = useLoggedInUserRaw();
    const [defaultPermissions, setDefaultPermissions] = useSharedState<IPermission[]>('defaultPermissions', [])();

    useEffect(() => {
        if(defaultPermissions.length === 0) {
            loadDefaultPermissions().then(setDefaultPermissions);
        }
    }, []);

    // If the user is not logged in, fetch the default permissions from the api
    useEffect(() => {
        if (!isLoggedIn(user)) {
            setUser({...user, permissions: defaultPermissions});
        }
    }, [isLoggedIn(user)]);

    return [user, setUser];
}

export const loginServices = ({post}:IMethods) => ({
    login: (req:ILoginRequest) => post('login', req)
        .then(getResults<ILoginResponse>)
        .then((res:ILoginResponse) => {
            useLoggedInUserRaw.setValue(res);
            notification.success({message: 'Login Successful'});
        }).catch((err:Error) => {
            notification.error({message: 'Login Failed', description: err.message});
        }),

    logout: () => {
        notification.success({message: "You have been logged out"});
        useLoggedInUserRaw.setValue(emptyLoggedInUser);
    },
    forgotPassword: (userName: string) => post('user/forgotPassword', {userName})
        .then(() => notification.success({message: 'Password Reset Email Sent'})),
    forgotUsername: (email: string) => post('user/forgotUsername', {email})
        .then(() => notification.success({message: 'Username Reminder Email Sent'})),
});
