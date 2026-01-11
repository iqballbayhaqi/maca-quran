import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, TextField } from "@material-ui/core";
import { MenuBook, Star } from "@material-ui/icons";
import quranImage from "../../images/quran.png";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../../i18n";
import SEO from "../../components/SEO";

const Home = () => {
  const classes = useStyles();
  const Router = useHistory();
  const { t } = useLanguage();
  const [nama, setNama] = useState("");

  useEffect(() => {
    const savedNama = localStorage.getItem("nama");
    if (savedNama) {
      setNama(savedNama);
    }
  }, []);

  const handleSubmit = () => {
    if (nama.trim()) {
      localStorage.setItem("nama", nama.trim());
      Router.push("/menu");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <SEO 
        title="Beranda"
        description="Maca Quran - Aplikasi baca Al-Quran online gratis dengan terjemahan Indonesia, audio murottal, tajwid berwarna, dan fitur bookmark. Mulai membaca Al-Quran sekarang."
        keywords="baca quran online, quran digital, al-quran indonesia"
        path="/"
      />
      {/* Decorative Elements */}
      <Box position="absolute" top={20} left={20} className={classes.decorativeIcon}>
        <Star style={{ fontSize: 40 }} />
      </Box>
      <Box position="absolute" top={80} right={30} className={classes.decorativeIcon}>
        <MenuBook style={{ fontSize: 35 }} />
      </Box>

      <div className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          {t("appName")}
        </Typography>
        <Typography variant="h6" className={classes.captionTitle}>
          {t("tagline")}
        </Typography>
      </div>

      <div className={classes.illustrationContainer}>
        <img src={quranImage} className={classes.quranImage} alt="quran" />
        
        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>
            {t("introPrompt")}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Masukkan nama..."
            className={classes.nameInput}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.btnGetStarted}
            onClick={handleSubmit}
            disabled={!nama.trim()}
          >
            {t("startReading")}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
