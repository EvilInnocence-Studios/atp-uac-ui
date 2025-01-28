import { createInjector, inject, mergeProps } from "unstateless";
import {PasswordResetComponent} from "./PasswordReset.component";
import {IPasswordResetInputProps, PasswordResetProps, IPasswordResetProps} from "./PasswordReset.d";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectPasswordResetProps = createInjector(({resetToken, onUpdate = () => {}}:IPasswordResetInputProps):IPasswordResetProps => {
    const [search] = useSearchParams();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const {token} = resetToken
        ? {token: resetToken}
        : Object.fromEntries(search.entries()) as unknown as {token: string};

    const update = () => {
        services().user.resetPassword(token, oldPassword, newPassword)
            .then(flash.success("Password updated.  Please login with your new password."))
            .then(onUpdate)
            .catch(flash.error("Password update failed.  Please try again."));
    }

    return {oldPassword, newPassword, setOldPassword, setNewPassword, update};
});

const connect = inject<IPasswordResetInputProps, PasswordResetProps>(mergeProps(
    injectPasswordResetProps,
));

export const PasswordReset = connect(PasswordResetComponent);
