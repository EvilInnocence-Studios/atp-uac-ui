import { IRole } from "@uac-shared/role/types";
import { SafeUser } from "@uac-shared/user/types";

export declare interface IUserRoleManagerProps {
    roles: IRole[];
    allRoles: IRole[];
    add(role: IRole): () => void;
    remove(role: IRole): () => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserRoleManagerInputProps {
    user: SafeUser;
}

export type UserRoleManagerProps = IUserRoleManagerInputProps & IUserRoleManagerProps;