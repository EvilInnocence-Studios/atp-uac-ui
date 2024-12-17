import { faAdd, faEdit, faEye, faKey, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin, Tag } from "antd";
import { switchOn } from "ts-functional";
import { RolePermissionManagerProps } from "./RolePermissionManager.d";
import styles from './RolePermissionManager.module.scss';

export const RolePermissionManagerComponent = ({role, permissions, groupedPermissions, add, addAll, remove, removeAll, isLoading}:RolePermissionManagerProps) =>
    <Spin spinning={isLoading}>
        <b>Permissions for {role.name}</b>
        <div className={styles.rolePermissionManager}>
            {Object.keys(groupedPermissions).map(group => <div className={styles.buttonGroup}>
                <Tag
                    onClick={
                        groupedPermissions[group].every(p => permissions.find(pp => pp.id === p.id))
                            ? removeAll(groupedPermissions[group])
                            : addAll(groupedPermissions[group])
                    }
                    color={
                        groupedPermissions[group].every(p => permissions.find(pp => pp.id === p.id)) ? "green" :
                        groupedPermissions[group].some(p => permissions.find(pp => pp.id === p.id)) ? "orange" :
                        "red"
                    }
                >
                    <FontAwesomeIcon icon={faKey} /> {group}
                </Tag>
                {groupedPermissions[group].map(p => <Tag
                    onClick={permissions.find(pp => pp.id === p.id) ? remove(p) : add(p)}
                    color={permissions.find(pp => pp.id === p.id) ? "green" : "red"}
                >
                    {switchOn<string | React.ReactElement>(p.name.split(".")[1], {
                        view:   () => <FontAwesomeIcon icon={faEye} title="View" />,
                        update: () => <FontAwesomeIcon icon={faEdit} title="Update" />,
                        delete: () => <FontAwesomeIcon icon={faTrashCan} title="Delete" />,
                        create: () => <FontAwesomeIcon icon={faAdd} title="Add" />,

                        default: () => p.name.split(".")[1],
                    })}
                </Tag>)
                }
            </div>)}
        </div>
    </Spin>;
