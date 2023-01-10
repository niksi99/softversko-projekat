import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setDoktor } from '../store/actions/doktor';
import { setPacijent } from '../store/actions/pacijent';
import { logIn } from '../store/actions/user';

export const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPacijent, setIsPacijent] = useState(false);
    const [loaded, setIsLoadedStatus] = useState(false);
    const [isSpecijalizant, setIsSpecijalizant] = useState(false);
    const dispatch = useDispatch();
    const podaciPacijent = useSelector(state => state.pacijent.podaci);
    const podaciDoktor = useSelector(state => state.doktor.podaci);
    useEffect(() => {
        const listener = () => {
            var user = localStorage.getItem("userToken")
            var isPacijent = localStorage.getItem("isPacijent")
            var isSpecijalizant = localStorage.getItem("isSpecijalizant")
            var podaci = localStorage.getItem("podaci");
            if (user) {
                setIsLoggedIn(true);
                setIsPacijent((isPacijent === 'true'));
                setIsSpecijalizant(isSpecijalizant === 'true')
                if (podaci) {
                    var podaciJson = JSON.parse(podaci);
                    if (isPacijent === 'true') {
                        dispatch(setPacijent({ ...podaciJson }))
                    } else {
                        dispatch(setDoktor({ ...podaciJson }));
                    }
                    console.log(podaci)

                    dispatch(logIn({ token: user, isPacijent: isPacijent, isLoggedIn: true, userId: podaciJson.userId }))
                }


                setIsLoadedStatus(true);

            } else {
                setIsLoggedIn(false);
                setIsPacijent(false);
                setIsLoadedStatus(true);
            }
        }
        listener();
        window.addEventListener("storage", listener);
        return () => window.removeEventListener("storage", listener)
    }, []);

    return { isLoggedIn, isPacijent, loaded, isSpecijalizant }

}