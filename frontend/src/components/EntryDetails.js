import { useParams, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import Navbar from "./Navbar";

function EntryDetails() {
  const userId = localStorage.getItem("userId");
  const { entryId } = useParams();
  const history = useHistory();
  const { data, isPending } = useFetch(
    `/users/${userId}/entries/${entryId}`,
    "GET"
  );

  function handleDelete() {
    fetch(`/users/${userId}/entries/${entryId}`, {
      method: "DELETE",
    });
    // .then(() => {
    //   history.push("/entries");
    // });
  }

  return (
    <div className="entry-details">
      <Navbar />
      <h1>Entry Details {entryId}</h1>
      {isPending && <div>Loading...</div>}
      {data &&
        data.map((entry) => (
          <article key={entry.id}>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <h4>{entry.createdAt}</h4>
            <button onClick={handleDelete}>
              <Link to="/entries">Delete</Link>
            </button>
            <button>
              <Link to={`${entryId}/update`}>Update</Link>
            </button>
          </article>
        ))}
    </div>
  );
}
export default EntryDetails;
