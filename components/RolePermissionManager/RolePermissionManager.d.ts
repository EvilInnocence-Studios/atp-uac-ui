import { IRole } from "@uac-shared/role/types";

export declare interface IRolePermissionManagerProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IRolePermissionManagerInputProps {
    role: IRole;
}

export type RolePermissionManagerProps = IRolePermissionManagerInputProps & IRolePermissionManagerProps;