import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "@uac/lib/login/services";
import { Menu } from "antd";
import { AccountMenuProps } from "./AccountMenu.d";
import styles from './AccountMenu.module.scss';
import clsx from "clsx";
import { overridable } from "@core/lib/overridable";

export const AccountMenuComponent = overridable(({ user, modal, menu, onMenuClick, classes = styles }: AccountMenuProps) => <>
    {isLoggedIn(user) && <Menu className={classes.accountMenuButton} items={menu} onClick={onMenuClick} />}
    {!isLoggedIn(user) && <span className={clsx([classes.loginBtn, "loginBtn"])} onClick={modal.open}><FontAwesomeIcon icon={faSignIn} /> Login</span>}
</>);
