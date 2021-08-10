import Signup from "./Signup";
import Login from "./Login";

function UnauthenticatedApp({ onLogin }) {
  return (
    <>
      <h1>You are not logged in</h1>
      <Login onLogin={onLogin} />
      <Signup onLogin={onLogin} />
    </>
  );
}

export default UnauthenticatedApp;
