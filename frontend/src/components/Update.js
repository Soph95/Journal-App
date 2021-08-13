import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import TextField from "@material-ui/core/TextField";

function Update() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { entryId } = useParams();
  const userId = localStorage.getItem("userId");

  //Could make a GET request to the entry and get its title and contents and populate the
  //form fields with those.
  ///Fix date when updated.
  //Delete user account - problem occurs when trying to do that.
  //Required attribute not working
  //Figure out how to render unauth page once user has been deleted
  //Look over useFetch - delete some parameters.
  //Think of a better way to sign up without having to link to /

  // const { data } = useFetch(`/users/${userId}/entries/${entryId}`, "GET");

  function handleUpdate() {
    fetch(`/users/${userId}/entries/${entryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
  }

  return (
    <div className="update-entry">
      <h1>Update Entry {entryId}</h1>
      <form noValidate autoComplete="off">
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
        <button className="update-btn" onClick={handleUpdate}>
          <Link to="/entries">Sumbit</Link>
        </button>
        <button className="cancel-btn">
          <Link to={`/entries/${entryId}`}>Cancel</Link>
        </button>
      </form>
    </div>
  );
}

export default Update;
