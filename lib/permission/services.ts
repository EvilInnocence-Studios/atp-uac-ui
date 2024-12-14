import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";

export const permissionServices = ({get, post, /*put, patch, remove*/}:IMethods) => ({
    permission: {
        create: (name: string) => post('permission', { name }),
        search: (query: Query) => get('permission', query),
    }
});