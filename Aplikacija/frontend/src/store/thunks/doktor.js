import { doktorOpstePrakse } from "../../components/enums/doktor/specijalizacija";
import { getRequest, postRequest } from "../../requests";
import { setDoktor, setKolege } from "../actions/doktor";
import { addLoader, removeLoader } from "../actions/loader";
import { addError, logIn } from "../actions/user";

export const loginDoktorThunk = (user, password) => {
    return (dispatch) => {
        var body = {userName: user, password};
        dispatch(addLoader());
        postRequest("DrLogIn", body).then(response => {
            if (response.isError) {
                console.log("err: ", response.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
                return;
            }
            var result = response.data;
            const token = result.accessToken;
            const doktor = {
                userId: result.d.id,
                username: user,
                ime: result.d.ime,
                prezime: result.d.prezime,
                jmbg: result.d.jmbg,
                specijalizacija: result.d.specijalizacija,
                biografija: result.d.biografija,
                datumRodjenja: Date().toString(),
                email: result.d.email,
                brojLicneKarte: result.d.brojLicneKarte
            }
            localStorage.setItem("userToken", token);
            localStorage.setItem("isPacijent", false);
            localStorage.setItem("isSpecijalizant", result.d.specijalizacija?.toString() !== "OpstaPraksa")
            localStorage.setItem("podaci", JSON.stringify(doktor));
            
            dispatch(setDoktor(doktor));
            dispatch(logIn({token: token, isPacijent: false, userId: result.d.id}));
            dispatch(removeLoader());
            window.dispatchEvent(new Event("storage"))
        }).catch(err => {
            console.log(err);
            // dispatch(addError())
            dispatch(removeLoader());
        })
        
    }
}
export const vratiDoktoreSpecijalizante = () => {
    return async (dispatch) => {
        dispatch(addLoader());
        getRequest("DoktoriPoSpecijalizaciji").then(response => {
            if (response.isError) {
                console.log("err: ", response.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
                return;
            }
            let kolege = [];
            var result = response.data;
            result.forEach(item => {
                let kolega = {
                    naziv: `${item.ime} ${item.prezime}`,
                    id: item.id
                }
                kolege.push(kolega);
            })
            dispatch(setKolege(kolege));
            dispatch(removeLoader());

        }).catch(err => {
            console.log(err);
            // dispatch(addError());
            dispatch(removeLoader());
            
        })
    }
}