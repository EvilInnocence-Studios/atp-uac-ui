import { Query } from "@core-shared/express/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { NewUser, SafeUser } from "@uac-shared/user/types";

export const userServices = ({get, post, /*put, patch, remove*/}:IMethods) => ({
    user: {
        create: (user:NewUser):Promise<SafeUser> => post('user', user)
            .then(getResults<SafeUser>),
        search: (query: Query):Promise<SafeUser[]> => get('user', query)
            .then(getResults<SafeUser[]>),
    }
});
