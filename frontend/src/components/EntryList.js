import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function EntryList({ data }) {
  function handleDeleteAllEntries() {
    const userId = localStorage.getItem("userId");
    fetch(`/users/${userId}/entries`, {
      method: "DELETE",
    });
  }

  return (
    <div>
      <h1>Entries</h1>
      <SearchBar data={data} />
      <button onClick={handleDeleteAllEntries}>
        <Link to="/">Delete all entries</Link>
      </button>
    </div>
  );
}
export default EntryList;

// localStorage.setItem("userId", userId.toString());
