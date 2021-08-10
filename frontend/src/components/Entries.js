import { useState } from "react";
import EntryList from "./EntryList";
// import { Link, Router } from "react-router-dom";
// import { render } from "react-dom";
import { useHistory, BrowserRouter, Link } from "react-router-dom";

function Entries() {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function onChange(e) {
    e.target.className === "title"
      ? setTitle(e.target.value)
      : setContent(e.target.value);
  }

  async function onSubmit() {
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");
    const response = await fetch(`/users/${userId}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ title, content }),
    });
    console.log(response.ok);

    if (response.ok) {
      history.push("/EntryList");
    }
  }

  return (
    <div>
      <p>Title</p>
      <input type="text" className="title" value={title} onChange={onChange} />
      <p>Description</p>
      <input
        type="text"
        className="content"
        value={content}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Add Entry</button>
    </div>
  );
}

export default Entries;
