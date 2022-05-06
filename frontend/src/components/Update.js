import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { Typography, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Update() {
  const { entryId } = useParams();
  const history = useHistory();
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
    history.push("/entries");
  }

  const useStyles = makeStyles((theme) => ({
    typography: {
      paddingTop: 20,
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
    btns: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

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
    <div className="background">
      <Box textAlign="center">
        <Typography className={classes.typography} variant="h2" component="h1">
          Update Entry
        </Typography>
        <form key={id} noValidate autoComplete="off">
          <TextField
            color="secondary"
            variant="outlined"
            label="Entry Title"
            className={classes.field}
            defaultValue={entryTitle}
            onChange={(e) => {
              console.log(e.target.value);
              setTitle(e.target.value);
            }}
          />
          <br />
          <TextField
            color="secondary"
            variant="outlined"
            label="Content"
            className={classes.field}
            multiline
            rows={4}
            defaultValue={entryContent}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <Button
            className={classes.btns}
            color="secondary"
            variant="contained"
            onClick={handleUpdate}
            // href="/entries"
          >
            Submit
          </Button>
          <Button
            className={classes.btns}
            color="secondary"
            variant="contained"
            href="/entries"
          >
            Cancel
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Update;
