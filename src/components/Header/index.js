import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import APP_CONSTANTS from "../../constants";
import { getNotification } from "../../API";

function Header() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getNotification(APP_CONSTANTS.userId)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        setNotifications([]);
      });
  }, []);
  console.log(notifications, "***");
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            css={{ width: "100%" }}
          >
            <Button color="inherit" onClick={() => history.push("/")}>
              <img
                src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/generic/logos/ey-logo-black.png"
                alt="logo"
                height="75px"
                width="auto"
              />
            </Button>
            <Box display="flex" alignItems="center">
              <Badge badgeContent={4} color="primary">
                <NotificationsNoneOutlinedIcon
                  style={{ cursor: "pointer" }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                />
              </Badge>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={handleClose}
              >
                {notifications.map((notification, index) => {
                  return (
                    <MenuItem onClick={handleClose} key={index}>
                      {notification.message} for {notification.badge} in{" "}
                      {notification.subdomain}
                    </MenuItem>
                  );
                })}
              </Menu>
              <Button color="inherit" onClick={() => history.push("/profile")}>
                Profile
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
