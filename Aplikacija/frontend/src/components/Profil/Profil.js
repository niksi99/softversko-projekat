import React from 'react'
import { useSelector } from 'react-redux'
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn'
import DoktorProfil from './Doktor/DoktorProfil';
import PacijentProfil from './Pacijent/PacijentProfil';

const Profil = () => {
    const {isLoggedIn, isPacijent} = useIsLoggedIn();
    if (!isPacijent) {
        return <DoktorProfil />
    } else {
        return <PacijentProfil />
    }
    return (
        <div>
            Loading...
        </div>
    )
}

export default Profil