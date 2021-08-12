import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ data }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredEntries = data.filter((entry) => {
    return entry.title.includes(searchValue);
  });

  const displayClearButton = searchValue.length > 0;

  return (
    <div>
      <input
        placeholder="Search entries by title"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {displayClearButton ? (
        <button onClick={() => setSearchValue("")}>Clear</button>
      ) : (
        ""
      )}
      {filteredEntries.map((entry) => (
        <div key={entry.title}>
          <Link to={`entries/${entry.id}`}>
            {entry.title}
            {entry.createdAt.slice(0, 10)}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
