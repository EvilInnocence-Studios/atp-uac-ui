import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IPermission } from "@uac-shared/permissions/types";

export const permissionServices = ({get, post, /*put, patch,*/ remove}:IMethods) => ({
    permission: {
        create: (permission:Partial<IPermission>) => post('permission', permission).then(getResults<IPermission>),
        search: (query: Query) => get('permission', query).then(getResults<IPermission[]>),
        update: (id: number, data: Partial<IPermission>) => post(`permission/${id}`, data),
        remove: (id: number) => remove(`permission/${id}`),
    }
});