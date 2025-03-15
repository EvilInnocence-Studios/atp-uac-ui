import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "@uac/lib/login/services";
import { Menu } from "antd";
import { AccountMenuProps } from "./AccountMenu.d";
import styles from './AccountMenu.module.scss';

export const AccountMenuComponent = ({user, modal, menu, onMenuClick}:AccountMenuProps) => <>
    {!isLoggedIn(user) && <span onClick={modal.open}><FontAwesomeIcon icon={faSignIn}/> Login</span>}
    {isLoggedIn(user) && <Menu className={styles.accountMenu} items={menu} onClick={onMenuClick}/>}
</>;
