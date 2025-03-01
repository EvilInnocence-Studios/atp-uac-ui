import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IRole } from "@uac-shared/role/types";
import { NewUser, SafeUser, UserUpdate } from "@uac-shared/user/types";

export const userServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    user: {
        create: (user:NewUser):Promise<SafeUser> => post('user', user)
            .then(getResults<SafeUser>),
        search: (query: Query):Promise<SafeUser[]> => get('user', query)
            .then(getResults<SafeUser[]>),
        get: (id:string):Promise<SafeUser> => get(`user/${id}`),
        update: (id:string, user:Partial<UserUpdate>):Promise<SafeUser> => patch(`user/${id}`, user),
        resetPassword: (token:string, newPassword:string):Promise<void> => post('user/resetPassword', {token, newPassword}),
        getPasswordResetToken: (userName:string):Promise<string> => get(`user/passwordResetToken`, {userName}).then(getResults<string>),
        remove: (id:string):Promise<void> => remove(`user/${id}`, {}),
        role: {
            search: (userId:string):Promise<IRole[]> => get(`user/${userId}/role`)
                .then(getResults<IRole[]>),
            add: (userId:string, roleId:string):Promise<void> => post(`user/${userId}/role`, {roleId}),
            remove: (userId:string, roleId:string):Promise<void> => remove(`user/${userId}/role/${roleId}`),
        },
        subscribe: (userId:string, subscriptionId:string):Promise<void> => post(`user/${userId}/subscription`, {subscriptionId}),
        unsubscribe: (userId:string):Promise<void> => remove(`user/${userId}/subscription`),
    }
});
