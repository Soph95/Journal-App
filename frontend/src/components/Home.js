import { useState } from "react";
import useFetch from "./useFetch";
import { Button, Typography, Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt");
  const { data } = useFetch(`/users/${userId}`, "GET");

  const useStyles = makeStyles((theme) => ({
    typography: {
      paddingTop: 100,
      marginBottom: theme.spacing(8),
      fontFamily: "Dancing Script",
      borderBottom: "2px solid #FF0075",
      width: "30%",
      margin: "auto",
    },
    field: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: "50%",
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
  }

  return (
    <div className="background">
      <Box textAlign="center">
        <Typography
          className={classes.typography}
          variant="h2"
          align="center"
          gutterBottom
        >
          {data &&
            data.username.slice(0, 1).toUpperCase() +
              data.username.slice(1).toLowerCase()}
          's Journal
        </Typography>
        <Typography variant="h4">Add an entry</Typography>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.field}
            color="secondary"
            variant="outlined"
            label="Entry Title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.field}
            variant="outlined"
            color="secondary"
            label="Content"
            multiline
            rows={4}
            required={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <Button
            disabled={title.length < 1 || content.length < 1}
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            href="/entries"
          >
            Add entry
          </Button>
        </form>
      </Box>
    </div>
  );
}
export default Home;
