import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getBadges } from "../../API";
import { useHistory } from "react-router-dom";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const useStyles = makeStyles({
  container: {
    marginTop: "1rem",
  },
});

function enroll(history, subdomain, type) {
  history.push(`/badge/${subdomain}/${type}`);
}

function SubDomain(props) {
  const { location } = props;
  const history = useHistory();
  const [badges, setBadges] = useState({});
  const { subdomain = "" } = badges;
  useEffect(() => {
    const currentURL = location.pathname;
    const subdomain = currentURL.replace("/subdomain/", "");
    getBadges(subdomain).then((res) => {
      setBadges(res.data);
    });
  }, []);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography
        variant="h4"
        style={{ color: "#fff", fontWeight: "300" }}
        gutterBottom
      >
        {subdomain}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={3} style={{ display: "flex" }}>
          {badges.bronze && (
            <Card
              style={{ width: "100%", cursor: "pointer", textAlign: "center" }}
            >
              <CardActionArea>
                <CardMedia
                  image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                  title={"Bronze"}
                  style={{
                    height: "200px",
                    backgroundColor: "#000",
                    backgroundSize: "contain",
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EmojiEventsIcon style={{ color: "#d0872e" }} />
                  <Typography variant="body2">Bronze</Typography>
                </Box>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => enroll(history, subdomain, "Bronze")}
                >
                  Enroll
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={3} style={{ display: "flex" }}>
          {badges.silver && (
            <Card
              style={{ width: "100%", cursor: "pointer", textAlign: "center" }}
            >
              <CardActionArea>
                <CardMedia
                  image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                  title={"Silver"}
                  style={{
                    height: "200px",
                    backgroundColor: "#000",
                    backgroundSize: "contain",
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EmojiEventsIcon style={{ color: "#a5a8ba" }} />
                  <Typography variant="body2">Silver</Typography>
                </Box>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => enroll(history, subdomain, "Silver")}
                >
                  Enroll
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={3} style={{ display: "flex" }}>
          {badges.gold && (
            <Card
              style={{ width: "100%", cursor: "pointer", textAlign: "center" }}
            >
              <CardActionArea>
                <CardMedia
                  image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                  title={"Gold"}
                  style={{
                    height: "200px",
                    backgroundColor: "#000",
                    backgroundSize: "contain",
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EmojiEventsIcon style={{ color: "#aa8b13" }} />
                  <Typography variant="body2">Gold</Typography>
                </Box>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => enroll(history, subdomain, "Gold")}
                >
                  Enroll
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={3} style={{ display: "flex" }}>
          {badges.platinum && (
            <Card
              style={{ width: "100%", cursor: "pointer", textAlign: "center" }}
            >
              <CardActionArea>
                <CardMedia
                  image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                  title={"Platinum"}
                  style={{
                    height: "200px",
                    backgroundColor: "#000",
                    backgroundSize: "contain",
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EmojiEventsIcon style={{ color: "#868685" }} />
                  <Typography variant="body2">Platinum</Typography>
                </Box>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => enroll(history, subdomain, "Platinum")}
                >
                  Enroll
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SubDomain;
