import { IPermission } from "@uac-shared/permissions/types";
import { IRole } from "@uac-shared/role/types";
import { IHash } from "ts-functional/dist/types";

export declare interface IRolePermissionManagerProps {
    permissions: IPermission[];
    groupedPermissions: IHash<IPermission>;
    add(permission: IPermission): () => void;
    addAll(addedPermissions: IPermission[]): () => void;
    remove(permission: IPermission): () => void;
    removeAll(removedPermissions: IPermission[]): () => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IRolePermissionManagerInputProps {
    role: IRole;
    classes?: any;
}

export type RolePermissionManagerProps = IRolePermissionManagerInputProps & IRolePermissionManagerProps;