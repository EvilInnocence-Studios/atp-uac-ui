import { Alert, Spin, Tag } from "antd";
import { PermissionRoleManagerProps } from "./PermissionRoleManager.d";
import styles from './PermissionRoleManager.module.scss';
import { prop } from "ts-functional";
import { hasPermission } from "../HasPermission";

const CanUpdate = hasPermission("permission.update");
const CanView = hasPermission("role.view");

export const PermissionRoleManagerComponent = ({permission, roles, allRoles, add, remove, isLoading}:PermissionRoleManagerProps) =>
    <Spin spinning={isLoading}>
        <CanView yes>
            <b>Roles for {permission.name}</b><br/>
            {allRoles.map(role => <>
                <CanUpdate yes>
                    <Tag
                        key={role.id}
                        className={styles.tag}
                        color={roles.map(prop("id")).includes(role.id) ? "green" : "red"}
                        onClick={roles.map(prop("id")).includes(role.id) ? remove(role) : add(role)}
                    >
                        {role.name}
                    </Tag>
                </CanUpdate>
                <CanUpdate no>
                    <Tag
                        key={role.id}
                        className={styles.tag}
                        color={roles.map(prop("id")).includes(role.id) ? "green" : "red"}
                    >
                        {role.name}
                    </Tag>
                </CanUpdate>
            </>)}
        </CanView>
        <CanView no>
            <Alert type="warning" message="You do not have permission to view roles" />
        </CanView>            
    </Spin>;
