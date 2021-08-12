import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="main-heading">Journal App</h1>
      <div className="links">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/entries">Entries</Link>
        </span>
        {/* <Link to="/entries">Add Entry</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
