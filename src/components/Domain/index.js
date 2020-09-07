import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { getSubDomains } from "../../API";
import { withRouter } from "react-router-dom";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

function SubDomainCard(props) {
  const { history, subDomain } = props;
  return (
    <>
      <Card
        style={{ width: "100%", cursor: "pointer" }}
        onClick={() =>
          history.push({
            pathname: `/subdomain/${subDomain.subdomain}`,
            customNameData: subDomain,
          })
        }
      >
        <CardActionArea>
          <CardMedia
            image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
            title={subDomain.subdomain}
            style={{
              height: "200px",
              backgroundColor: "#000",
              backgroundSize: "contain",
            }}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sub Domain: {subDomain.subdomain}
          </Typography>
          <>
            <Box display="flex" justifyContent="space-between">
              {subDomain.bronze && (
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
              )}
              {subDomain.silver && (
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EmojiEventsIcon style={{ color: "#a5a8ba" }} />
                  <Typography variant="body2"> Silver</Typography>
                </Box>
              )}
              {subDomain.gold && (
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
              )}
              {subDomain.platinum && (
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
              )}
            </Box>
          </>
        </CardContent>
      </Card>
    </>
  );
}
class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subDomains: [],
      loading: false,
    };
  }
  componentDidMount() {
    const { domain = "" } = this.props;
    this.setState({
      loading: true,
    });
    getSubDomains(domain)
      .then((res) => {
        this.setState({
          subDomains: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          subDomains: [],
          loading: false,
        });
      });
  }

  render() {
    const { domain = "", history } = this.props;
    const { subDomains = [], loading } = this.state;
    return (
      <div style={{ marginTop: "1.5em" }}>
        <Typography
          style={{ color: "#fff", fontWeight: "300" }}
          variant="h5"
          gutterBottom
        >
          Domain: {domain}
        </Typography>
        <Grid container spacing={1}>
          {subDomains.map((subDomain, i) => {
            return (
              <>
                {!loading && (
                  <Grid item xs={3} key={i} style={{ display: "flex" }}>
                    <SubDomainCard subDomain={subDomain} history={history} />
                  </Grid>
                )}
              </>
            );
          })}
          {loading && (
            <LinearProgress color="secondary" style={{ width: "100%" }} />
          )}
        </Grid>
      </div>
    );
  }
}

export default withRouter(Domain);
