import { createInjector, inject, mergeProps } from "unstateless";
import {RoleManagerComponent} from "./RoleManager.component";
import {IRoleManagerInputProps, RoleManagerProps, IRoleManagerProps} from "./RoleManager.d";

const injectRoleManagerProps = createInjector(({}:IRoleManagerInputProps):IRoleManagerProps => {
    return {};
});

const connect = inject<IRoleManagerInputProps, RoleManagerProps>(mergeProps(
    injectRoleManagerProps,
));

export const RoleManager = connect(RoleManagerComponent);
