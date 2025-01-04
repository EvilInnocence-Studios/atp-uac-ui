import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "@uac/lib/login/services";
import { Menu } from "antd";
import { LoginForm } from "../LoginForm";
import { AccountMenuProps } from "./AccountMenu.d";
import styles from './AccountMenu.module.scss';

export const AccountMenuComponent = ({user, modal, menu, onMenuClick}:AccountMenuProps) => <>
    <div className={styles.loginFormContainer} style={{display: modal.visible && !isLoggedIn(user) ? "block" : "none"}}>
        <LoginForm />
    </div>
    {!isLoggedIn(user) && <FontAwesomeIcon icon={faSignIn} onClick={modal.open}/>}
    {isLoggedIn(user) && <Menu className={styles.accountMenu} items={menu} onClick={onMenuClick}/>}
</>;
