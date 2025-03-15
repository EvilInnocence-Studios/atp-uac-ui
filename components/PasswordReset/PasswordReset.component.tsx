import { Button, Input } from "antd";
import {PasswordResetProps} from "./PasswordReset.d";
import styles from './PasswordReset.module.scss';
import { onInputChange } from "@core/lib/onInputChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export const PasswordResetComponent = ({userId, newPassword, setNewPassword, oldPassword, setOldPassword, update, requireOldPassword}:PasswordResetProps) =>
    <div className={styles.passwordReset}>
        <h1>Reset Password ({userId})</h1>
        
        {requireOldPassword && <Input.Password
            addonBefore = "Old Password"
            value={oldPassword}
            onChange={onInputChange(setOldPassword)}
            placeholder="Old Password"
        />}

        <Input.Password
            addonBefore = "New Password"
            value={newPassword}
            onChange={onInputChange(setNewPassword)}
            onPressEnter={update}
            placeholder="New Password"
        />
        <Button onClick={update} type="primary" size="large">
            <FontAwesomeIcon icon={faRefresh} /> Update Password
        </Button>
    </div>;
