import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Switch } from 'react-router-dom'
import { Container } from "./App.styles";
import { About } from "./components/About/About";
import { Doktor } from "./components/Doktori/Doktor/Doktor";
import { Doktori } from "./components/Doktori/Doktori";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Klinika } from "./components/Klinike/Klinika/Klinika";
import Klinike from "./components/Klinike/Klinike";
import Loader from "./components/Loader/Loader";
import DoktorLogin from "./components/Login/Doktor/DoktorLogin";
import PacijentLogin from "./components/Login/Pacijent/PacijentLogin";
import { Messages } from "./components/Messages/Messages";
import { MessageUser } from "./components/Messages/MessageUser/MessageUser";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import PostaviSimptome from "./components/PostaviSimptome/PostaviSimptome";
import { PrivateRoute } from "./components/PrivateRoute";
import PacijentProfil from "./components/Profil/Pacijent/PacijentProfil";
import Profil from "./components/Profil/Profil";
import Register from "./components/Register/Register";
import IstorijaTiketa from "./components/Tiketi/Istorija/IstorijaTiketa";
import StariTiket from "./components/Tiketi/Istorija/StariTiket.js/StariTiket";
import Tiketi from "./components/Tiketi/Tiketi";
import Tiket from "./components/Tiketi/TiketIndiv/Tiket";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";

function App() {
  const { isLoggedIn, isPacijent, loaded } = useIsLoggedIn();
  const isLoading = useSelector(state => state.loader.loader)
  return (
    <Container isLoggedIn={isLoggedIn}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/About"><About /></Route>
        <Route exact path="/Specijalizacije"><Klinike /></Route>
        <Route exact path="/Login"><PacijentLogin /></Route>
        <Route exact path="/Doktor/Login"><DoktorLogin /></Route>
        <Route exact path="/Specijalizacije/:nazivKlinike"><Klinika/></Route>
        <Route exact path="/Doktori/:doktorID"><Doktor/></Route>
        <Route exact path="/Doktori"><Doktori/></Route>
        <Route exact path="/Register"><Register /></Route>
        <Route exact path="/NotFoundPage"><NotFoundPage /></Route>

        <PrivateRoute isLoggedIn={isLoggedIn} loaded={loaded}>
          <Route exact path="/Istorija"><IstorijaTiketa/></Route>
          <Route exact path="/Istorija/:tiketId"><StariTiket /></Route>
          <Route exact path="/Messages"><Messages /></Route>
          <Route exact path="/Messages/:recieverId"><MessageUser /></Route>
          <Route exact path="/PostaviSimptome"><PostaviSimptome /></Route>
          <Route exact path="/Profil"><Profil /></Route>
          <Route exact path="/Tiketi"><Tiketi /></Route>
          <Route exact path="/Tiketi/:tiketId"><Tiket /></Route>
        </PrivateRoute>

        <Route exact path="*" component={() => (<Redirect to="/NotFoundPage" />)} />
      </Switch>
      {isLoading?.length > 0 && <Loader />}
      <Footer />
    </Container>
  );
}

export default App;
