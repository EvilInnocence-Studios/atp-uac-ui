import { notification } from "antd";
import { useLocalStorage } from "unstateless";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { ILoginRequest, ILoginResponse } from "@uac-shared/login/types";

const emptyUser = {userName: '', id: 0, email: "", mustUpdatePassword: false};
const emptyLoggedInUser = {user: emptyUser, loginToken: '', permissions: []};

export const useLoggedInUser = useLocalStorage.object<ILoginResponse>('loggedInUser', emptyLoggedInUser);
export const isLoggedIn = (user:ILoginResponse) => !!user.loginToken;
export const getLoginToken = () => useLoggedInUser.getValue().loginToken;
export const getCurrentUser = () => useLoggedInUser.getValue().user;

export const loginServices = ({post}:IMethods) => ({
    login: (req:ILoginRequest) => post('login', req)
        .then(getResults<ILoginResponse>)
        .then((res:ILoginResponse) => {
            useLoggedInUser.setValue(res);
            notification.success({message: 'Login Successful'});
        }).catch((err:Error) => {
            notification.error({message: 'Login Failed', description: err.message});
        }),

    logout: () => {
        notification.success({message: "You have been logged out"});
        useLoggedInUser.setValue(emptyLoggedInUser);
    }
});
