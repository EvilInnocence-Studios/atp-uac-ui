import { Spin, Tag } from "antd";
import { PermissionRoleManagerProps } from "./PermissionRoleManager.d";
import styles from './PermissionRoleManager.module.scss';
import { prop } from "ts-functional";

export const PermissionRoleManagerComponent = ({permission, roles, allRoles, add, remove, isLoading}:PermissionRoleManagerProps) =>
    <Spin spinning={isLoading}>
        <b>Roles for {permission.name}</b><br/>
        {allRoles.map(role =>
            <Tag
                key={role.id}
                className={styles.tag}
                color={roles.map(prop("id")).includes(role.id) ? "green" : "red"}
                onClick={roles.map(prop("id")).includes(role.id) ? remove(role) : add(role)}
            >
                {role.name}
            </Tag>
        )}
    </Spin>;
