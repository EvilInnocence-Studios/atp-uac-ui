import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { NewUser, SafeUser, UserUpdate } from "@uac-shared/user/types";

export const userServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    user: {
        create: (user:NewUser):Promise<SafeUser> => post('user', user)
            .then(getResults<SafeUser>),
        search: (query: Query):Promise<SafeUser[]> => get('user', query)
            .then(getResults<SafeUser[]>),
        update: (id:number, user:Partial<UserUpdate>):Promise<SafeUser> => patch(`user/${id}`, user),
        remove: (id:number):Promise<void> => remove(`user/${id}`, {}),
        role: {
            add: (userId:number, roleId:number):Promise<void> => post(`user/${userId}/role`, {roleId}),
            remove: (userId:number, roleId:number):Promise<void> => remove(`user/${userId}/role/${roleId}`),
        }
    }
});
