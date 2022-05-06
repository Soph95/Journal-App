import { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  Card,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router-dom";

function Cards({ data }) {
  const userId = localStorage.getItem("userId");
  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");

  const filteredEntries = data.filter((entry) => {
    return entry.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayClearButton = searchValue.length > 0;

  function handleDelete(entryId) {
    fetch(`/users/${userId}/entries/${entryId}`, {
      method: "DELETE",
    });
  }

  return (
    <div>
      {data.length > 0 ? (
        <Box textAlign="center" margin="30px">
          <TextField
            label="Search entries by title"
            color="secondary"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {displayClearButton ? (
            <button onClick={() => setSearchValue("")}>X</button>
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}

      <br />
      <Container>
        <Grid container spacing={3}>
          {filteredEntries.map((entry) => (
            <Grid item key={entry.id} xs={12} md={6} lg={4}>
              <Card elevation={2}>
                <CardHeader
                  action={
                    <IconButton
                      href="/entries"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  }
                  title={entry.title}
                  subheader={entry.createdAt
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {entry.content}
                  </Typography>
                  <Box textAlign="center">
                    <Button
                      {...history.push(`/entries/${entry.id}/update`)}
                      color="secondary"
                      // href={`/entries/${entry.id}/update`}
                    >
                      Update
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Cards;
