import { IModule } from "@core/lib/module";
import { uacMenus } from "./lib/menus";
import { uacRoutes } from "./lib/routes";
import { IMyAccountTabProps, uacPlugins } from "./lib/plugin/slots";
import { ProfileEditor } from "./components/ProfileEditor";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { uacSettings } from "./lib/settings";

export const module:IModule = {
    name: "uac",
    menus: uacMenus,
    routes: uacRoutes,
    settings: uacSettings,
}

uacPlugins.myAccount.tabs.register({
    key: "profile",
    title: "My Profile",
    icon: faUser,
    priority: 1000,
    component: (props:IMyAccountTabProps) => <ProfileEditor {...props} title="My Profile" />,
});
