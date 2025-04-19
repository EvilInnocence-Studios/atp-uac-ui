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
    subscriptionId: null,
    createdAt: "",
};
const emptyLoggedInUser = {user: emptyUser, loginToken: '', permissions: []};

export const useLoggedInUserRaw = useLocalStorage.object<ILoginResponse>('loggedInUser', emptyLoggedInUser);
export const isLoggedIn = (user:ILoginResponse) => !!user.loginToken;
export const getLoginToken = () => useLoggedInUserRaw.getValue().loginToken;
export const getCurrentUser = () => useLoggedInUserRaw.getValue().user;

const loadDefaultPermissions = memoizePromise(() => services().permission.default());

export const useLoggedInUser = ():[ILoginResponse, Setter<ILoginResponse>, () => void] => {
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

    const refresh = () => {
        if (isLoggedIn(user)) {
            services().profile().then(setUser);
        }
    }

    return [user, setUser, refresh];
}

export const loginServices = ({get, post}:IMethods) => ({
    login: (req:ILoginRequest) => post('login', req)
        .then(getResults<ILoginResponse>)
        .then((res:ILoginResponse) => {
            useLoggedInUserRaw.setValue(res);
            notification.success({message: 'Login Successful'});
        }).catch(() => {
            notification.error({message: 'Login Failed'});
        }),
    logout: () => {
        notification.success({message: "You have been logged out"});
        useLoggedInUserRaw.setValue(emptyLoggedInUser);
    },
    profile: () => get('profile')
        .then(getResults<ILoginResponse>),
    forgotLogin: (email: string) => post('user/forgotLogin', {email})
        .then(() => notification.success({message: 'Email Sent'})),
});
