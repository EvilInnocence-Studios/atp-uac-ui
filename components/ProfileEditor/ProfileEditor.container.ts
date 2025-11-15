import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useToggle } from "@core/lib/useToggle";
import { SafeUser } from "@uac-shared/user/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProfileEditorComponent } from "./ProfileEditor.component";
import { IProfileEditorInputProps, IProfileEditorProps, ProfileEditorProps } from "./ProfileEditor.d";

const injectProfileEditorProps = createInjector(({userId}:IProfileEditorInputProps):IProfileEditorProps => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loggedInUser, setLoggedInUser, refresh] = useLoggedInUser();
    const loader = useLoaderAsync();
    const passwordReset = useToggle();

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

    return {user, isLoading: loader.isLoading, update, passwordReset, openModal: passwordReset.on, refresh};
});

const connect = inject<IProfileEditorInputProps, ProfileEditorProps>(mergeProps(
    injectProfileEditorProps,
));
export const connectProfileEditor = connect;

export const ProfileEditor = overridable<IProfileEditorInputProps>(connect(ProfileEditorComponent));
