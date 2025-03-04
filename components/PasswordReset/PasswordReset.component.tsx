import { Button, Input } from "antd";
import {PasswordResetProps} from "./PasswordReset.d";
import styles from './PasswordReset.module.scss';
import { onInputChange } from "@core/lib/onInputChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export const PasswordResetComponent = ({newPassword, setNewPassword, update}:PasswordResetProps) =>
    <div className={styles.passwordReset}>
        <h1>Reset Password</h1>
        
        <Input.Password addonBefore = "New Password" value={newPassword} onChange={onInputChange(setNewPassword)} />
        <Button onClick={update} type="primary" size="large">
            <FontAwesomeIcon icon={faRefresh} /> Update Password
        </Button>
    </div>;
