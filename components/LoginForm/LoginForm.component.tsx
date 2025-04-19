import { config } from "@config";
import { onInputChange } from "@core/lib/onInputChange";
import { faClose, faEnvelope, faLock, faSignIn, faUser, faUserPlus, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Col, Input, Row } from "antd";
import { LoginFormProps } from "./LoginForm.d";
import styles from './LoginForm.module.scss';
import clsx from "clsx";

export const LoginFormComponent = ({
    userName, setUserName,
    password, setPassword,
    email, setEmail,
    login, forgotLogin, forgotLoginForm, createAccountForm,
    modal, createAccount,
    inline,
}:LoginFormProps) =>
    <div className={clsx([styles.loginForm, inline && styles.inline])}>
        {!inline && <div className={styles.header}>
            <img src="/logo.png" alt="EvilInnocence"/>
            {config().appName} Login
            <FontAwesomeIcon icon={faClose} onClick={modal.close} />
        </div>}
        <div className={styles.form}>
            {(forgotLoginForm.visible || createAccountForm.visible) &&
                <Input
                    addonBefore={<FontAwesomeIcon icon={faEnvelope} />}
                    value={email}
                    placeholder="Email"
                    onChange={onInputChange(setEmail)}
                />
            }
            {!forgotLoginForm.visible && <>
                <Input
                    addonBefore={<FontAwesomeIcon icon={faUser} />}
                    value={userName}
                    placeholder="Username"
                    onChange={onInputChange(setUserName)}
                />  
                <Input.Password
                    addonBefore={<FontAwesomeIcon icon={faLock} />}
                    value={password}
                    placeholder="Password"
                    onChange={onInputChange(setPassword)}
                    onPressEnter={!!userName && !!password ? login : undefined}
                />
            </>}
            <Alert message={<>
                <FontAwesomeIcon icon={faWarning} /> If this is your first time logging into the new site, you will need to reset your password.  Your username will be your email address.
            </>} type="warning" style={{textAlign: "left"}} />
            {!createAccountForm.visible && !forgotLoginForm.visible && <>
                <Row className={styles.links}>
                    <Col xs={24}>
                        <Button type="link" className={styles.forgotUsername} size="small" onClick={forgotLoginForm.open}>
                            Forgot Username / password?
                        </Button>
                    </Col>
                </Row>
            </>}
            <Row className={styles.links}>
                {forgotLoginForm.visible && <>
                    <Col xs={12}>
                        <Button type="link" disabled={email === ""} onClick={forgotLogin} className={styles.forgotUsername}>
                            Send Reminder / reset link
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <Button type="link" onClick={forgotLoginForm.close} className={styles.forgotPassword}>
                            Cancel
                        </Button>
                    </Col>
                </>}
                
                {createAccountForm.visible && <Col xs={24}>
                    <Button type="link" onClick={createAccountForm.close}>
                        Cancel
                    </Button>
                </Col>}
            </Row>
        </div>
        <div className={styles.footer}>
            <Row>
                {!forgotLoginForm.visible && <Col xs={createAccountForm.visible ? 24 : 12}>
                    <Button
                        type={createAccountForm.visible ? "primary" : "default"}
                        className={styles.register}
                        onClick={createAccountForm.visible ? createAccount : createAccountForm.open}
                    >
                        <FontAwesomeIcon icon={faUserPlus} /> Create Account
                    </Button>
                </Col>}
                {!forgotLoginForm.visible && !createAccountForm.visible && <Col xs={12}>
                    <Button type="primary" onClick={login} disabled={userName === "" || password === ""}>
                        <FontAwesomeIcon icon={faSignIn} /> Login
                    </Button>
                </Col>}
            </Row>
        </div>
    </div>;
