import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IRole } from "@uac-shared/role/types";

export const roleServices = ({get, post, /*put, patch, remove*/}:IMethods) => ({
    role: {
        create: (roleName: string) => post('role', { roleName }).then(getResults<IRole>),
        search: (query: Query) => get('role', query).then(getResults<IRole[]>),
    }
});