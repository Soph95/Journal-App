import Signup from "./Signup";
import Login from "./Login";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function UnauthenticatedApp({ onLogin }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup onLogin={onLogin} />
        </Route>
        <Route exact path="/">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
