import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IPermission } from "@uac-shared/permissions/types";

export const permissionServices = ({get, post, /*put, patch, remove*/}:IMethods) => ({
    permission: {
        create: (name: string) => post('permission', { name }),
        search: (query: Query) => get('permission', query).then(getResults<IPermission[]>),
    }
});