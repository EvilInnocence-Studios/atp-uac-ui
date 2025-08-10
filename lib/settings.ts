import { ISettingContainer } from "@common/lib/setting/types";
import { services } from "@core/lib/api";
import { map } from "ts-functional";

export const uacSettings:ISettingContainer = {
    UAC: {
        Roles: {
            defaultUserRole: {
                displayName: "Default User Role",
                type: "select",
                defaultValue: "user",
                description: "The default role assigned to anonymous users.",
                options: () => services().role.search({}).then(map(role => ({ value: role.id, label: role.name }))),
            }
        }
    },
    Email: {
        "Forgot Login": {
            forgotLoginSubject: {
                displayName: "Forgot Login Subject",
                type: "string",
                defaultValue: "Forgot Login Information",
                description: "The subject line for the forgot login email.",
            }
        },
        "Role Change": {
            roleChangeSubject: {
                displayName: "Role Change Subject",
                type: "string",
                defaultValue: "Role Change Notification",
                description: "The subject line for the role change email.",
            }
        }, "New Account" : {
            newAccountSubject: {
                displayName: "New Account Subject",
                type: "string",
                defaultValue: "New Account Created",
                description: "The subject line for the new account email.",
            }
        }
    }
}
