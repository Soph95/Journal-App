import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";

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
  //When looging in/out page redirects to where it last was - fix
  //Fix url issue
  //Look over useFetch - delete some parameters.

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
    <div>
      <h1>Update Entry {entryId}</h1>
      <form>
        <label>Title</label> <br />
        <input
          type="text"
          className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Content</label> <br />
        <textarea
          type="text"
          className="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </form>
      <button onClick={handleUpdate}>
        <Link to="/entries">Sumbit</Link>
      </button>
    </div>
  );
}

export default Update;
