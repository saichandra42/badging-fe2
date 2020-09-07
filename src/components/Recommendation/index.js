import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
  LinearProgress,
} from "@material-ui/core";
import { getRecommendations } from "../../API";
import APP_CONSTANTS from "../../constants";
import { useHistory } from "react-router-dom";

function Recommendation(props) {
  const history = useHistory();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId = 1 } = APP_CONSTANTS;
  useEffect(() => {
    setLoading(true);
    getRecommendations(userId)
      .then((res) => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setRecommendations([]);
        setLoading(false);
      });
  }, []);

  function gotoBadge(recommendation) {
    history.push(`/badge/${recommendation.subdomain}/${recommendation.badge}`);
  }
  return (
    <>
      <Typography
        style={{ color: "#fff", fontWeight: "300" }}
        variant="h5"
        gutterBottom
      >
        Recommended for you
      </Typography>
      <Grid container spacing={1}>
        {!loading &&
          recommendations.map((recommendation, i) => {
            const { subdomain } = recommendation;
            return (
              <Grid item xs={3} key={i} style={{ display: "flex" }}>
                <Card
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => gotoBadge(recommendation)}
                >
                  <CardActionArea>
                    <CardMedia
                      image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
                      title={subdomain}
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
                      {subdomain}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      {recommendation.badge}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        {loading && (
          <LinearProgress
            color="secondary"
            style={{ width: "100%", marginBottom: "2rem" }}
          />
        )}
      </Grid>
    </>
  );
}

export default Recommendation;
