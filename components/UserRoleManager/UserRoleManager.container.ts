import { createInjector, inject, mergeProps } from "unstateless";
import {UserRoleManagerComponent} from "./UserRoleManager.component";
import {IUserRoleManagerInputProps, UserRoleManagerProps, IUserRoleManagerProps} from "./UserRoleManager.d";

const injectUserRoleManagerProps = createInjector(({}:IUserRoleManagerInputProps):IUserRoleManagerProps => {
    return {};
});

const connect = inject<IUserRoleManagerInputProps, UserRoleManagerProps>(mergeProps(
    injectUserRoleManagerProps,
));

export const UserRoleManager = connect(UserRoleManagerComponent);
