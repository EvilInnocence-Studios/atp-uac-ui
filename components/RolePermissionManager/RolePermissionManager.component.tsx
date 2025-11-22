import { faAdd, faEdit, faEye, faKey, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Spin, Tag } from "antd";
import { switchOn } from "ts-functional";
import { RolePermissionManagerProps } from "./RolePermissionManager.d";
import styles from './RolePermissionManager.module.scss';
import { hasPermission } from "../HasPermission";
import { IPermission } from "@uac-shared/permissions/types";
import { overridable } from "@core/lib/overridable";

const CanEdit = hasPermission("role.update");

// Sort grouped permissions in this order: create, view, update, delete, and then all others
const permissionSort = (a: IPermission, b: IPermission) => {
    const order = ["delete", "update", "view", "create"];
    const aIndex = order.indexOf(a.name.split(".")[1]);
    const bIndex = order.indexOf(b.name.split(".")[1]);
    return bIndex - aIndex;
}

export const RolePermissionManagerComponent = overridable(({ role, permissions, groupedPermissions, add, addAll, remove, removeAll, isLoading, classes = styles }: RolePermissionManagerProps) =>
    <Spin spinning={isLoading}>
        <CanEdit yes>
            <b>Permissions for {role.name}</b>
            <div className={classes.rolePermissionManager}>
                {Object.keys(groupedPermissions).map(group => <div className={classes.buttonGroup}>
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
                    {groupedPermissions[group].sort(permissionSort).map(p => <Tag
                        onClick={permissions.find(pp => pp.id === p.id) ? remove(p) : add(p)}
                        color={permissions.find(pp => pp.id === p.id) ? "green" : "red"}
                    >
                        {switchOn<string | React.ReactElement>(p.name.split(".")[1], {
                            view: () => <FontAwesomeIcon icon={faEye} title="View" />,
                            update: () => <FontAwesomeIcon icon={faEdit} title="Update" />,
                            delete: () => <FontAwesomeIcon icon={faTrashCan} title="Delete" />,
                            create: () => <FontAwesomeIcon icon={faAdd} title="Add" />,

                            default: () => p.name.split(".")[1],
                        })}
                    </Tag>)
                    }
                </div>)}
            </div>
        </CanEdit>
        <CanEdit no>
            <Alert type="warning" message="You do not have permission to view role permissions" />
        </CanEdit>
    </Spin>
);
