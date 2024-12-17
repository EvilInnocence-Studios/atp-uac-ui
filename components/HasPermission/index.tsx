import { IHasPermissionInputPropsBase } from "./HasPermission";

import {HasPermission as HasPermissionBase} from "./HasPermission.container";

export const hasPermission = (...permissions: string[]) =>
    (props: Omit<IHasPermissionInputPropsBase, "permissions"> & ({ yes: boolean; no?: never } | { no: boolean; yes?: never })) =>
        <HasPermissionBase permissions={permissions} {...props} />;

export const HasPermission = HasPermissionBase;