import { useLoggedInUser } from "../login/services";

export const usePermissions = () => {
    const [loggedInUser] = useLoggedInUser();
    const permissions = loggedInUser?.permissions.map(p => p.name) || [];

    const hasPermission     = (permission: string)        => permissions.includes(permission);    
    const hasAnyPermission  = (permissionsList: string[]) => permissionsList.some(hasPermission);
    const hasAllPermissions = (permissionsList: string[]) => permissionsList.every(hasPermission);

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        permissions,
    };
}