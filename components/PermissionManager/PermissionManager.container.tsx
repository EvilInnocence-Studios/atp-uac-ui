import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { appendTo, clear } from "@core/lib/util";
import { IPermission } from "@uac-shared/permissions/types";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { hasPermission } from "../HasPermission";
import { PermissionManagerComponent } from "./PermissionManager.component";
import { IPermissionManagerInputProps, IPermissionManagerProps, PermissionManagerProps } from "./PermissionManager.d";

const CanUpdate = hasPermission("permission.update");
const CanDelete = hasPermission("permission.delete");

const injectPermissionManagerProps = createInjector(({}:IPermissionManagerInputProps):IPermissionManagerProps => {
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const loader =  useLoader();

    const permission = services().permission;

    const update = (id:number, field:string) => (value:any) => {
        const oldPermissions = permissions;
        setPermissions(permissions.map(p => p.id === id ? {...p, [field]: value} : p));
        loader.start();
        permission.update(id, {[field]: value})
            .then(flash.success("Permission updated"))
            .catch(all(() => setPermissions(oldPermissions), flash.error("Failed to update permission")))
            .finally(loader.stop);
    }

    const remove = (id:number) => () => {
        const oldPermissions = permissions;
        setPermissions(permissions.filter(p => p.id !== id));
        loader.start();
        permission.remove(id)
            .catch(all(() => setPermissions(oldPermissions), flash.error("Failed to remove permission")))
            .finally(loader.stop);
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const create = () => {
        loader.start();
        permission.create({name, description})
            .then(appendTo(permissions))
            .then(all(
                refresh,
                flash.success(`Permission ${name} created`),
                clear(setName, setDescription),
            ))
            .catch(flash.error("Failed to create permission"))
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        permission.search({})
            .then(setPermissions)
            .catch(flash.error("Failed to load permissions"))
            .finally(loader.stop);
    };
    useEffect(refresh, []);

    const columns:ColumnType<IPermission>[] = [{
        title: "Name",
        key: "name",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.name} onChange={update(record.id, "name")} />
            </CanUpdate>
            <CanUpdate no>
                {record.name}
            </CanUpdate>
        </>,
    }, {
        title: "Description",
        key: "description",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.description} onChange={update(record.id, "description")} />
            </CanUpdate>
            <CanUpdate no>
                {record.description}
            </CanUpdate>
        </>,
    }, {
        title: "Actions",
        key: "actions",
        render: (record) => <CanDelete yes>
            <DeleteBtn entityType="permission" onClick={remove(record.id)} />
        </CanDelete>,
    }];
    
    return {permissions, isLoading: loader.isLoading, name, description, setName, setDescription, create, update, columns};
});

const connect = inject<IPermissionManagerInputProps, PermissionManagerProps>(mergeProps(
    injectPermissionManagerProps,
));

export const PermissionManager = connect(PermissionManagerComponent);
