import { createInjector, inject, mergeProps } from "unstateless";
import {PermissionManagerComponent} from "./PermissionManager.component";
import {IPermissionManagerInputProps, PermissionManagerProps, IPermissionManagerProps} from "./PermissionManager.d";
import { useEffect, useState } from "react";
import { IPermission } from "@uac-shared/permissions/types";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";

const injectPermissionManagerProps = createInjector(({}:IPermissionManagerInputProps):IPermissionManagerProps => {
    const [permissions, setPermissions] = useState<IPermission[]>([]);

    const p = services().permission;

    const update = (id:number, field:string) => (value:any) => {
        const oldPermissions = permissions;
        setPermissions(permissions.map(p => p.id === id ? {...p, [field]: value} : p));
        loader.start();
        p.update(id, {[field]: value})
            .catch(() => setPermissions(oldPermissions))
            .finally(loader.stop);
    }

    const remove = (id:number) => {
        const oldPermissions = permissions;
        setPermissions(permissions.filter(p => p.id !== id));
        loader.start();
        p.remove(id)
            .catch(() => setPermissions(oldPermissions))
            .finally(loader.stop);
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const create = () => {
        loader.start();
        p.create({name, description})
            .then(newPermission => setPermissions([...permissions, newPermission]))
            .finally(loader.stop);
    }

    const loader =  useLoader();
    useEffect(() => {
        loader.start();
        services().permission.search({})
            .then(setPermissions)
            .finally(loader.stop);
    }, []);
    
    return {permissions, isLoading: loader.isLoading, name, description, setName, setDescription, create, update};
});

const connect = inject<IPermissionManagerInputProps, PermissionManagerProps>(mergeProps(
    injectPermissionManagerProps,
));

export const PermissionManager = connect(PermissionManagerComponent);
