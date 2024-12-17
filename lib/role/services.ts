import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IRole, NewRole } from "@uac-shared/role/types";

export const roleServices = ({get, post, /*put,*/ patch, remove}:IMethods) => ({
    role: {
        create: (role:NewRole) => post('role', role).then(getResults<IRole>),
        search: (query: Query) => get('role', query).then(getResults<IRole[]>),
        update: (roleId: number, role: Partial<IRole>) => patch(`role/${roleId}`, role).then(getResults<IRole>),
        remove: (roleId: number) => remove(`role/${roleId}`),
    }
});