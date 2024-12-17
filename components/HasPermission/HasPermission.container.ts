import { createInjector, inject, mergeProps } from "unstateless";
import {HasPermissionComponent} from "./HasPermission.component";
import {IHasPermissionInputProps, HasPermissionProps, IHasPermissionProps} from "./HasPermission.d";
import { useLoggedInUser } from "@uac/lib/login/services";
import { intersection, prop } from "ts-functional";

const injectHasPermissionProps = createInjector(({permissions, yes, no}:IHasPermissionInputProps):IHasPermissionProps => {
    const [loggedInUser] = useLoggedInUser();
    const hasPermission = intersection(permissions, loggedInUser.permissions.map(prop("name"))).length > 0;

    return yes && hasPermission || no && !hasPermission
        ? {show: true}
        : {show: false};
});

const connect = inject<IHasPermissionInputProps, HasPermissionProps>(mergeProps(
    injectHasPermissionProps,
));

export const HasPermission = connect(HasPermissionComponent);
