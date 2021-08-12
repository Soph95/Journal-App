import Signup from "./Signup";
import Login from "./Login";

function UnauthenticatedApp({ onLogin }) {
  return (
    <div>
      <h1>You are not logged in</h1>
      <Login onLogin={onLogin} />
      <Signup onLogin={onLogin} />
    </div>
  );
}

export default UnauthenticatedApp;
