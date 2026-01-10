import React from "react";
import { Container, Typography, Button, Box } from "@material-ui/core";
import { MenuBook, Star } from "@material-ui/icons";
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
      {/* Decorative Elements */}
      <Box position="absolute" top={20} left={20} className={classes.decorativeIcon}>
        <Star style={{ fontSize: 40 }} />
      </Box>
      <Box position="absolute" top={80} right={30} className={classes.decorativeIcon}>
        <MenuBook style={{ fontSize: 35 }} />
      </Box>

      <div className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          Maca Quran
        </Typography>
        <Typography variant="h6" className={classes.captionTitle}>
          Learn Quran and Recite Once Everyday
        </Typography>
      </div>

      <div className={classes.illustrationContainer}>
        <img src={quranImage} className={classes.quranImage} alt="quran" />
        <Button
          variant="contained"
          color="secondary"
          className={classes.btnGetStarted}
          onClick={mulaiMembaca}
        >
          🕌 Mulai Membaca
        </Button>
      </div>
    </Container>
  );
};

export default Home;
