import { IPermission } from "@uac-shared/permissions/types";
import { ColumnType } from "antd/es/table";
import { Setter } from "unstateless";

export declare interface IPermissionManagerProps {
    permissions: IPermission[];
    isLoading: boolean;
    name: string;
    description: string;
    setName: Setter<string>;
    setDescription: Setter<string>;
    create: () => void;
    update: (id:string, field: string) => (value: any) => void;
    columns: ColumnType<IPermission>[];
}

// What gets passed into the component from the parent as attributes
export declare interface IPermissionManagerInputProps {

}

export type PermissionManagerProps = IPermissionManagerInputProps & IPermissionManagerProps;