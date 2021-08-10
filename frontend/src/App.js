import "./App.css";
import { useState } from "react";
import Entries from "./components/Entries";
import UnauthenicatedApp from "./components/UnauthenticatesApp";
import AuthenticatedApp from "./components/AuthenticatedApp";
import { BrowserRouter } from "react-router-dom";

function App() {
  <Entries />;
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));
  return loggedIn ? (
    <AuthenticatedApp onLogout={() => setLoggedIn(false)} />
  ) : (
    <UnauthenicatedApp onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
