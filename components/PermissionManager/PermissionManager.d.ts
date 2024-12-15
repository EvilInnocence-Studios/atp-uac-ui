import { IPermission } from "@uac-shared/permissions/types";

export declare interface IPermissionManagerProps {
    permissions: IPermissionp[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IPermissionManagerInputProps {

}

export type PermissionManagerProps = IPermissionManagerInputProps & IPermissionManagerProps;