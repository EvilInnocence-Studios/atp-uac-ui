import { IModal } from "@core/lib/useModal";
import { ILoginResponse } from "@uac-shared/login/types";
import { MenuItemType } from "antd/es/menu/interface";

export declare interface IAccountMenuProps {
    user: ILoginResponse;
    modal:IModal;
    menu: MenuItemType[];
    onMenuClick: (args:{key:string}) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IAccountMenuInputProps {

}

export type AccountMenuProps = IAccountMenuInputProps & IAccountMenuProps;