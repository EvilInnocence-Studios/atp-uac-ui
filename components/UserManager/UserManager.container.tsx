import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { useTableFilters } from "@core/lib/useTableFilters";
import { appendTo, clear } from "@core/lib/util";
import { IUser, SafeUser } from "@uac-shared/user/types";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { hasPermission } from "../HasPermission";
import { UserManagerComponent } from "./UserManager.component";
import { IUserManagerInputProps, IUserManagerProps, UserManagerProps } from "./UserManager.d";
import { IOrder } from "@store-shared/order/types";

const CanUpdate = hasPermission("user.update");
const CanDelete = hasPermission("user.delete");

const injectUserManagerProps = createInjector(({}:IUserManagerInputProps):IUserManagerProps => {
    const [users, setUsers] = useState<SafeUser[]>([]);
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    const loader =  useLoader();

    const user = services().user;

    const update = (id:string, field:string) => (value:any) => {
        const oldUsers = users;
        setUsers(users.map(u => u.id === id ? {...u, [field]: value} : u));
        loader.start();
        user.update(id, {[field]: value})
            .then(flash.success("User updated"))
            .catch(all(() => setUsers(oldUsers), flash.error("Failed to update user")))
            .finally(loader.stop);
    }

    const remove = (id:string) => () => {
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
        user.create({
                userName,
                email,
                password: 'password',
                mustUpdatePassword: true,
                prefix: "",
                firstName: "",
                lastName: "",
                suffix: "",
                subscriptionId: null,
                createdAt: dayjs().toISOString()
            })
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

    const filters = useTableFilters(users);
    const columns:ColumnType<IUser>[] = [{
        title: filters.filter("User Name", "userName"),
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
        title: filters.filter("Email", "email"),
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
        title: filters.filter("First Name", "firstName"),
        key: "firstName",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.firstName} onChange={update(record.id, "firstName")} />
            </CanUpdate>
            <CanUpdate no>
                {record.firstName}
            </CanUpdate>
        </>,
    },{
        title: filters.filter("Last Name", "lastName"),
        key: "lastName",
        render: (record) => <>
            <CanUpdate yes>
                <Editable value={record.lastName} onChange={update(record.id, "lastName")} />
            </CanUpdate>
            <CanUpdate no>
                {record.lastName}
            </CanUpdate>
        </>,
    },{
        title: filters.Clear,
        key: "actions",
        render: (record) => <CanDelete yes>
            <DeleteBtn entityType="user" onClick={remove(record.id)} />
        </CanDelete>,
    }];

    const onSelectOrder = (order: IOrder) => () => {
        setOrderId(order.id);
    }
    
    return {
        users: filters.items, isLoading: loader.isLoading, userName, email, password,
        setUserName, setEmail, setPassword, create, update,
        columns, orderId, onSelectOrder,
    };

});

const connect = inject<IUserManagerInputProps, UserManagerProps>(mergeProps(
    injectUserManagerProps,
));

export const UserManager = connect(UserManagerComponent);
