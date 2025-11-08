import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "@uac/lib/login/services";
import { Menu } from "antd";
import { AccountMenuProps } from "./AccountMenu.d";
import styles from './AccountMenu.module.scss';
import clsx from "clsx";

export const AccountMenuComponent = ({user, modal, menu, onMenuClick}:AccountMenuProps) => <>
    {isLoggedIn(user) && <Menu className={styles.accountMenuButton} items={menu} onClick={onMenuClick}/>}
    {!isLoggedIn(user) && <span className={clsx([styles.loginBtn, "loginBtn"])} onClick={modal.open}><FontAwesomeIcon icon={faSignIn}/> Login</span>}
</>;
