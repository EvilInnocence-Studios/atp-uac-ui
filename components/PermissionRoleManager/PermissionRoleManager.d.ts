import { IPermission } from "@uac-shared/permissions/types";
import { IRole } from "@uac-shared/role/types";

export declare interface IPermissionRoleManagerProps {
    roles: IRole[];
    allRoles: IRole[];
    add(role: IRole): () => void;
    remove(role: IRole): () => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IPermissionRoleManagerInputProps {
    permission: IPermission;
    classes?: any;
}

export type PermissionRoleManagerProps = IPermissionRoleManagerInputProps & IPermissionRoleManagerProps;