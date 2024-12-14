import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const uacMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "uac",
        label: "UAC",
        icon: <FontAwesomeIcon icon={faUserAlt} />,
    }],
};