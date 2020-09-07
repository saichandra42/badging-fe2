import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  FormControlLabel,
  Switch,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { submitManagerFeedback } from "../../API";
import StarRatings from "react-star-ratings";

function ManagerFeedbackCard(props) {
  const { badge } = props;
  const [techKnowledge, setTechKnowledge] = useState(0);
  const [efficiencyGained, setEfficiencyGained] = useState(0);
  const [knowledgeSharing, setKnowledgeSharing] = useState(0);
  const [promotion, setPromotion] = useState(false);
  const [feedback, setFeedback] = useState("");

  function submitFeedback() {
    const badge_feedback = {
      userid: badge.userId,
      subdomain: badge.subdomain,
      badge: badge.badge,
      tech_knowledge: techKnowledge,
      efficiency_gained: efficiencyGained,
      knowledge_sharing: knowledgeSharing,
      can_promote: promotion,
      suggestions: feedback,
    };
    submitManagerFeedback(badge_feedback);
    window.location.reload();
  }

  return (
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
        <Box component="fieldset" borderColor="transparent">
          <Typography
            component="legend"
            variant="body2"
            color="textPrimary"
            gutterBottom
          >
            User: {badge.userId} has earned {badge.badge} badge in{" "}
            {badge.subdomain}
          </Typography>
          <Typography component="legend" variant="body2" color="textPrimary">
            Technical knowledge gained rating:
          </Typography>
          <StarRatings
            rating={techKnowledge}
            starRatedColor="rgb(170,139,19)"
            starHoverColor="rgb(170,139,19)"
            changeRating={(newRating) => setTechKnowledge(newRating)}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="5px"
          />
        </Box>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend" variant="body2" color="textPrimary">
            Efficiency gained from the course:
          </Typography>
          <StarRatings
            rating={efficiencyGained}
            starRatedColor="rgb(170,139,19)"
            starHoverColor="rgb(170,139,19)"
            changeRating={(newRating) => setEfficiencyGained(newRating)}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="5px"
          />
        </Box>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend" variant="body2" color="textPrimary">
            Knowledge Sharing initiatives made:
          </Typography>
          <StarRatings
            rating={knowledgeSharing}
            starRatedColor="rgb(170,139,19)"
            starHoverColor="rgb(170,139,19)"
            changeRating={(newRating) => setKnowledgeSharing(newRating)}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="5px"
          />
        </Box>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend" variant="body2" color="textPrimary">
            Can be promoted:
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={promotion}
                onChange={(e, value) => setPromotion(value)}
                name="promotion"
                color="primary"
              />
            }
            label="Primary"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Feedback text"
            placeholder="Feedback to be shared"
            multiline
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
            style={{ width: "100%", fontSize: "0.75rem" }}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={submitFeedback}
            >
              Submit
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ManagerFeedbackCard;
