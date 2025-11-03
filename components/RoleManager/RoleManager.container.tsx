import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoader } from "@core/lib/useLoader";
import { useTableFilters } from "@core/lib/useTableFilters";
import { appendTo, clear } from "@core/lib/util";
import { IRole } from "@uac-shared/role/types";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { hasPermission } from "../HasPermission";
import { RoleManagerComponent } from "./RoleManager.component";
import { IRoleManagerInputProps, IRoleManagerProps, RoleManagerProps } from "./RoleManager.d";

const CanUpdate = hasPermission("role.update");
const CanDelete = hasPermission("role.delete");

const injectRoleManagerProps = createInjector(({}:IRoleManagerInputProps):IRoleManagerProps => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const loader =  useLoader();

    const role = services().role;

    const update = (id:string, field:string) => (value:any) => {
        const oldRoles = roles;
        setRoles(roles.map(r => r.id === id ? {...r, [field]: value} : r));
        loader.start();
        role.update(id, {[field]: value})
            .then(flash.success("Role updated"))
            .catch(all(() => setRoles(oldRoles), flash.error("Failed to update role")))
            .finally(loader.stop);
    }

    const remove = (id:string) => () => {
        const oldroles = roles;
        setRoles(roles.filter(r => r.id !== id));
        loader.start();
        role.remove(id)
            .catch(all(() => setRoles(oldroles), flash.error("Failed to remove role")))
            .finally(loader.stop);
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const create = () => {
        loader.start();
        role.create({name, description})
            .then(appendTo(roles))
            .then(all(
                refresh,
                flash.success(`Role ${name} created`),
                clear(setName, setDescription),
            ))
            .catch(flash.error("Failed to create role"))
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        role.search({})
            .then(setRoles)
            .catch(flash.error("Failed to load roles"))
            .finally(loader.stop);
    };
    useEffect(refresh, []);

    const filters = useTableFilters<IRole>(roles);
    const columns:ColumnType<IRole>[] = [{
        title: filters.filter("Name", "name"),
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
        title: filters.filter("Description", "description"),
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
            <DeleteBtn entityType="role" onClick={remove(record.id)} />
        </CanDelete>,
    }];
    
    return {roles: filters.items, isLoading: loader.isLoading, name, description, setName, setDescription, create, update, columns};
});

const connect = inject<IRoleManagerInputProps, RoleManagerProps>(mergeProps(
    injectRoleManagerProps,
));

export const RoleManager = overridable<IRoleManagerInputProps>(connect(RoleManagerComponent));
