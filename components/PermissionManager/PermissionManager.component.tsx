import { onInputChange } from "@core/lib/onInputChange";
import { faAdd, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Input, Row, Spin, Table } from "antd";
import { PermissionManagerProps } from "./PermissionManager.d";
import styles from './PermissionManager.module.scss';
import { prop, sort } from "ts-functional";
import { IPermission } from "@uac-shared/permissions/types";

export const PermissionManagerComponent = ({permissions, isLoading, name, description, setName, setDescription, create, update}:PermissionManagerProps) =>
    <div className={styles.permissionManager}>
        <h1><FontAwesomeIcon icon={faKey} /> Permissions</h1>

        <Row gutter={8}>
            <Col xs={6}>
                <Card
                    className={styles.newPermissionForm}
                    title={<>New Permission</>}
                    extra={<Button onClick={create} type="primary"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                >
                    <Input value={name} onChange={onInputChange(setName)} placeholder="Name" />
                    <Input value={description} onChange={onInputChange(setDescription)} placeholder="Description" />
                </Card>
            </Col>
            <Col xs={12}>
                <Spin spinning={isLoading}>
                    <Table dataSource={permissions.sort(sort.by(prop<IPermission, "name">("name")).asc)} rowKey="id">
                        <Table.Column title="Name" dataIndex="name" key="name" />
                        <Table.Column title="Description" dataIndex="description" key="description" />
                        <Table.Column title="Actions" dataIndex="actions" key="actions" />
                    </Table>
                </Spin>
            </Col>
        </Row>
    </div>;
