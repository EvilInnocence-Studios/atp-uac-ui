import { createInjector, inject, mergeProps } from "unstateless";
import {RolePermissionManagerComponent} from "./RolePermissionManager.component";
import {IRolePermissionManagerInputProps, RolePermissionManagerProps, IRolePermissionManagerProps} from "./RolePermissionManager.d";

const injectRolePermissionManagerProps = createInjector(({}:IRolePermissionManagerInputProps):IRolePermissionManagerProps => {
    return {};
});

const connect = inject<IRolePermissionManagerInputProps, RolePermissionManagerProps>(mergeProps(
    injectRolePermissionManagerProps,
));

export const RolePermissionManager = connect(RolePermissionManagerComponent);
