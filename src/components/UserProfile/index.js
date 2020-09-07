import React, { useState, useEffect } from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getuser } from "../../API";
import APP_CONSTANTS from "../../constants";

const useStyles = makeStyles({
  spacing: {
    marginTop: "1rem",
  },
});

function UserProfile() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  useEffect(() => {
    const id = APP_CONSTANTS.userId;
    getuser(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser({});
      });
  }, []);
  console.log(user);
  return (
    <React.Fragment>
      <Container className={classes.spacing}>
        <Typography variant="h4" style={{ color: "#fff" }} gutterBottom>
          User Details:
        </Typography>
        <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
          Rank Name: {user.rank_name}
        </Typography>
        <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
          Department: {user.gds_department}
        </Typography>
        <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
          Service Line: {user.gds_sl}
        </Typography>
        <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
          Global SSL: {user.global_ssl}
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default UserProfile;
