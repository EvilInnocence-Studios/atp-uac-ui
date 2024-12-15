import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { IPermission } from "@uac-shared/permissions/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { PermissionManagerComponent } from "./PermissionManager.component";
import { IPermissionManagerInputProps, IPermissionManagerProps, PermissionManagerProps } from "./PermissionManager.d";

const injectPermissionManagerProps = createInjector(({}:IPermissionManagerInputProps):IPermissionManagerProps => {
    const loader = useLoader<IPermission[]>(() => services().permission.search({}), [], []);

    return {permissions: loader.data, isLoading: loader.isLoading};
});

const connect = inject<IPermissionManagerInputProps, PermissionManagerProps>(mergeProps(
    injectPermissionManagerProps,
));

export const PermissionManager = connect(PermissionManagerComponent);
