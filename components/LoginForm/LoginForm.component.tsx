import { onInputChange } from "@core/lib/onInputChange";
import { faClose, faEnvelope, faLock, faSignIn, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Input, Row } from "antd";
import clsx from "clsx";
import { LoginFormProps } from "./LoginForm.d";
import styles from './LoginForm.module.scss';
import { overridable } from "@core/lib/overridable";

export const LoginFormComponent = overridable(({
    appName, logoUrl,
    userName, setUserName,
    password, setPassword,
    email, setEmail,
    login, forgotLogin, forgotLoginForm, createAccountForm,
    modal, createAccount,
    inline, classes = styles,
}: LoginFormProps) =>
    <div className={clsx([classes.loginForm, inline && classes.inline])}>
        {!inline && <div className={classes.header}>
            <img src={logoUrl} />
            {appName} Login
            <FontAwesomeIcon icon={faClose} onClick={modal.close} />
        </div>}
        <div className={classes.form}>
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
            {!createAccountForm.visible && !forgotLoginForm.visible && <>
                <Row className={classes.links}>
                    <Col xs={24}>
                        <Button type="link" className={classes.forgotUsername} size="small" onClick={forgotLoginForm.open}>
                            Forgot Username / password?
                        </Button>
                    </Col>
                </Row>
            </>}
            <Row className={classes.links}>
                {forgotLoginForm.visible && <>
                    <Col xs={12}>
                        <Button type="link" disabled={email === ""} onClick={forgotLogin} className={classes.forgotUsername}>
                            Send Reminder / reset link
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <Button type="link" onClick={forgotLoginForm.close} className={classes.forgotPassword}>
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
        <div className={classes.footer}>
            <Row>
                {!forgotLoginForm.visible && <Col xs={createAccountForm.visible ? 24 : 12}>
                    <Button
                        type={createAccountForm.visible ? "primary" : "default"}
                        className={classes.register}
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
    </div>
);
