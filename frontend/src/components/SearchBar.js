import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function SearchBar({ data }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredEntries = data.filter((entry) => {
    return entry.title.includes(searchValue);
  });

  const displayClearButton = searchValue.length > 0;

  // const useStyles = makeStyles({
  //   root: {
  //     // minWidth: 275,
  //     display: "flex",
  //     justifyContent: "space-around",
  //   },
  //   title: {
  //     fontSize: 14,
  //   },
  //   pos: {
  //     marginBottom: 12,
  //   },
  // });

  // const classes = useStyles();

  return (
    <div className="cards">
      <TextField
        id="standard-basic"
        label="SEARCH ENTRIES BY TITLE"
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
                {entry.createdAt.slice(0, 10)}
              </Typography>
            </CardContent>
            <CardActions>
              <Link className="entries-btn" to={`entries/${entry.id}`}>
                {/* <button className="entries-btn" size="small"> */}
                VIEW ENTRY
                {/* </button> */}
              </Link>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
