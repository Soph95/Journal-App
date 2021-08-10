import Entries from "./Entries";

function AuthenticatedApp({ onLogout }) {
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    onLogout();
  }
  return (
    <>
      <h1>You are logged in</h1>
      <button onClick={logout}>Logout</button>
      <Entries />
    </>
  );
}

export default AuthenticatedApp;
