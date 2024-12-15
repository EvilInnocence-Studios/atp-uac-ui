import { IPermission } from "@uac-shared/permissions/types";
import { Setter } from "unstateless";

export declare interface IPermissionManagerProps {
    permissions: IPermissionp[];
    isLoading: boolean;
    name: string;
    description: string;
    setName: Setter<string>;
    setDescription: Setter<string>;
    create: () => void;
    update: (id: number, field: string) => (value: any) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IPermissionManagerInputProps {

}

export type PermissionManagerProps = IPermissionManagerInputProps & IPermissionManagerProps;