import Home from "./Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Entries from "./Entries";
import EntryDetails from "./EntryDetails";
import Update from "./Update";
import UnauthenticatedApp from "./UnauthenticatesApp";
import NotFound from "./NotFound";
import Security from "./Security";

function AuthenticatedApp({ onLogout }) {
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    onLogout();
  }

  function handleDeleteAccount() {
    const userId = localStorage.getItem("userId");
    fetch(`/users/${userId}`, {
      method: "DELETE",
    }).then(() => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userId");
      onLogout();
    });
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
          <Route exact path="/security">
            <Security />
          </Route>
          {/* Think of better way to render home page when signing up. */}
          <Route exact path="/signup">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <button onClick={logout} className="logout-btn">
          <Link to="/">Logout</Link>
        </button>
        <button onClick={handleDeleteAccount} className="delete-account-btn">
          <Link to="/"> Delete account</Link>
          {/* Delete Account */}
        </button>
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
