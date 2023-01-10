import { clearDoktor } from "../actions/doktor";
import { clearPacijent } from "../actions/pacijent";
import { logOut } from "../actions/user";

export const logoutThunk = () => {
    return (dispatch) => {
        localStorage.removeItem("userToken");
        const isPacijent = localStorage.getItem("isPacijent");
        dispatch(logOut());
        if (Boolean(isPacijent)) {
            dispatch(clearPacijent());
        } else {
            dispatch(clearDoktor());
        }
        localStorage.removeItem("isPacijent");
        window.dispatchEvent(new Event('storage'))

    }
}