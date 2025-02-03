import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IPermission, NewPermission } from "@uac-shared/permissions/types";
import { IRole } from "@uac-shared/role/types";
import { memoizePromise } from "ts-functional";

export const permissionServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    permission: {
        create: (permission:NewPermission) => post('permission', permission).then(getResults<IPermission>),
        search: (query: Query) => get('permission', query).then(getResults<IPermission[]>),
        update: (id:string, data: Partial<IPermission>) => patch(`permission/${id}`, data),
        remove: (id:string) => remove(`permission/${id}`),
        default: memoizePromise(():Promise<IPermission[]> => get('permission/default').then(getResults<IPermission[]>)),
        role: {
            search: (permissionId:string) => get(`permission/${permissionId}/role`).then(getResults<IRole[]>),
            add: (permissionId:string, roleId:string) => post(`permission/${permissionId}/role`, {roleId}),
            remove: (permissionId:string, roleId:string) => remove(`permission/${permissionId}/role/${roleId}`),
        }
    }
});