import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
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
              <Typography variant="h6" style={{ textTransform: "none" }}>
                EY Badging
              </Typography>
            </Button>
            <Button color="inherit" onClick={() => history.push("/profile")}>
              Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
