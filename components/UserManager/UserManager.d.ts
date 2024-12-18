import { SafeUser } from "@uac-shared/user/types";

export declare interface IUserManagerProps {
    users: SafeUser[];
    isLoading: boolean;
    userName: string;
    email: string;
    password: string;
    setUserName: Setter<string>;
    setEmail: Setter<string>;
    setPassword: Setter<string>;
    create: () => void;
    update: (id: number, field: string) => (value: any) => void;
    columns: ColumnType<SafeUser>[];

}

// What gets passed into the component from the parent as attributes
export declare interface IUserManagerInputProps {

}

export type UserManagerProps = IUserManagerInputProps & IUserManagerProps;