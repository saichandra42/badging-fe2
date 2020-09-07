import React, { useEffect, useState } from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Chart from "react-apexcharts";
import { flattenDeep, uniq } from "lodash";
import { getManagerData, getDataForApproval } from "../../API";
import ManagerFeedbackCard from "./ManagerFeedbackCard";

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
        {approvalData.length > 0 && (
          <Typography variant="h6" style={{ color: "#fff" }} gutterBottom>
            To be reviewed badges
          </Typography>
        )}
        <Grid container spacing={1}>
          {approvalData.map((badge, i) => {
            return (
              <Grid item xs={3} key={i} style={{ display: "flex" }}>
                <ManagerFeedbackCard badge={badge} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Admin;
