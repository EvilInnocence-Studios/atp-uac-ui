export declare interface IHasPermissionProps {
    show: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IHasPermissionInputPropsBase {
    children: React.ReactNode;
    permissions: string[];
}

export declare type IHasPermissionInputProps = 
      (IHasPermissionInputPropsBase & { yes: boolean; no?: never }) 
    | (IHasPermissionInputPropsBase & { no: boolean; yes?: never });

export type HasPermissionProps = IHasPermissionInputProps & IHasPermissionProps;