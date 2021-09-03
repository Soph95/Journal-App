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
            <div className="text">
              <p>{entry.content}</p>
            </div>
            <h4>
              {entry.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </h4>
            <button className="entry-delete" onClick={handleDelete}>
              <Link to="/entries">Delete</Link>
            </button>
            <button className="entry-update">
              <Link to={`${entryId}/update`}>Update</Link>
            </button>
          </article>
        ))}
    </div>
  );
}
export default EntryDetails;
