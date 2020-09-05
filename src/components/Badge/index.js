import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  Button,
  Slider,
} from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { finishBadge, isBadgeCompleted } from "../../API";
import APP_CONSTANTS from "../../constants";
const timeStamp = new Date().toLocaleString();

function Badge(props) {
  const { location } = props;
  const currentURL = location.pathname;
  const urlParams = currentURL.replace("/badge/", "").split("/");
  const subDomain = urlParams[0];
  const badge = urlParams[1];
  const { timeTaken, userId = 1 } = APP_CONSTANTS;
  const [isCompleted, setBadgeCompleted] = useState(false);
  const time = timeTaken[badge];

  function completeBadge(subDomain, badge) {
    const { userId = 1, timeTaken } = APP_CONSTANTS;
    const time = timeTaken[badge];
    finishBadge(userId, subDomain, badge, time, timeStamp, true);
    setBadgeCompleted(true);
  }

  useEffect(() => {
    isBadgeCompleted(userId, subDomain, badge)
      .then((res) => {
        setBadgeCompleted(res.data);
      })
      .catch((err) => {
        setBadgeCompleted(false);
      });
  }, []);

  const handleChange = (event, value) => {
    finishBadge(userId, subDomain, badge, value, timeStamp);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "3rem" }}>
      <Card style={{ textAlign: "center" }}>
        <CardContent>
          <Typography style={{ fontWeight: "300" }} variant="h5">
            {subDomain}
          </Typography>
          <Typography style={{ fontWeight: "300" }} variant="h6">
            {badge}
          </Typography>
        </CardContent>
        <CardActionArea>
          <CardMedia
            image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ph/generic/logos/ey-white-logo.png"
            title={"Bronze"}
            style={{
              height: "300px",
              backgroundColor: "#000",
              backgroundSize: "contain",
            }}
          />
        </CardActionArea>
        {!isCompleted && (
          <>
            <Typography style={{ fontWeight: 300 }} variant="h6">
              Total time to finish: {time} hours
            </Typography>
            <div style={{ width: "80%", margin: "0 auto" }}>
              <Slider
                min={0}
                max={time}
                steps={time / 10}
                marks
                onChange={handleChange}
              />
            </div>

            <Button
              startIcon={<CheckCircleOutlineRoundedIcon />}
              color="primary"
              onClick={(e) => completeBadge(subDomain, badge)}
            >
              Mark as Complete
            </Button>
          </>
        )}
        {isCompleted && (
          <Typography
            style={{ fontWeight: 300, color: "#000" }}
            variant="body1"
            gutterBottom
          >
            Badge Acheived!! Congratulations..!!
          </Typography>
        )}
      </Card>
    </Container>
  );
}

export default Badge;
