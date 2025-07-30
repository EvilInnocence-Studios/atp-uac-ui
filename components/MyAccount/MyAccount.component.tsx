import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoggedIn } from "@uac/components/LoggedIn";
import { uacPlugins } from "@uac/lib/plugin/slots";
import { MyAccountProps } from "./MyAccount.d";
import styles from './MyAccount.module.scss';

export const MyAccountComponent = ({tab, userId, changeTab, id}:MyAccountProps) => <>
    <LoggedIn yes>
        <div className={styles.myAccount}>
            <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>

            {uacPlugins.myAccount.tabs.render({
                defaultActiveKey: tab,
                onChange: changeTab,
                userId, id,
            })}
        </div>
    </LoggedIn>
    <LoggedIn no >
        <div className={styles.myAccount}>
            <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>
            <p>Please log in to view your account details.</p>
        </div>
    </LoggedIn>
</>;
