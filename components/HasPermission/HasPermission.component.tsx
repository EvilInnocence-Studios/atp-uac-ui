import { HasPermissionProps } from "./HasPermission.d";

export const HasPermissionComponent = ({show, children}:HasPermissionProps) => show
    ? children
    : null;
