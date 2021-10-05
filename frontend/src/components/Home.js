import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt");
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  async function onSubmit() {
    await fetch(`/users/${userId}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ title, content }),
    });
    // history.push("/entries");
    //Clear form
  }
  return (
    <div>
      <Navbar />
      <div className="entry-field">
        <h1>Add an Entry</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Entry Title"
            className="title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          <TextField
            id="standard-basic"
            label="Content"
            className="content"
            required={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />{" "}
          <br />
          <Button
            disabled={title.length < 1 || content.length < 1}
            variant="contained"
            onClick={onSubmit}
          >
            <Link to="/entries">Add Entry</Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
export default Home;

// const jwt = localStorage.getItem("jwt");
// const userId = localStorage.getItem("userId");
// const authorization = "Bearer " + jwt;
// const userInfo = { title, content };
// const response = useFetch(
//   `/users/${userId}/entries`,
//   "POST",
//   userInfo,
//   authorization   );
