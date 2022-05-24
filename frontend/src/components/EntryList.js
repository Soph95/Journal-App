import Cards from "./Cards";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function EntryList({ data }) {
  const useStyles = makeStyles({
    typography: {
      paddingTop: 20,
      fontFamily: "Dancing Script",
      borderBottom: "2px solid #FF0075",
      width: "30%",
      margin: "auto",
    },
    btn: {
      margin: 40,
    },
  });

  const classes = useStyles();

  function handleDeleteAllEntries() {
    const userId = localStorage.getItem("userId");

    fetch(`/users/${userId}/entries`, {
      method: "DELETE",
    });
  }

  return (
    <div className="background">
      <Typography
        className={classes.typography}
        variant="h2"
        align="center"
        gutterBottom
      >
        Entries
      </Typography>
      <Cards data={data} />
      {data.length > 0 ? (
        <Box textAlign="center">
          <Button
            className={classes.btn}
            color="secondary"
            variant="contained"
            href="/"
            onClick={handleDeleteAllEntries}
          >
            Delete all entries
          </Button>
        </Box>
      ) : (
        <Typography align="center" variant="h5">
          No entries yet, add an entry to get started!
        </Typography>
      )}
    </div>
  );
}
export default EntryList;
