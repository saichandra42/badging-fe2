import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  FormControlLabel,
  Switch,
  Button,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Chart from "react-apexcharts";
import { flattenDeep, uniq } from "lodash";
import { getManagerData, getDataForApproval } from "../../API";

function Admin() {
  const [approvalData, setApprovalData] = useState([]);
  const [subDomains, setSubDomains] = useState([]);
  const [series, setSeries] = useState([]);
  useEffect(() => {
    getDataForApproval()
      .then((res) => {
        setApprovalData(res.data);
      })
      .catch((err) => {
        setApprovalData([]);
      });
    getManagerData()
      .then((res) => {
        const subDomains = res.data.map((user_data) =>
          user_data.map((user) => user.subDomain)
        );
        const time_spent = res.data.map((user) => {
          return {
            name: "User " + user[0].userId,
            data: user.map((user_data) => user_data.timeSpent),
          };
        });
        setSeries(time_spent);
        const uniq_subdomains = uniq(flattenDeep(subDomains));
        setSubDomains(uniq_subdomains);
      })
      .catch((err) => {
        setSeries([]);
        setSubDomains([]);
      });
  }, []);

  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: subDomains,
    },
    plotOptions: {
      // bar: {
      //   horizontal: true,
      // },
    },
    stroke: {
      width: 1,
    },
  };
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" style={{ color: "#fff" }} gutterBottom>
          Manager Dashboard
        </Typography>
        <div style={{ backgroundColor: "#fff", margin: "2rem 0" }}>
          <Chart options={options} series={series} type="bar" height={500} />
        </div>
        <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
          To be reviewed badges
        </Typography>
        <Grid container spacing={1}>
          {approvalData.map((badge, i) => {
            return (
              <Grid item xs={3} key={i} style={{ display: "flex" }}>
                <Card style={{ width: "100%", cursor: "pointer" }}>
                  <CardActionArea>
                    <CardMedia
                      image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                      title={badge.subDomain}
                      style={{
                        height: "100px",
                        backgroundColor: "#000",
                        backgroundSize: "contain",
                      }}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography
                      component="legend"
                      variant="body2"
                      color="textPrimary"
                      gutterBottom
                    >
                      User: {badge.userId} has earned {badge.badge} badge in{" "}
                      {badge.domain}
                    </Typography>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography
                        component="legend"
                        variant="body2"
                        color="textPrimary"
                      >
                        Technical knowledge gained rating:
                      </Typography>
                      <Rating
                        name="customized-empty"
                        defaultValue={2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Box>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography
                        component="legend"
                        variant="body2"
                        color="textPrimary"
                      >
                        Efficiency gained from the course:
                      </Typography>
                      <Rating
                        name="customized-empty"
                        defaultValue={2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Box>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography
                        component="legend"
                        variant="body2"
                        color="textPrimary"
                      >
                        Knowledge Sharing initiatives made:
                      </Typography>
                      <Rating
                        name="customized-empty"
                        defaultValue={2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Box>
                    <Typography
                      component="legend"
                      variant="body2"
                      color="textPrimary"
                    >
                      Can be promoted:
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onChange={null}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Primary"
                    />
                    <div>
                      <Button variant="contained" color="secondary">
                        Submit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Admin;
