import { getRequest } from "../../requests"
import { setChat, setPeople } from "../actions/chat"
import { addLoader, removeLoader } from "../actions/loader"
import { addError } from "../actions/user"

export const getChatThunk = (userId, recieverUserId) => {
    return (dispatch) => {
        // backend poziv
        const lastMessages = [
            {
                user: {
                    ime: "Djordje"
                },
                lastMessage: "Brate jel znas sta mi se desilo juce?",
                date: Date().toString(),
                seen: true,
                recieverUserId: "123"
            }
        ]
        dispatch(setChat(lastMessages))
    }

}
export const getMessages = (userId, isPacijent) => {
    return async (dispatch) => {
        dispatch(addLoader());
        getRequest(`VratiSvePorukeOsobe?idOsobe=${userId}&jePacijent=${isPacijent ? `true` : `false`}`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
                return;
            }
            var result = res.data;
            var osobe = [];
            result.forEach(item => {
                osobe.push(item.osoba);
            })
            dispatch(setPeople(osobe));
            dispatch(setChat(result));
            dispatch(removeLoader());
        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}
export const getPossiblePersonsToChatWith = (userId, isPacijent) => {
    return async (dispatch) => {
        dispatch(addLoader());
        getRequest(`VratiSvePorukeOsobe?idOsobe=${userId}&jePacijent=${isPacijent ? `true` : `false`}`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
                return;
            }
            var result = res.data;
            var osobe = [];
            result.forEach(item => {
                osobe.push(item.osoba);
            })
            dispatch(setPeople(osobe));
            dispatch(removeLoader());
        }).catch(err => {
            // // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}