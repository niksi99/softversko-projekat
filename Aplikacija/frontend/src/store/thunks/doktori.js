import { getRequest } from "../../requests"
import { setDoktori } from "../actions/doktori";
import { addLoader, removeLoader } from "../actions/loader";
import { addError } from "../actions/user";

export const getDoktoriThunk = () => {
    return async (dispatch) => {
        dispatch(addLoader());
        getRequest(`DoktoriPoSpecijalizaciji`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
                return;
            }
            var result = res.data;
            let doktori = [];
            result.forEach(item => {
                if (item.ocene.length === 0) {
                    doktori.push({
                        ...item,
                        prosecnaOcena: '--'
                    })
                } else {
                    let sum = 0;
                    item.ocene.forEach(ocena => sum += ocena)
                    doktori.push({
                        ...item,
                        prosecnaOcena: (sum/(item.ocene.length)).toString()
                    })
                }
            })
            dispatch(setDoktori(doktori));
            dispatch(removeLoader());
        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}