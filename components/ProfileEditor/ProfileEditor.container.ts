import { createInjector, inject, mergeProps } from "unstateless";
import {ProfileEditorComponent} from "./ProfileEditor.component";
import {IProfileEditorInputProps, ProfileEditorProps, IProfileEditorProps} from "./ProfileEditor.d";

const injectProfileEditorProps = createInjector(({}:IProfileEditorInputProps):IProfileEditorProps => {
    return {};
});

const connect = inject<IProfileEditorInputProps, ProfileEditorProps>(mergeProps(
    injectProfileEditorProps,
));

export const ProfileEditor = connect(ProfileEditorComponent);
