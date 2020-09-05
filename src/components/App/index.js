import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getDomains } from "../../API";
import Domain from "../Domain";
import Recommendation from "../Recommendation";

const useStyles = makeStyles({
  container: {
    marginTop: "1rem",
  },
});

function App() {
  const classes = useStyles();
  const [domains, setDomains] = useState([]);
  useEffect(() => {
    getDomains()
      .then((res) => {
        const domains = res.data.domains;
        setDomains(domains);
      })
      .catch((err) => {
        setDomains([]);
      });
  }, []);

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          style={{ color: "#fff", marginBottom: "1rem" }}
        >
          Stay a step <span style={{ color: "#ffe500" }}>ahead </span>
          by gaining the most{" "}
          <span style={{ color: "#ffe500" }}>vital skills </span>
          for the <span style={{ color: "#ffe500" }}>future</span> of work
        </Typography>
        <Recommendation />
        <hr />
        {domains.map((domain, index) => (
          <Domain domain={domain} key={index} />
        ))}
      </Container>
    </React.Fragment>
  );
}

export default App;
