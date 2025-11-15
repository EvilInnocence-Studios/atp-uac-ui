import { overridable } from "@core/lib/overridable";
import { usePermissions } from "@uac/lib/permission/usePermissions";
import { createInjector, inject, mergeProps } from "unstateless";
import { HasPermissionComponent } from "./HasPermission.component";
import { HasPermissionProps, IHasPermissionInputProps, IHasPermissionProps } from "./HasPermission.d";

const injectHasPermissionProps = createInjector(({permissions, yes, no}:IHasPermissionInputProps):IHasPermissionProps => {
    const {hasAnyPermission} = usePermissions();

    return yes && hasAnyPermission(permissions) || no && !hasAnyPermission(permissions)
        ? {show: true}
        : {show: false};
});

const connect = inject<IHasPermissionInputProps, HasPermissionProps>(mergeProps(
    injectHasPermissionProps,
));
export const connectHasPermission = connect;

export const HasPermission = overridable<IHasPermissionInputProps>(connect(HasPermissionComponent));
