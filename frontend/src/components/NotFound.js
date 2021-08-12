import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <h2>Sorry</h2>
      <h2>Page Not Found</h2>
      <Link to="/">Go back to home page</Link>
    </div>
  );
}
export default NotFound;
