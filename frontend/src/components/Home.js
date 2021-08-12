import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt");
  //   const [isPending, setIsPending] = useState(false);
  const history = useHistory();

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
      <h1>You are logged in</h1>
      <form>
        <label>Journal entry title</label> <br />
        <input
          type="text"
          className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Journal entry content</label> <br />
        <textarea
          type="text"
          className="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <Button variant="contained" onClick={onSubmit}>
          <Link to="/entries">Add Entry</Link>
        </Button>
      </form>

      {/* { <button>
        Delete account
        {/* <Link to="/unauthenticated">Delete account</Link> */}
      {/* </button> } */}

      {/* {isPending && <button disabled>Adding Entry...</button>} */}
    </div>
  );
}
export default Home;
// onClick={handleDeleteAccount}

// const jwt = localStorage.getItem("jwt");
// const userId = localStorage.getItem("userId");
// const authorization = "Bearer " + jwt;
// const userInfo = { title, content };
// const response = useFetch(
//   `/users/${userId}/entries`,
//   "POST",
//   userInfo,
//   authorization   );
