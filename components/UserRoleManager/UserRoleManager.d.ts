import { SafeUser } from "@uac-shared/user/types";

export declare interface IUserRoleManagerProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IUserRoleManagerInputProps {
    user: SafeUser;
}

export type UserRoleManagerProps = IUserRoleManagerInputProps & IUserRoleManagerProps;