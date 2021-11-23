import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Entries from "./Entries";
import Update from "./Update";
import NotFound from "./NotFound";
import Security from "./Security";
import PermDrawer from "./PermDrawer";

function AuthenticatedApp({ onLogout }) {
  return (
    <Router>
      <PermDrawer onLogout={onLogout}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/entries">
            <Entries />
          </Route>
          <Route exact path="/entries/:entryId/update">
            <Update />
          </Route>
          <Route exact path="/security">
            <Security />
          </Route>
          <Route exact path="/signup">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </PermDrawer>
    </Router>
  );
}

export default AuthenticatedApp;
