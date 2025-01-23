import { Spin, Tag } from "antd";
import {UserRoleManagerProps} from "./UserRoleManager.d";
import styles from './UserRoleManager.module.scss';
import { prop } from "ts-functional";

export const UserRoleManagerComponent = ({user, roles, allRoles, add, remove, isLoading}:UserRoleManagerProps) =>
    <Spin spinning={isLoading}>
        <b>Roles for {user.userName}</b><br/>
        {allRoles.map(role => <>
            <Tag
                key={role.id}
                className={styles.tag}
                color={roles.map(prop("id")).includes(role.id) ? "green" : "red"}
                onClick={roles.map(prop("id")).includes(role.id) ? remove(role) : add(role)}
            >
                {role.name}
            </Tag>
        </>)}
    </Spin>;
