import React from "react";
import { Container, Typography, Link } from "@material-ui/core";
import useStyles from "./styles";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";
import quranImage from "../../images/quran.png";

const AboutPage = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Header />

      <img src={quranImage} className={classes.quranImage} alt="quran" />
      <div style={{marginTop: 30}}>
        <Typography>Name : Maca Quran App</Typography>
        <Typography>
          Repository :{" "}
          <Link
            href="https://github.com/iqballbayhaqi/maca-quran"
          >
            https://github.com/iqballbayhaqi/maca-quran
          </Link>
          <Typography>created by :  <Link
            href="https://iqbalbaihaqi.vercel.app/"
          >
            iqballbayhaqi
          </Link></Typography>
        </Typography>
      </div>
    </Container>
  );
};

export default AboutPage;
