import Home from "./Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Entries from "./Entries";
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
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <button onClick={logout} className="logout-btn">
          <Link to="/">Logout</Link>
        </button>
        {/* <button onClick={logout}>Delete Account</button> */}
      </div>
    </Router>
  );
}

export default AuthenticatedApp;

{
  /* <Route exact path="/unauthenticated">
            <UnauthenticatedApp />
          </Route> */
}
