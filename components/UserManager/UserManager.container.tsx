import { createInjector, inject, mergeProps } from "unstateless";
import {UserManagerComponent} from "./UserManager.component";
import {IUserManagerInputProps, UserManagerProps, IUserManagerProps} from "./UserManager.d";
import { useEffect, useState } from "react";
import { IUser, SafeUser } from "@uac-shared/user/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { all } from "ts-functional";
import { flash } from "@core/lib/flash";
import { appendTo, clear } from "@core/lib/util";
import { ColumnType } from "antd/es/table";
import { hasPermission } from "../HasPermission";
import { Editable } from "@core/components/Editable";
import { DeleteBtn } from "@core/components/DeleteBtn";

const CanUpdate = hasPermission("user.update");
const CanDelete = hasPermission("user.delete");

const injectUserManagerProps = createInjector(({}:IUserManagerInputProps):IUserManagerProps => {
    const [users, setUsers] = useState<SafeUser[]>([]);
    const loader =  useLoader();

    const user = services().user;

    const update = (id:number, field:string) => (value:any) => {
        const oldUsers = users;
        setUsers(users.map(u => u.id === id ? {...u, [field]: value} : u));
        loader.start();
        user.update(id, {[field]: value})
            .catch(all(() => setUsers(oldUsers), flash.error("Failed to update user")))
            .then(flash.success("User updated"))
            .finally(loader.stop);
    }

    const remove = (id:number) => () => {
        const oldUsers = users;
        setUsers(users.filter(u => u.id !== id));
        loader.start();
        user.remove(id)
            .catch(all(() => setUsers(oldUsers), flash.error("Failed to remove user")))
            .finally(loader.stop);
    }

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const create = () => {
        loader.start();
        user.create({userName, email, password: 'password', mustUpdatePassword: true})
            .then(appendTo(users))
            .then(all(
                refresh,
                flash.success(`User ${name} created`),
                clear(setUserName, setEmail, setPassword),
            ))
            .catch(flash.error("Failed to create user"))
            .finally(loader.stop);
    }

    const refresh = () => {
        loader.start();
        user.search({})
            .then(setUsers)
            .catch(flash.error("Failed to load users"))
            .finally(loader.stop);
    };
    useEffect(refresh, []);

    const columns:ColumnType<IUser>[] = [{
        title: "UserName",
        key: "userName",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.userName} onChange={update(record.id, "userName")} />
            </CanUpdate>
            <CanUpdate no>
                {record.name}
            </CanUpdate>
        </>,
    }, {
        title: "Email",
        key: "email",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.email} onChange={update(record.id, "email")} />
            </CanUpdate>
            <CanUpdate no>
                {record.description}
            </CanUpdate>
        </>,
    }, {
        title: "Password",
        key: "password",
        render: (record) => <>
            <CanUpdate yes>
                Password Updater goes here
            </CanUpdate>
            <CanUpdate no>
                {record.description}
            </CanUpdate>
        </>,
    },{
        title: "Actions",
        key: "actions",
        render: (record) => <CanDelete yes>
            <DeleteBtn entityType="permission" onClick={remove(record.id)} />
        </CanDelete>,
    }];
    
    return {users, isLoading: loader.isLoading, userName, email, password, setUserName, setEmail, setPassword, create, update, columns};

});

const connect = inject<IUserManagerInputProps, UserManagerProps>(mergeProps(
    injectUserManagerProps,
));

export const UserManager = connect(UserManagerComponent);
