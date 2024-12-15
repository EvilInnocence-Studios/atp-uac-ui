import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {PermissionManagerProps} from "./PermissionManager.d";
import styles from './PermissionManager.module.scss';
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Spin, Table } from "antd";

export const PermissionManagerComponent = ({permissions, isLoading}:PermissionManagerProps) =>
    <div className={styles.permissionManager}>
        <h1><FontAwesomeIcon icon={faKey} /> Permissions</h1>

        <Spin spinning={isLoading}>
            <Table dataSource={permissions} rowKey="id">
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column title="Description" dataIndex="description" key="description" />
                <Table.Column title="Actions" dataIndex="actions" key="actions" />
            </Table>
        </Spin>
    </div>;
