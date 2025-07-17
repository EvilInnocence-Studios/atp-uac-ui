import { IModule } from "@core/lib/module";
import { uacMenus } from "./lib/menus";
import { uacRoutes } from "./lib/routes";

export const module:IModule = {
    name: "uac",
    menus: uacMenus,
    routes: uacRoutes,
}