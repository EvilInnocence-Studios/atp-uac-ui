import { services } from "@core/lib/api";
import { useModal } from "@core/lib/useModal";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useNavigate } from 'react-router';
import { createInjector, inject, mergeProps } from "unstateless";
import { AccountMenuComponent } from "./AccountMenu.component";
import { AccountMenuProps, IAccountMenuInputProps, IAccountMenuProps } from "./AccountMenu.d";

const injectAccountMenuProps = createInjector(({}:IAccountMenuInputProps):IAccountMenuProps => {
    const [user] = useLoggedInUser();
    const modal = useModal();
    const navigate = useNavigate();
    
    const menu = [{
        label: user.user.userName,
        key: "account",
        icon: <FontAwesomeIcon icon={faUser} />,
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
            navigate('/my-account');
        }
        if(key === "logout" && !!user.loginToken) {
            services().logout();
            modal.close();
        }
    }

    return {user, modal, menu, onMenuClick};
});

const connect = inject<IAccountMenuInputProps, AccountMenuProps>(mergeProps(
    injectAccountMenuProps,
));

export const AccountMenu = connect(AccountMenuComponent);
