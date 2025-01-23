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
        get: (id:number):Promise<SafeUser> => get(`user/${id}`),
        update: (id:number, user:Partial<UserUpdate>):Promise<SafeUser> => patch(`user/${id}`, user),
        remove: (id:number):Promise<void> => remove(`user/${id}`, {}),
        role: {
            search: (userId:number):Promise<IRole[]> => get(`user/${userId}/role`)
                .then(getResults<IRole[]>),
            add: (userId:number, roleId:number):Promise<void> => post(`user/${userId}/role`, {roleId}),
            remove: (userId:number, roleId:number):Promise<void> => remove(`user/${userId}/role/${roleId}`),
        },
    }
});
