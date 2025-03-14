import { withRoute } from "@core/lib/withRoute";
import { PasswordReset } from "@uac/components/PasswordReset";
import { PermissionManager } from "@uac/components/PermissionManager";
import { RoleManager } from "@uac/components/RoleManager";
import { UserManager } from "@uac/components/UserManager";

export const uacRoutes = {
    admin: [
        {path: "/users", component: UserManager},
        {path: "/roles", component: RoleManager},
        {path: "/permissions", component: PermissionManager},
    ],
    public: [
        {path: "/reset-password", component: withRoute(PasswordReset)},
    ]
}