import { IRole } from "@uac-shared/role/types";

export declare interface IRoleManagerProps {
    roles: IRole[];
    isLoading: boolean;
    name: string;
    description: string;
    setName: Setter<string>;
    setDescription: Setter<string>;
    create: () => void;
    update: (id: string, field: string) => (value: any) => void;
    columns: ColumnType<IRole>[];

}

// What gets passed into the component from the parent as attributes
export declare interface IRoleManagerInputProps {
    classes?: any;
}

export type RoleManagerProps = IRoleManagerInputProps & IRoleManagerProps;