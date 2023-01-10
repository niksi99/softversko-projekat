import { postRequest } from "../../requests";
import { addLoader, removeLoader } from "../actions/loader";
import { setPacijent } from "../actions/pacijent";
import { addError, logIn } from "../actions/user";

export const loginPacijentThunk = (user, password) => {
    return async (dispatch) => {
        dispatch(addLoader());
        postRequest("PacLogIn", { userName: user, password })
            .then(res => {
                if (res.isError) {
                    console.log("err: ", res.errorMsg);
                    // dispatch(addError());
                    dispatch(removeLoader());
                    return;
                }
                var result = res.data;
                if (result.accessToken) {
                    const token = result.accessToken;
                    const pacijent = {
                        userId: result.p.id,
                        username: user,
                        ime: result.p.ime,
                        prezime: result.p.prezime,
                        jmbg: result.p.jmbg,
                        lbo: result.p.lbo,
                        email: result.p.email,
                        bzk: result.p.brojZdravstveneKnjizice,
                        datumRodjenja: Date().toString()
                    }
                    localStorage.setItem("userToken", token);
                    localStorage.setItem("isPacijent", true);
                    localStorage.setItem("podaci", JSON.stringify(pacijent));
                    window.dispatchEvent(new Event('storage'))
                    dispatch(setPacijent(pacijent));
                    dispatch(logIn({ token: token, isPacijent: true, userId: result.p.id }));
                    dispatch(removeLoader());
                } else {
                    // dispatch(addError());
                    dispatch(removeLoader());
                }
            })

    }
}
export const registerPacijentThunk = (username, ime, prezime, email, password, confirmPassword, bzk, lbo, jmbg) => {
    return async (dispatch) => {
        var body = {
            ime,
            prezime,
            jmbg,
            userName: username,
            password,
            comfirmPassword: confirmPassword,
            email,
            brojZdravstveneKnjizice: bzk,
            lbo
        }
        const response = await postRequest("Register-Pacijent", body);
        if (response.isError) {
            console.log(response.errorMsg)
            dispatch(addError(response.errorMsg))
            return;
        } else {
            dispatch(loginPacijentThunk(username, password));

        }
    }
}