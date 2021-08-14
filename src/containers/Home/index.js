import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import quranImage from "../../images/quran.png";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";


const Home = () => {
  const classes = useStyles();
  const Router = useHistory();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          Maca Quran
        </Typography>
        <Typography variant="h6" className={classes.captionTitle}>
          learn quran and recrite once everyday
        </Typography>
      </div>

      <div className={classes.illustrationContainer}>
        <img src={quranImage} className={classes.quranImage} alt="quran" />
      </div>
      <div className={classes.btnGetStartedContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btnGetStarted}
          onClick={() => Router.push("/menu")}
        >
          Get Started
        </Button>
      </div>
    </Container>
  );
};

export default Home;
