import { onInputChange } from "@core/lib/onInputChange";
import { faAdd, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserOrderList } from "@store/components/UserOrderList";
import { SafeUser } from "@uac-shared/user/types";
import { Alert, Button, Card, Col, Input, Row, Spin, Table } from "antd";
import { prop, sort } from "ts-functional";
import { hasPermission } from "../HasPermission";
import { UserRoleManager } from "../UserRoleManager";
import { UserManagerProps } from "./UserManager.d";
import styles from './UserManager.module.scss';

const CanView = hasPermission("user.view");
const CanCreate = hasPermission("user.create");

export const UserManagerComponent = ({users, isLoading, userName, email, password, setUserName, setEmail, setPassword, create, columns}:UserManagerProps) =>
    <div className={styles.permissionManager}>
        <h1><FontAwesomeIcon icon={faUser} /> Users</h1>

        <Row gutter={8}>
            <Col xs={6}>
                <CanCreate yes>
                    <Card size="small"
                        className={styles.newUserForm}
                        title={<>New User</>}
                        extra={<Button onClick={create} size="small" variant="link"><FontAwesomeIcon icon={faAdd} /> Create</Button>}
                    >
                        <Input value={userName} onChange={onInputChange(setUserName)} placeholder="UserName" />
                        <Input value={email} onChange={onInputChange(setEmail)} placeholder="Email" />
                        <Input hidden value={password} onChange={onInputChange(setPassword)} placeholder="Password" />
                    </Card>
                </CanCreate>
            </Col>
            <Col xs={18}>
                <Spin spinning={isLoading}>
                    <CanView yes>
                        <Table
                            dataSource={users.sort(sort.by(prop<SafeUser, "userName">("userName")).asc)}
                            rowKey="id"
                            columns={columns}
                            size="small"
                            expandable={{expandedRowRender: u => <>
                                <UserRoleManager user={u} />
                                <UserOrderList userId={u.id}/>
                            </>}}
                        />
                    </CanView>
                    <CanView no>
                        <Alert type="warning" message="You do not have permission to view users" />
                    </CanView>
                </Spin>
            </Col>
        </Row>
    </div>;

