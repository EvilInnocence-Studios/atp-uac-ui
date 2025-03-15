import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row, Spin } from "antd";
import { PasswordReset } from "../PasswordReset";
import { ProfileEditorProps } from "./ProfileEditor.d";
import styles from './ProfileEditor.module.scss';

export const ProfileEditorComponent = ({user, isLoading, update, title, passwordReset, openModal, refresh}:ProfileEditorProps) =>
    <Spin spinning={isLoading}>
        <Modal
            open={passwordReset.isset}
            onCancel={passwordReset.off}
            footer={null}
        >
            <PasswordReset
                userId={user?.id}
                onUpdate={passwordReset.off}
                successMsg="Password updated."
            />
        </Modal>
        <div className={styles.profileEditor}>
            <h1>
                {title || "Profile Editor"}
                <Button
                    type="link"
                    style={{display: "inline-block", width: "32px"}}
                    onClick={refresh}
                >
                    <FontAwesomeIcon icon={faRefresh} />
                </Button>
            </h1>
            {user && <Row gutter={16}>
                <Col xs={24} md={8}><Label label="Username"><Editable value={user.userName} onChange={update('userName')} /></Label></Col>
                <Col xs={24} md={8}><Label label="Email"><Editable value={user.email} onChange={update('email')} /></Label></Col>
                <Col xs={24} md={8}><Button onClick={openModal}><FontAwesomeIcon icon={faRefresh} /> Update Password</Button></Col>
                <Col xs={24} className={styles.nameEdit}>
                    <Label label="Name">
                        <Editable placeholder="Prefix" value={user.prefix} onChange={update("prefix")} />
                        <Editable placeholder="First Name" value={user.firstName} onChange={update('firstName')} />
                        <Editable placeholder="Last Name" value={user.lastName} onChange={update('lastName')} />
                        <Editable placeholder="Suffix" value={user.suffix} onChange={update('suffix')} />
                    </Label>
                </Col>
            </Row>}
        </div>
    </Spin>;
