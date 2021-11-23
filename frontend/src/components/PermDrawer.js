import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { AddCircle, SubjectOutlined, Help } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function PermDrawer({ children, onLogout }) {
  const userId = localStorage.getItem("userId");
  const { data } = useFetch(`/users/${userId}`, "GET");

  const listItems = [
    {
      path: "/",
      icon: <AddCircle color="secondary" />,
      text: "Create New Entry",
    },
    {
      path: "/entries",
      icon: <SubjectOutlined color="secondary" />,
      text: "Entries",
    },
    {
      path: "/security",
      icon: <Help color="secondary" />,
      text: "FAQ's",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    onLogout();
  }

  function handleDeleteAccount() {
    const userResponse = window.confirm(
      "Are you sure you want to delete yor account?"
    );
    if (userResponse) {
      const userId = localStorage.getItem("userId");
      fetch(`/users/${userId}`, {
        method: "DELETE",
      }).then(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        onLogout();
      });
    }
  }

  const drawerWidth = 240;
  const useStyles = makeStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    text: {
      color: "black",
    },
    avatar: {
      margin: 15,
      backgroundColor: "black",
    },
    page: {
      width: "100%",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <IconButton
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar className={classes.avatar}>
              {data && data.username.slice(0, 1)}
            </Avatar>
          </IconButton>
          My Account
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Link to="/">
              <MenuItem onClick={logout} className={classes.text}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Link>

            <Link to="/">
              <MenuItem onClick={handleDeleteAccount} className={classes.text}>
                <ListItemIcon>
                  <HighlightOffIcon fontSize="small" />
                </ListItemIcon>
                Delete Account
              </MenuItem>
            </Link>
          </Menu>
        </div>

        <List>
          {listItems.map((item) => (
            <Link key={item.text} to={item.path}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText className={classes.text} primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
}

export default PermDrawer;
