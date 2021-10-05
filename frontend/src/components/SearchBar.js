import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function SearchBar({ data }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredEntries = data.filter((entry) => {
    return entry.title.includes(searchValue);
  });

  const displayClearButton = searchValue.length > 0;

  return (
    <div className="cards">
      <TextField
        id="standard-basic"
        label="Search entries by title"
        className="search-entries"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />{" "}
      {displayClearButton ? (
        <button className="clear-btn" onClick={() => setSearchValue("")}>
          X
        </button>
      ) : (
        ""
      )}
      <br />
      {filteredEntries.map((entry) => (
        <div className="entries-container" key={entry.id}>
          <Card className="entries-card" variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {entry.title}
              </Typography>
              <Typography variant="body2" component="p">
                {entry.createdAt.slice(0, 10).split("-").reverse().join("-")}
              </Typography>
            </CardContent>
            <CardActions>
              <Link className="entries-btn" to={`entries/${entry.id}`}>
                VIEW ENTRY
              </Link>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
