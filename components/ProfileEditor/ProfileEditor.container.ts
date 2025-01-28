import { createInjector, inject, mergeProps } from "unstateless";
import {ProfileEditorComponent} from "./ProfileEditor.component";
import {IProfileEditorInputProps, ProfileEditorProps, IProfileEditorProps} from "./ProfileEditor.d";
import { useEffect, useState } from "react";
import { SafeUser } from "@uac-shared/user/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useToggle } from "@core/lib/useToggle";

const injectProfileEditorProps = createInjector(({userId}:IProfileEditorInputProps):IProfileEditorProps => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loggedInUser, setLoggedInUser] = useLoggedInUser();
    const loader = useLoaderAsync();
    const passwordReset = useToggle();
    const [resetToken, setResetToken] = useState("");

    useEffect(() => {
        if (userId) {
            loader(async () => {
                services().user.get(userId).then(setUser);
            });
        } else {
            setUser(loggedInUser.user);
        }

    }, [userId]);

    const update = (field:keyof SafeUser) => (value:string) => {
        if (user) {
            loader(async () => {
                services().user.update(user.id, {[field]: value}).then(() => {
                    setUser({...user, [field]: value});
                    if(!userId) {
                        setLoggedInUser({...loggedInUser, user: {...loggedInUser.user, [field]: value}});
                    }
                });
            });

        }
    }

    const openModal = () => {
        if(user) {
            loader(async () => {
                services().user.getPasswordResetToken(user.userName)
                .then(setResetToken)
                .then(passwordReset.on);
            });
        }
    }
    
    return {user, isLoading: loader.isLoading, update, passwordReset, resetToken, openModal};
});

const connect = inject<IProfileEditorInputProps, ProfileEditorProps>(mergeProps(
    injectProfileEditorProps,
));

export const ProfileEditor = connect(ProfileEditorComponent);
