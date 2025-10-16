import { tabPlugins } from "@core/lib/plugins/tabs";

export declare interface IMyAccountTabProps {
    title?: string;
    userId?: string;
    id?: string;
}

export declare interface IUserManagerTabProps {
    userId?: string;
}

export const uacPlugins = {
    myAccount: {
        tabs: tabPlugins<IMyAccountTabProps>(),
    },
    userManager: {
        tabs: tabPlugins<IUserManagerTabProps>("top"),
    }
}