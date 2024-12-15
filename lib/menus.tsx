import { faKey, faLock, faUserAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const uacMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "uac",
        label: "UAC",
        icon: <FontAwesomeIcon icon={faLock} />,
        children: [{
            key: "users",
            label: "Users",
            icon: <FontAwesomeIcon icon={faUserAlt} />,
        },{
            key: "roles",
            label: "Roles",
            icon: <FontAwesomeIcon icon={faUsers} />,
        },{
            key: "permissions",
            label: "Permissions",
            icon: <FontAwesomeIcon icon={faKey} />,
        }]
    }],
};