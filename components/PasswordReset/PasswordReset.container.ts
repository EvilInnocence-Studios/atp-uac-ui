import { createInjector, inject, mergeProps } from "unstateless";
import {PasswordResetComponent} from "./PasswordReset.component";
import {IPasswordResetInputProps, PasswordResetProps, IPasswordResetProps} from "./PasswordReset.d";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectPasswordResetProps = createInjector(({userId, onUpdate = () => {}, successMsg, failMsg}:IPasswordResetInputProps):IPasswordResetProps => {
    const [search] = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const navigate = useNavigate();

    const query = Object.fromEntries(search.entries()) as unknown as {token?: string};
    const token = query.token || undefined;

    const cmd =
        token  ? () => services().user.resetPassword(token, newPassword) :
        userId ? () => services().user.resetPasswordByUser(userId, oldPassword, newPassword) :
                 () => Promise.reject("No userId or password reset token provided");

    const update = () => {
        cmd()
            .then(flash.success(successMsg || "Password updated.  Please login with your new password."))
            .then(onUpdate)
            .then(() => {
                setNewPassword("");
                setOldPassword("");
                if(token) {
                    navigate("/");
                }
            })
            .catch(flash.error(failMsg || "Password update failed.  Please try again."));
    }

    return {newPassword, setNewPassword, oldPassword, setOldPassword, update, requireOldPassword: !token};
});

const connect = inject<IPasswordResetInputProps, PasswordResetProps>(mergeProps(
    injectPasswordResetProps,
));

export const PasswordReset = connect(PasswordResetComponent);
