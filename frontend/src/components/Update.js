import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import TextField from "@material-ui/core/TextField";

function Update() {
  const { entryId } = useParams();
  const userId = localStorage.getItem("userId");
  let entryTitle;
  let entryContent;
  let id;

  function handleUpdate() {
    fetch(`/users/${userId}/entries/${entryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
  }

  //when updating try get mouse to go to end of sentence.

  const { data } = useFetch(`/users/${userId}/entries/${entryId}`, "GET");
  data &&
    data.map((entry) => {
      entryTitle = entry.title;
      entryContent = entry.content;
      id = entry.id;
    });

  const [title, setTitle] = useState(entryTitle);
  const [content, setContent] = useState(entryContent);

  return (
    <div className="update-entry">
      <h1>Update Entry {entryId}</h1>
      <form key={id} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Entry Title"
          className="title"
          required={true}
          defaultValue={entryTitle}
          onChange={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
          }}
          // ref={(ref) => ref && ref.focus()}
          // onFocus={(e) =>
          //   e.target.setSelectionRange(
          //     e.target.value.length,
          //     e.target.value.length
          //   )
          // }
        />{" "}
        <br />
        <TextField
          id="standard-basic"
          label="Content"
          className="content"
          required={true}
          defaultValue={entryContent}
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
