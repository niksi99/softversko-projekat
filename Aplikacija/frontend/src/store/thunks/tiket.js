import { getRequest, patchRequest, postRequest, putRequest } from "../../requests";
import { convertDateToString } from "../../utils/dateHelper";
import { addPeople, setPeople } from "../actions/chat";
import { addLoader, removeLoader } from "../actions/loader";
import { addTiket, addTiketi, addTiketRated, removeTiket, setTiketi } from "../actions/tiketi";
import { addError, removeError } from "../actions/user";

export const addTiketThunk = (naslov, opis, userId) => {
    return async (dispatch) => {
        dispatch(addLoader());
        postRequest(`DodajNovuObjavu?noviNaslov=${naslov}&noviSadrzajObjave=${opis}&pacID=${userId}`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
            }
            var result = res.data;
            const tiket = {
                id: result.id,
                naslov: result.naslov,
                opis: result.sadrzajObjave,
                datumObjave: result.datumObjave,
                datumOdgovoraLekara: result.datumOdgovoraLekara,
                odgovorLekara: "",
                isAnswered: false,
                idPacijent: userId,
            }
            dispatch(removeError());
            dispatch(addTiket(tiket));
            dispatch(removeLoader());

        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}
export const getTiketiPacijentThunk = (userId) => {
    return async (dispatch) => {
        dispatch(addLoader());
        getRequest(`GetObjaveByPacID?pacID=${userId}`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
            }
            var result = res.data;
            let tiketi = [];
            let personsPossibleToChat = [];
            if (Array.isArray(result)) {
                result.forEach(item => {
                    const tiket = {
                        id: item.mojaObjava.id,
                        naslov: item.mojaObjava.naslov,
                        opis: item.mojaObjava.sadrzajObjave,
                        datumObjave: convertDateToString(new Date(item.mojaObjava.datumObjave)),
                        datumOdgovoraLekara: convertDateToString(new Date(item.mojaObjava.datumOdgovoraLekara)),
                        odgovorLekara: item.mojaObjava.odgovorLekara,
                        isAnswered: item.mojaObjava.odgovorLekara?.toString().length > 0,
                        idDoktor: item.mojaObjava.idDoktora,
                        doktorIme: `${item.mojLekar.ime} ${item.mojLekar.prezime}`,
                        ocena: item.mojaObjava.oceniDoktora,
                        doktorPublicId: item.mojLekar.publicId
                    }
                    tiketi.push(tiket);
                    personsPossibleToChat.push({
                        publicId: item.mojLekar.publicId,
                        id: item.mojaObjava.idDoktora,
                        ime: `${item.mojLekar.ime} ${item.mojLekar.prezime}`,
                    });
                })
            } else {
                result.forEach(result => {
                    const tiket = {
                        id: result.mojaObjava.id,
                        naslov: result.mojaObjava.naslov,
                        opis: result.mojaObjava.sadrzajObjave,
                        datumObjave: convertDateToString(new Date(result.mojaObjava.datumObjave)),
                        datumOdgovoraLekara: convertDateToString(new Date(result.mojaObjava.datumOdgovoraLekara)),
                        odgovorLekara: result.mojaObjava.odgovorLekara,
                        isAnswered: result.mojaObjava.odgovorLekara?.toString().length > 0,
                        idDoktor: result.mojaObjava.idDoktora,
                        doktorIme: `${result.mojLekar.ime} ${result.mojLekar.prezime}`,
                        ocena: result.mojaObjava.oceniDoktora,
                        doktorPublicId: result.mojLekar.publicId
                    }
                    tiketi.push(tiket);
                    personsPossibleToChat.push({
                        publicId: result.mojLekar.publicId,
                        id: result.mojaObjava.idDoktora,
                        ime: `${result.mojLekar.ime} ${result.mojLekar.prezime}`,
                    });
                })
            }
            dispatch(setPeople(personsPossibleToChat));
            dispatch(setTiketi(tiketi));
            dispatch(removeError());
            dispatch(removeLoader());
        }).catch(err => {
            console.log(err)
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}
export const getTiketiDoktorThunk = (userId, isSpecijalizant) => {
    return async (dispatch) => {
        dispatch(addLoader());
        let tiketi = [];
        let personsPossibleToChat = [];

        await getRequest(`ObjaveSaOdgovoromTogDoktora?idDoktora=${userId}`).then(res => {
            if (res.isError) {
                console.log("err: ", res.errorMsg);
                // dispatch(addError());
                dispatch(removeLoader());
            }
            var result = res.data;
            
            if (Array.isArray(result)) {
                result.forEach(item => {
                    const tiket = {
                        id: item.mojaObjava.id,
                        naslov: item.mojaObjava.naslov,
                        opis: item.mojaObjava.sadrzajObjave,
                        datumObjave: convertDateToString(new Date(item.mojaObjava.datumObjave)),
                        datumObjaveUTC: item.mojaObjava.datumObjave,
                        datumOdgovoraLekara: convertDateToString(new Date(item.mojaObjava.datumOdgovoraLekara)),
                        odgovorLekara: item.mojaObjava.odgovorLekara,
                        isAnswered: item.mojaObjava.odgovorLekara.length > 0,
                        idPacijent: item.mojaObjava.pacijentID,
                        ocena: item.mojaObjava.oceniDoktora,
                        pacIme: `${item.mojiPac.ime} ${item.mojiPac.prezime}`,
                        pacPublicId: item.mojiPac.publicId
                    }
                    tiketi.push(tiket);
                    personsPossibleToChat.push({
                        publicId: item.mojiPac.publicId,
                        id: item.mojaObjava.pacijentID,
                        ime: `${item.mojiPac.ime} ${item.mojiPac.prezime}`,
                    });
                })
            } else {
                result.forEach(result => {
                    const tiket = {
                        id: result.mojaObjava.id,
                        naslov: result.mojaObjava.naslov,
                        opis: result.mojaObjava.sadrzajObjave,
                        datumObjave: convertDateToString(new Date(result.mojaObjava.datumObjave)),
                        datumObjaveUTC: result.mojaObjava.datumObjave,
                        datumOdgovoraLekara: convertDateToString(new Date(result.mojaObjava.datumOdgovoraLekara)),
                        odgovorLekara: result.mojaObjava.odgovorLekara,
                        isAnswered: result.mojaObjava.odgovorLekara.length > 0,
                        idPacijent: result.mojaObjava.pacijentID,
                        ocena: result.mojaObjava.oceniDoktora,
                        pacIme: `${result.mojiPac.ime} ${result.mojiPac.prezime}`,
                        pacPublicId: result.mojiPac.publicId
                    }
                    tiketi.push(tiket);
                    personsPossibleToChat.push({
                        publicId: result.mojiPac.publicId,
                        id: result.mojaObjava.pacijentID,
                        ime: `${result.mojiPac.ime} ${result.mojiPac.prezime}`,
                    });
                })
            }

            dispatch(removeError());
        }).catch(err => {
            console.log(err);
            // dispatch(addError());
            dispatch(removeLoader());
        })
        if (!isSpecijalizant) {
            await getRequest(`NeprocitaneObjave`).then(res => {
                if (res.isError) {
                    console.log("err: ", res.errorMsg);
                    // dispatch(addError());
                }
                var result = res.data;
                if (Array.isArray(result)) {
                    result.forEach(item => {
                        if (item.mojaObjava.idDoktora.toString() === '00000000-0000-0000-0000-000000000000') {
                            const tiket = {
                                id: item.mojaObjava.id,
                                naslov: item.mojaObjava.naslov,
                                opis: item.mojaObjava.sadrzajObjave,
                                datumObjave: convertDateToString(new Date(item.mojaObjava.datumObjave)),
                                datumOdgovoraLekara: convertDateToString(new Date(item.mojaObjava.datumOdgovoraLekara)),
                                datumObjaveUTC: item.mojaObjava.datumObjave,
                                odgovorLekara: item.mojaObjava.odgovorLekara,
                                isAnswered: false,
                                idPacijent: item.mojaObjava.pacijentID,
                                ocena: item.mojaObjava.oceniDoktora,
                                pacIme: `${item.mojPacj.ime} ${item.mojPacj.prezime}`,
                                pacPublicId: item.mojPacj.publicId
                            }
                            tiketi.push(tiket);
                            personsPossibleToChat.push({
                                publicId: item.mojPacj.publicId,
                                id: item.mojaObjava.pacijentID,
                                ime: `${item.mojPacj.ime} ${item.mojPacj.prezime}`,
                            });
                        }
                    })
                } else {
                    if (result.mojaObjava.idDoktora.toString() === '00000000-0000-0000-0000-000000000000') {
                        const tiket = {
                            id: result.mojaObjava.id,
                            naslov: result.mojaObjava.naslov,
                            opis: result.mojaObjava.sadrzajObjave,
                            datumObjave: convertDateToString(new Date(result.mojaObjava.datumObjave)),
                            datumObjaveUTC: result.mojaObjava.datumObjave,
                            datumOdgovoraLekara: convertDateToString(new Date(result.mojaObjava.datumOdgovoraLekara)),
                            odgovorLekara: result.mojaObjava.odgovorLekara,
                            isAnswered: false,
                            idPacijent: result.mojaObjava.pacijentID,
                            ocena: result.mojaObjava.oceniDoktora,
                            pacIme: `${result.mojPacj.ime} ${result.mojPacj.prezime}`,
                            pacPublicId: result.mojPacj.publicId

                        }
                        tiketi.push(tiket);
                        personsPossibleToChat.push({
                            publicId: result.mojPacj.publicId,
                            id: result.mojaObjava.pacijentID,
                            ime: `${result.mojPacj.ime} ${result.mojPacj.prezime}`,
                        });
                    }
                }
                dispatch(removeError());
            }).catch(err => {
                console.log(err);
                // dispatch(addError());
            })
        }
        for (let i = 0; i < tiketi.length; i++) {
            let minInd = i;
            for (let j = 0; j < tiketi.length; j++) {
                if (new Date(tiketi[minInd].datumObjaveUTC).getTime() < new Date(tiketi[j].datumObjaveUTC).getTime()) minInd = j;
            }
            let tiketTemp = tiketi[i];
            tiketi[i] = tiketi[minInd];
            tiketi[minInd] = tiketTemp;
        }
        dispatch(setPeople(personsPossibleToChat))
        dispatch(setTiketi(tiketi));
        dispatch(removeLoader());
    }
}

export const forwardTicket = (forwardedDoctorId, tiketId, userId) => {
    return async (dispatch) => {
        dispatch(addLoader());
        putRequest(`DoktorOpstePrakse/ProslediPacijentaDoktoru?idTiketa=${tiketId}&idDoktora=${forwardedDoctorId}`).then(res => {
            dispatch(setTiketi([]));
            dispatch(getTiketiDoktorThunk(userId));
            dispatch(removeLoader());
        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}
export const answerTicket = (idObjave, idLekara, odgLekara, indexOfPost) => {
    return async (dispatch) => {
        dispatch(addLoader());
        patchRequest(`DoktorOdgovaraNaObjavu?idObjave=${idObjave}&idLekara=${idLekara}&odgLekara=${encodeURIComponent(odgLekara)}`).then(res => {
            dispatch(setTiketi([]));
            dispatch(getTiketiDoktorThunk(idLekara));
            dispatch(removeLoader());
        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}
export const rateDoktorThunk = (IDDok, IDObj, Ocena) => {
    return async (dispatch) => {
        dispatch(addLoader())
        postRequest(`OceniDoktora?IDDok=${IDDok}&IDObj=${IDObj}&Ocena=${Ocena}`).then(res => {
            // dispatch(getTiketiPacijentThunk());
            // dispatch(removeTiket(IDObj));
            dispatch(addTiketRated(IDObj));
            dispatch(removeLoader());
        }).catch(err => {
            // dispatch(addError());
            dispatch(removeLoader());
        })
    }
}