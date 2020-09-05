import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFamiles, getCompetencies } from "../../API";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  spacing: {
    marginTop: "1rem",
  },
});

function UserProfile() {
  const classes = useStyles();
  const [jobFamily, setjobFamily] = useState([]);
  const [selectedJobFamily, setSelectedJobFamily] = useState(null);
  const history = useHistory();

  const fetchCompetencies = (event) => {
    const family = event.target.value;
    setSelectedJobFamily(family);
    getCompetencies({ selectedFamily: family });
  };

  useEffect(() => {
    getFamiles()
      .then((response) => {
        setjobFamily(response.data);
      })
      .catch((err) => {
        setjobFamily([]);
      });
  }, []);

  return (
    <React.Fragment>
      <Container className={classes.spacing}>
        <Typography variant="h6">Profile</Typography>
        <div className={classes.spacing}>
          <InputLabel id="job-family">Please select your job family</InputLabel>
          <Select fullWidth labelId="job-family" onChange={fetchCompetencies}>
            {jobFamily.map((family, index) => {
              return (
                <MenuItem key={index} value={family}>
                  {family}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <TextField
          select
          fullWidth
          helperText="Please select your competency profile"
        >
          {jobFamily.map((family, index) => {
            return (
              <MenuItem key={index} value={family}>
                {family}
              </MenuItem>
            );
          })}
        </TextField>

        <Button
          onClick={() => {
            history.push("/recommendations");
          }}
          variant="contained"
          color="primary"
          disableElevation
          className={classes.spacing}
        >
          Show Recommendations
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default UserProfile;
