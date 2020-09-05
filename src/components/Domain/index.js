import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { getSubDomains } from "../../API";
import { withRouter } from "react-router-dom";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subDomains: [],
    };
  }
  componentDidMount() {
    const { domain = "" } = this.props;
    getSubDomains(domain)
      .then((res) => {
        this.setState({
          subDomains: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          subDomains: [],
        });
      });
  }

  render() {
    const { domain = "", history } = this.props;
    const { subDomains = [] } = this.state;
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
              <Grid item xs={3} key={i} style={{ display: "flex" }}>
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
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
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
                            <EmojiEventsIcon style={{ color: "#a97142" }} />
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
                            <EmojiEventsIcon style={{ color: "#D8D8D8" }} />
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
                            <EmojiEventsIcon style={{ color: "#FFD700" }} />
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
                            <EmojiEventsIcon style={{ color: "#b9baba" }} />
                            <Typography variant="body2">Platinum</Typography>
                          </Box>
                        )}
                      </Box>
                    </>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withRouter(Domain);
