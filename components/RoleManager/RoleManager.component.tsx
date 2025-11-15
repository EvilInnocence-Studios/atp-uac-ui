import { onInputChange } from "@core/lib/onInputChange";
import { faAdd, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRole } from "@uac-shared/role/types";
import { Alert, Button, Card, Col, Input, Row, Spin, Table } from "antd";
import { prop, sort } from "ts-functional";
import { hasPermission } from "../HasPermission";
import { RoleManagerProps } from "./RoleManager.d";
import styles from './RoleManager.module.scss';
import { RolePermissionManager } from "../RolePermissionManager";
import { overridable } from "@core/lib/overridable";

const CanView = hasPermission("role.view");
const CanCreate = hasPermission("role.create");

export const RoleManagerComponent = overridable(({roles, isLoading, name, description, setName, setDescription, create, columns}:RoleManagerProps) =>
    <div className={styles.permissionManager}>
        <h1><FontAwesomeIcon icon={faUsers} /> Roles</h1>

        <Row gutter={8}>
            <Col xs={6}>
                <CanCreate yes>
                    <Card size="small"
                        className={styles.newRoleForm}
                        title={<>New Permission</>}
                        extra={<Button onClick={create} size="small" variant="link"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                    >
                        <Input value={name} onChange={onInputChange(setName)} placeholder="Name" />
                        <Input value={description} onChange={onInputChange(setDescription)} placeholder="Description" />
                    </Card>
                </CanCreate>
            </Col>
            <Col xs={12}>
                <Spin spinning={isLoading}>
                    <CanView yes>
                        <Table
                            dataSource={roles.sort(sort.by(prop<IRole, "name">("name")).asc)}
                            rowKey="id"
                            columns={columns}
                            size="small"
                            expandable={{expandedRowRender: r => <RolePermissionManager role={r} />}}
                        />
                    </CanView>
                    <CanView no>
                        <Alert type="warning" message="You do not have permission to view roles" />
                    </CanView>
                </Spin>
            </Col>
        </Row>
    </div>
);
