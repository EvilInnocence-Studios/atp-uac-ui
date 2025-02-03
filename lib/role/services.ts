import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IPermission } from "@uac-shared/permissions/types";
import { IRole, NewRole } from "@uac-shared/role/types";

export const roleServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    role: {
        create: (role:NewRole) => post('role', role).then(getResults<IRole>),
        search: (query: Query) => get('role', query).then(getResults<IRole[]>),
        update: (roleId:string, role: Partial<IRole>) => patch(`role/${roleId}`, role).then(getResults<IRole>),
        remove: (roleId:string) => remove(`role/${roleId}`),
        permission: {
            search: (roleId:string) => get(`role/${roleId}/permission`).then(getResults<IPermission[]>),
            add: (roleId:string, permissionId:string) => post(`role/${roleId}/permission`, {permissionId}),
            remove: (roleId:string, permissionId:string) => remove(`role/${roleId}/permission/${permissionId}`),
        }
    }
});