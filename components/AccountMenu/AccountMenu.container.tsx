import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useLoginForm } from "@uac/lib/useLoginForm";
import { useNavigate } from 'react-router';
import { createInjector, inject, mergeProps } from "unstateless";
import { AccountMenuComponent } from "./AccountMenu.component";
import { AccountMenuProps, IAccountMenuInputProps, IAccountMenuProps } from "./AccountMenu.d";
import styles from "./AccountMenu.module.scss";

const injectAccountMenuProps = createInjector(({}:IAccountMenuInputProps):IAccountMenuProps => {
    const [user] = useLoggedInUser();
    const modal = useLoginForm();
    const navigate = useNavigate();
    
    const menu = [{
        label: <span className={styles.userName}>{user.user.userName}</span>,
        key: "account",
        icon: <FontAwesomeIcon icon={faUser} />,
        popupClassName: styles.accountMenu,
        children: [{
            label: "My Account",
            key: "my-account",
            icon: <FontAwesomeIcon icon={faUser} />,
        }, {
            label: "Logout",
            key: "logout",
            icon: <FontAwesomeIcon icon={faSignOut}/>,            
        }],
    }];

    const onMenuClick = ({key}:{key:string}) => {
        if(key === "my-account") {
            navigate('/my-account/profile');
        }
        if(key === "logout" && !!user.loginToken) {
            services().logout();
            modal.close();
            navigate("/");
        }
    }

    return {user, modal, menu, onMenuClick};
});

const connect = inject<IAccountMenuInputProps, AccountMenuProps>(mergeProps(
    injectAccountMenuProps,
));
export const connectAccountMenu = connect;

export const AccountMenu = overridable<IAccountMenuInputProps>(connect(AccountMenuComponent));
