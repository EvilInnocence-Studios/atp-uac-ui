import { createInjector, inject, mergeProps } from "unstateless";
import {PermissionRoleManagerComponent} from "./PermissionRoleManager.component";
import {IPermissionRoleManagerInputProps, PermissionRoleManagerProps, IPermissionRoleManagerProps} from "./PermissionRoleManager.d";
import { IRole } from "@uac-shared/role/types";
import { useEffect, useState } from "react";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { flash } from "@core/lib/flash";

const injectPermissionRoleManagerProps = createInjector(({permission}:IPermissionRoleManagerInputProps):IPermissionRoleManagerProps => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [allRoles, setAllRoles] = useState<IRole[]>([]);
    const loader = useLoader();

    const p = services().permission;
    const r = services().role;

    useEffect(() => {
        loader.start();
        r.search({})
            .then(setAllRoles)
            .catch(flash.error("Failed to load roles"))
            .finally(loader.stop);
    }, []);

    const add = (role:IRole) => () => {
        loader.start();
        p.role.add(permission.id, role.id)
            .then(() => {
                setRoles([...roles, role]);
            })
            .then(flash.success(`Role ${role.name} added`))
            .catch(flash.error("Failed to add role"))
            .finally(loader.stop);
    }

    const remove = (role:IRole) => () => {
        loader.start();
        p.role.remove(permission.id, role.id)
            .then(() => {
                setRoles(roles.filter(r => r.id !== role.id));
            })
            .then(flash.success(`Role ${role.name} removed`))
            .catch(flash.error("Failed to remove role"))
            .finally(loader.stop);
    }

    useEffect(() => {
        p.role.search(permission.id).then(setRoles);
    }, []);
    
    return {roles, allRoles, add, remove, isLoading: loader.isLoading};
});

const connect = inject<IPermissionRoleManagerInputProps, PermissionRoleManagerProps>(mergeProps(
    injectPermissionRoleManagerProps,
));

export const PermissionRoleManager = connect(PermissionRoleManagerComponent);
