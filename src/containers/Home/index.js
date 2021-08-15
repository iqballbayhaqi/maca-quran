import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import quranImage from "../../images/quran.png";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Home = () => {
  const classes = useStyles();
  const Router = useHistory();

  const mulaiMembaca = () => {
    swal({
      text: 'Perkenalan yuk! Siapa namamu ?',
      content: "input",
      button: {
        text: "Halo!",
        closeModal: false,
      },
    })
    .then(name => {
      localStorage.setItem("nama", name);
      Router.push("/menu")
      swal.close()
    })
  }

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
        <Button
          variant="contained"
          color="secondary"
          className={classes.btnGetStarted}
          // onClick={() => Router.push("/menu")}
          onClick={mulaiMembaca}
        >
          Mulai Membaca
        </Button>
      </div>
    </Container>
  );
};

export default Home;
