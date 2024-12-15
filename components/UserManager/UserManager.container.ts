import { createInjector, inject, mergeProps } from "unstateless";
import {UserManagerComponent} from "./UserManager.component";
import {IUserManagerInputProps, UserManagerProps, IUserManagerProps} from "./UserManager.d";

const injectUserManagerProps = createInjector(({}:IUserManagerInputProps):IUserManagerProps => {
    return {};
});

const connect = inject<IUserManagerInputProps, UserManagerProps>(mergeProps(
    injectUserManagerProps,
));

export const UserManager = connect(UserManagerComponent);
