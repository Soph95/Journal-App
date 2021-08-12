import "./App.css";
import { useState } from "react";
import UnauthenicatedApp from "./components/UnauthenticatesApp";
import AuthenticatedApp from "./components/AuthenticatedApp";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));
  return loggedIn ? (
    <AuthenticatedApp onLogout={() => setLoggedIn(false)} />
  ) : (
    <UnauthenicatedApp onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
