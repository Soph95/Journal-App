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

  //   function handleDeleteAccount() {
  //     fetch(`/users/${userId}`, {
  //       method: "DELETE",
  //     }).then(() => {
  //       localStorage.removeItem("jwt");
  //       localStorage.removeItem("userId");
  //     });
  //   }

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
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          <TextField
            id="standard-basic"
            label="Content"
            className="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />{" "}
          <br />
          <Button variant="contained" onClick={onSubmit}>
            <Link to="/entries">Add Entry</Link>
          </Button>
        </form>
      </div>

      {/* { <button>  onClick={handleDeleteAccount}
        Delete account
        {/* <Link to="/unauthenticated">Delete account</Link> */}
      {/* </button> } */}
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
