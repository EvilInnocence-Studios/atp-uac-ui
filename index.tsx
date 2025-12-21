import { ComponentRegistry } from "@theming/lib/layout/componentRegistry";
import { IModule } from "@core/lib/module";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AccountMenu } from "./components/AccountMenu";
import { ProfileEditor } from "./components/ProfileEditor";
import { uacMenus } from "./lib/menus";
import { IMyAccountTabProps, uacPlugins } from "./lib/plugin/slots";
import { uacRoutes } from "./lib/routes";
import { uacSettings } from "./lib/settings";

export const module: IModule = {
    name: "uac",
    menus: uacMenus,
    routes: uacRoutes,
    settings: uacSettings,
}

ComponentRegistry.register("AccountMenu", AccountMenu, { category: "Layouts", displayName: "Account Menu" });

uacPlugins.myAccount.tabs.register({
    key: "profile",
    title: "My Profile",
    icon: faUser,
    priority: 1000,
    component: (props: IMyAccountTabProps) => <ProfileEditor {...props} title="My Profile" />,
});
