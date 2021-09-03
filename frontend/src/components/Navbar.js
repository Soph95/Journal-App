import { Link } from "react-router-dom";
import useFetch from "./useFetch";

function Navbar() {
  const userId = localStorage.getItem("userId");
  const { data } = useFetch(`/users/${userId}`, "GET");

  return (
    <nav className="navbar">
      <h1 className="main-heading">{data && data.username}'s Journal App</h1>
      <div className="links">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/entries">Entries</Link>
        </span>
        <span>
          <Link to="/security">Security</Link>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
