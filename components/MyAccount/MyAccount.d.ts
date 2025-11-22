export declare interface IMyAccountProps {
    changeTab: (tab: string) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IMyAccountInputProps {
    tab: string;
    userId?: string;
    id?: string;
    classes?: any;
}

export type MyAccountProps = IMyAccountInputProps & IMyAccountProps;