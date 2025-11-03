import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoader } from "@core/lib/useLoader";
import { IPermission } from "@uac-shared/permissions/types";
import { useEffect, useState } from "react";
import { partition } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { RolePermissionManagerComponent } from "./RolePermissionManager.component";
import { IRolePermissionManagerInputProps, IRolePermissionManagerProps, RolePermissionManagerProps } from "./RolePermissionManager.d";

const injectRolePermissionManagerProps = createInjector(({role}:IRolePermissionManagerInputProps):IRolePermissionManagerProps => {
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const [allPermissions, setAllPermissions] = useState<IPermission[]>([]);
    const loader = useLoader();

    const permission = services().permission;
    const r = services().role;

    useEffect(() => {
        loader.start();
        permission.search({})
            .then(setAllPermissions)
            .catch(flash.error("Failed to load permissions"))
            .finally(loader.stop);
    }, []);

    const add = (permission:IPermission) => () => {
        loader.start();
        r.permission.add(role.id, permission.id)
            .then(() => {
                setPermissions([...permissions, permission]);
            })
            .then(flash.success(`Permission ${permission.name} added`))
            .catch(flash.error("Failed to add permission"))
            .finally(loader.stop);
    }

    const addAll = (addedPermissions:IPermission[]) => () => {
        loader.start();
        Promise.all(addedPermissions.map(p => r.permission.add(role.id, p.id)))
            .then(() => {
                setPermissions([...permissions, ...addedPermissions]);
            })
            .then(flash.success(`Permissions added`))
            .catch(flash.error("Failed to add permissions"))
            .finally(loader.stop);
    }

    const remove = (permission:IPermission) => () => {
        loader.start();
        r.permission.remove(role.id, permission.id)
            .then(() => {
                setPermissions(permissions.filter(p => p.id !== permission.id));
            })
            .then(flash.success(`Permission ${permission.name} removed`))
            .catch(flash.error("Failed to remove permission"))
            .finally(loader.stop);
    }

    const removeAll = (removedPermissions:IPermission[]) => () => {
        loader.start();
        Promise.all(removedPermissions.map(p => r.permission.remove(role.id, p.id)))
            .then(() => {
                setPermissions(permissions.filter(p => !removedPermissions.some(rp => rp.id === p.id)));
            })
            .then(flash.success(`Permissions removed`))
            .catch(flash.error("Failed to remove permissions"))
            .finally(loader.stop);
    }

    useEffect(() => {
        r.permission.search(role.id).then(setPermissions);
    }, []);

    const groupedPermissions = partition<IPermission>(p => p.name.split(".")[0])(allPermissions);
    
    return {permissions, groupedPermissions, add, addAll, remove, removeAll, isLoading: loader.isLoading};
});

const connect = inject<IRolePermissionManagerInputProps, RolePermissionManagerProps>(mergeProps(
    injectRolePermissionManagerProps,
));

export const RolePermissionManager = overridable<IRolePermissionManagerInputProps>(connect(RolePermissionManagerComponent));
