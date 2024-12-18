import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IPermission, NewPermission } from "@uac-shared/permissions/types";
import { IRole } from "@uac-shared/role/types";

export const permissionServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    permission: {
        create: (permission:NewPermission) => post('permission', permission).then(getResults<IPermission>),
        search: (query: Query) => get('permission', query).then(getResults<IPermission[]>),
        update: (id: number, data: Partial<IPermission>) => patch(`permission/${id}`, data),
        remove: (id: number) => remove(`permission/${id}`),
        role: {
            search: (permissionId: number) => get(`permission/${permissionId}/role`).then(getResults<IRole[]>),
            add: (permissionId: number, roleId: number) => post(`permission/${permissionId}/role`, {roleId}),
            remove: (permissionId: number, roleId: number) => remove(`permission/${permissionId}/role/${roleId}`),
        }
    }
});