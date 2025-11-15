import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IRole } from "@uac-shared/role/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserRoleManagerComponent } from "./UserRoleManager.component";
import { IUserRoleManagerInputProps, IUserRoleManagerProps, UserRoleManagerProps } from "./UserRoleManager.d";

const injectUserRoleManagerProps = createInjector(({user}:IUserRoleManagerInputProps):IUserRoleManagerProps => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [allRoles, setAllRoles] = useState<IRole[]>([]);
    const loader = useLoaderAsync();

    const u = services().user.role;
    const r = services().role;

    useEffect(() => {
        loader(async () => {
            const allRoles = await r.search({});
            setAllRoles(allRoles);
        });
        loader(async () => {
            const roles = await u.search(user.id);
            setRoles(roles);
        });
    }, [user.id]);

    const add = (role:IRole) => () => {
        loader(async () => {
            await u.add(user.id, role.id);
            setRoles([...roles, role]);
        });
    }

    const remove = (role:IRole) => () => {
        loader(async () => {
            await u.remove(user.id, role.id);
            setRoles(roles.filter(r => r.id !== role.id));
        });
    }

    return {roles, allRoles, add, remove, isLoading: loader.isLoading};
});

const connect = inject<IUserRoleManagerInputProps, UserRoleManagerProps>(mergeProps(
    injectUserRoleManagerProps,
));
export const connectUserRoleManager = connect;

export const UserRoleManager = overridable<IUserRoleManagerInputProps>(connect(UserRoleManagerComponent));
