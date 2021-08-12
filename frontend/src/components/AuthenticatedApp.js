import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Entries from "./Entries";
import Navbar from "./Navbar";
import EntryDetails from "./EntryDetails";
import Update from "./Update";
import UnauthenticatedApp from "./UnauthenticatesApp";
import NotFound from "./NotFound";

function AuthenticatedApp({ onLogout }) {
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    onLogout();
  }

  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/entries">
            <Entries />
          </Route>
          <Route exact path="/entries/:entryId">
            <EntryDetails />
          </Route>
          <Route exact path="/entries/:entryId/update">
            <Update />
          </Route>
          {/* <Route exact path="/unauthenticated">
            <UnauthenticatedApp />
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <button onClick={logout}>Logout</button>
        {/* <button onClick={logout}>Delete Account</button> */}
      </div>
    </Router>
  );
}

export default AuthenticatedApp;
