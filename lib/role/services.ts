import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";

export const roleServices = ({get, post, /*put, patch, remove*/}:IMethods) => ({
    role: {
        create: (roleName: string) => post('role', { roleName }),
        search: (query: Query) => get('role', query),
    }
});