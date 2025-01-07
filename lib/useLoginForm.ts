import { IModal } from "@core/lib/useModal";
import { useSharedState } from "unstateless";

export const useLoginForm = ():IModal => {
    const [visible, setVisible] = useSharedState("loginformModal", false)();
    const open = () => setVisible(true);
    const close = () => setVisible(false);
    return {visible, open, close};
}