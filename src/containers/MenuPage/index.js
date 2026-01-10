import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@material-ui/core";
import useStyles from "./styles";
import theme from "../../theme";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuSurat from "../../components/menuSurat";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../../i18n";
import SEO from "../../components/SEO";

// Mapping: juz number -> array of {surah, startAyat, endAyat}
// Surahs that span multiple juz are included in each juz with their verse ranges
const JUZ_TO_SURAHS = {
  1: [
    { surah: 1, startAyat: 1, endAyat: 7 },
    { surah: 2, startAyat: 1, endAyat: 141 },
  ],
  2: [{ surah: 2, startAyat: 142, endAyat: 252 }],
  3: [
    { surah: 2, startAyat: 253, endAyat: 286 },
    { surah: 3, startAyat: 1, endAyat: 92 },
  ],
  4: [
    { surah: 3, startAyat: 93, endAyat: 200 },
    { surah: 4, startAyat: 1, endAyat: 23 },
  ],
  5: [{ surah: 4, startAyat: 24, endAyat: 147 }],
  6: [
    { surah: 4, startAyat: 148, endAyat: 176 },
    { surah: 5, startAyat: 1, endAyat: 81 },
  ],
  7: [
    { surah: 5, startAyat: 82, endAyat: 120 },
    { surah: 6, startAyat: 1, endAyat: 110 },
  ],
  8: [
    { surah: 6, startAyat: 111, endAyat: 165 },
    { surah: 7, startAyat: 1, endAyat: 87 },
  ],
  9: [
    { surah: 7, startAyat: 88, endAyat: 206 },
    { surah: 8, startAyat: 1, endAyat: 40 },
  ],
  10: [
    { surah: 8, startAyat: 41, endAyat: 75 },
    { surah: 9, startAyat: 1, endAyat: 92 },
  ],
  11: [
    { surah: 9, startAyat: 93, endAyat: 129 },
    { surah: 10, startAyat: 1, endAyat: 109 },
    { surah: 11, startAyat: 1, endAyat: 5 },
  ],
  12: [
    { surah: 11, startAyat: 6, endAyat: 123 },
    { surah: 12, startAyat: 1, endAyat: 52 },
  ],
  13: [
    { surah: 12, startAyat: 53, endAyat: 111 },
    { surah: 13, startAyat: 1, endAyat: 43 },
    { surah: 14, startAyat: 1, endAyat: 52 },
  ],
  14: [
    { surah: 15, startAyat: 1, endAyat: 99 },
    { surah: 16, startAyat: 1, endAyat: 128 },
  ],
  15: [
    { surah: 17, startAyat: 1, endAyat: 111 },
    { surah: 18, startAyat: 1, endAyat: 74 },
  ],
  16: [
    { surah: 18, startAyat: 75, endAyat: 110 },
    { surah: 19, startAyat: 1, endAyat: 98 },
    { surah: 20, startAyat: 1, endAyat: 135 },
  ],
  17: [
    { surah: 21, startAyat: 1, endAyat: 112 },
    { surah: 22, startAyat: 1, endAyat: 78 },
  ],
  18: [
    { surah: 23, startAyat: 1, endAyat: 118 },
    { surah: 24, startAyat: 1, endAyat: 64 },
    { surah: 25, startAyat: 1, endAyat: 20 },
  ],
  19: [
    { surah: 25, startAyat: 21, endAyat: 77 },
    { surah: 26, startAyat: 1, endAyat: 227 },
    { surah: 27, startAyat: 1, endAyat: 55 },
  ],
  20: [
    { surah: 27, startAyat: 56, endAyat: 93 },
    { surah: 28, startAyat: 1, endAyat: 88 },
    { surah: 29, startAyat: 1, endAyat: 45 },
  ],
  21: [
    { surah: 29, startAyat: 46, endAyat: 69 },
    { surah: 30, startAyat: 1, endAyat: 60 },
    { surah: 31, startAyat: 1, endAyat: 34 },
    { surah: 32, startAyat: 1, endAyat: 30 },
    { surah: 33, startAyat: 1, endAyat: 30 },
  ],
  22: [
    { surah: 33, startAyat: 31, endAyat: 73 },
    { surah: 34, startAyat: 1, endAyat: 54 },
    { surah: 35, startAyat: 1, endAyat: 45 },
    { surah: 36, startAyat: 1, endAyat: 27 },
  ],
  23: [
    { surah: 36, startAyat: 28, endAyat: 83 },
    { surah: 37, startAyat: 1, endAyat: 182 },
    { surah: 38, startAyat: 1, endAyat: 88 },
    { surah: 39, startAyat: 1, endAyat: 31 },
  ],
  24: [
    { surah: 39, startAyat: 32, endAyat: 75 },
    { surah: 40, startAyat: 1, endAyat: 85 },
    { surah: 41, startAyat: 1, endAyat: 46 },
  ],
  25: [
    { surah: 41, startAyat: 47, endAyat: 54 },
    { surah: 42, startAyat: 1, endAyat: 53 },
    { surah: 43, startAyat: 1, endAyat: 89 },
    { surah: 44, startAyat: 1, endAyat: 59 },
    { surah: 45, startAyat: 1, endAyat: 37 },
  ],
  26: [
    { surah: 46, startAyat: 1, endAyat: 35 },
    { surah: 47, startAyat: 1, endAyat: 38 },
    { surah: 48, startAyat: 1, endAyat: 29 },
    { surah: 49, startAyat: 1, endAyat: 18 },
    { surah: 50, startAyat: 1, endAyat: 45 },
    { surah: 51, startAyat: 1, endAyat: 30 },
  ],
  27: [
    { surah: 51, startAyat: 31, endAyat: 60 },
    { surah: 52, startAyat: 1, endAyat: 49 },
    { surah: 53, startAyat: 1, endAyat: 62 },
    { surah: 54, startAyat: 1, endAyat: 55 },
    { surah: 55, startAyat: 1, endAyat: 78 },
    { surah: 56, startAyat: 1, endAyat: 96 },
    { surah: 57, startAyat: 1, endAyat: 29 },
  ],
  28: [
    { surah: 58, startAyat: 1, endAyat: 22 },
    { surah: 59, startAyat: 1, endAyat: 24 },
    { surah: 60, startAyat: 1, endAyat: 13 },
    { surah: 61, startAyat: 1, endAyat: 14 },
    { surah: 62, startAyat: 1, endAyat: 11 },
    { surah: 63, startAyat: 1, endAyat: 11 },
    { surah: 64, startAyat: 1, endAyat: 18 },
    { surah: 65, startAyat: 1, endAyat: 12 },
    { surah: 66, startAyat: 1, endAyat: 12 },
  ],
  29: [
    { surah: 67, startAyat: 1, endAyat: 30 },
    { surah: 68, startAyat: 1, endAyat: 52 },
    { surah: 69, startAyat: 1, endAyat: 52 },
    { surah: 70, startAyat: 1, endAyat: 44 },
    { surah: 71, startAyat: 1, endAyat: 28 },
    { surah: 72, startAyat: 1, endAyat: 28 },
    { surah: 73, startAyat: 1, endAyat: 20 },
    { surah: 74, startAyat: 1, endAyat: 56 },
    { surah: 75, startAyat: 1, endAyat: 40 },
    { surah: 76, startAyat: 1, endAyat: 31 },
    { surah: 77, startAyat: 1, endAyat: 50 },
  ],
  30: [
    { surah: 78, startAyat: 1, endAyat: 40 },
    { surah: 79, startAyat: 1, endAyat: 46 },
    { surah: 80, startAyat: 1, endAyat: 42 },
    { surah: 81, startAyat: 1, endAyat: 29 },
    { surah: 82, startAyat: 1, endAyat: 19 },
    { surah: 83, startAyat: 1, endAyat: 36 },
    { surah: 84, startAyat: 1, endAyat: 25 },
    { surah: 85, startAyat: 1, endAyat: 22 },
    { surah: 86, startAyat: 1, endAyat: 17 },
    { surah: 87, startAyat: 1, endAyat: 19 },
    { surah: 88, startAyat: 1, endAyat: 26 },
    { surah: 89, startAyat: 1, endAyat: 30 },
    { surah: 90, startAyat: 1, endAyat: 20 },
    { surah: 91, startAyat: 1, endAyat: 15 },
    { surah: 92, startAyat: 1, endAyat: 21 },
    { surah: 93, startAyat: 1, endAyat: 11 },
    { surah: 94, startAyat: 1, endAyat: 8 },
    { surah: 95, startAyat: 1, endAyat: 8 },
    { surah: 96, startAyat: 1, endAyat: 19 },
    { surah: 97, startAyat: 1, endAyat: 5 },
    { surah: 98, startAyat: 1, endAyat: 8 },
    { surah: 99, startAyat: 1, endAyat: 8 },
    { surah: 100, startAyat: 1, endAyat: 11 },
    { surah: 101, startAyat: 1, endAyat: 11 },
    { surah: 102, startAyat: 1, endAyat: 8 },
    { surah: 103, startAyat: 1, endAyat: 3 },
    { surah: 104, startAyat: 1, endAyat: 9 },
    { surah: 105, startAyat: 1, endAyat: 5 },
    { surah: 106, startAyat: 1, endAyat: 4 },
    { surah: 107, startAyat: 1, endAyat: 7 },
    { surah: 108, startAyat: 1, endAyat: 3 },
    { surah: 109, startAyat: 1, endAyat: 6 },
    { surah: 110, startAyat: 1, endAyat: 3 },
    { surah: 111, startAyat: 1, endAyat: 5 },
    { surah: 112, startAyat: 1, endAyat: 4 },
    { surah: 113, startAyat: 1, endAyat: 5 },
    { surah: 114, startAyat: 1, endAyat: 6 },
  ],
};

const MenuPage = () => {
  const Router = useHistory();
  const classes = useStyles();
  const { t } = useLanguage();
  const [dataSurat, setDataSurat] = useState();
  const [historyRead, setHistoryRead] = useState();
  const [viewMode, setViewMode] = useState("all"); // "all" or "juz"

  useEffect(() => {
    // fetch semua surat
    fetch("https://api.quran.gading.dev/surah")
      .then((response) => response.json())
      .then((result) => {
        setDataSurat(result.data);
      });

    const history = localStorage.getItem("history");
    if (history) {
      setHistoryRead(JSON.parse(history));
    }
  }, []);

  // Render surahs grouped by juz (surahs spanning multiple juz are duplicated)
  const renderSurahsWithJuzHeaders = () => {
    if (!dataSurat) return null;
    
    const elements = [];
    
    // Iterate through all 30 juz
    for (let juz = 1; juz <= 30; juz++) {
      const surahsInJuz = JUZ_TO_SURAHS[juz] || [];
      
      if (surahsInJuz.length > 0) {
        // Add juz header
        elements.push(
          <Typography key={`juz-${juz}`} variant="h6" className={classes.juzHeader}>
            {t("juz")} {juz}
          </Typography>
        );
        
        // Add surahs for this juz with ayat range
        surahsInJuz.forEach((item) => {
          const surah = dataSurat.find((s) => s.number === item.surah);
          if (surah) {
            elements.push(
              <MenuSurat 
                key={`juz-${juz}-surah-${item.surah}`} 
                data={surah} 
                ayatRange={{ start: item.startAyat, end: item.endAyat }}
              />
            );
          }
        });
      }
    }
    
    return elements;
  };

  return (
    <Container maxWidth="xs" className={classes.root} style={{height: !dataSurat && '100vh'}}>
      <SEO 
        title="Daftar Surah Al-Quran"
        description="Daftar lengkap 114 surah Al-Quran dengan terjemahan Indonesia. Baca Al-Quran berdasarkan surah atau juz dengan mudah di Maca Quran."
        keywords="daftar surah, 114 surah, quran lengkap, juz quran, daftar surat al-quran"
        path="/menu"
      />
      <Header />

      <div className={classes.greetingContainer}>
        <Typography variant="h5" style={{ color: theme.palette.grey.main }}>
          {t("greeting")}
        </Typography>
        <Typography variant="h5">{localStorage.getItem("nama")}</Typography>
      </div>

      {historyRead && historyRead.name.transliteration ? (
        <div className={classes.lastHistoryContainer} onClick={() => Router.push(`/surah/${historyRead.number}`)}>
          <div>
            <div className={classes.lastRead}>
              <ImportContactsIcon />
              <Typography variant="caption">
                {t("lastReadLabel")}
              </Typography>
            </div>
            <Typography
              variant="h6"
              style={{ 
                marginTop: 12, 
                color: "#fff", 
                fontFamily: "'El Messiri', sans-serif",
                fontWeight: 600,
                fontSize: "1.2rem"
              }}
            >
              {historyRead.name.transliteration.id}
            </Typography>
          </div>
          <Typography
            style={{ 
              color: "#fff",
              fontFamily: "'Amiri', serif",
              fontSize: "1.8rem",
              opacity: 0.95
            }}
          >
            {historyRead.name.long}
          </Typography>
        </div>
      ) : (
        <div className={classes.lastHistoryContainer} style={{ opacity: 0.5 }}>
          <div>
            <div className={classes.lastRead}>
              <ImportContactsIcon />
              <Typography variant="caption">{t("lastReadLabel")}</Typography>
            </div>
            <Typography 
              variant="h6"
              style={{ 
                marginTop: 12, 
                color: "#fff", 
                fontFamily: "'El Messiri', sans-serif",
              }}
            >
              {t("noLastRead")}
            </Typography>
          </div>
        </div>
      )}

      {/* View Toggle: All Surah / By Juz */}
      <Box className={classes.viewToggleContainer}>
        <Button
          className={`${classes.viewToggleButton} ${viewMode === "all" ? classes.viewToggleButtonActive : ""}`}
          onClick={() => setViewMode("all")}
          disableElevation
        >
          {t("allSurah")}
        </Button>
        <Button
          className={`${classes.viewToggleButton} ${viewMode === "juz" ? classes.viewToggleButtonActive : ""}`}
          onClick={() => setViewMode("juz")}
          disableElevation
        >
          {t("byJuz")}
        </Button>
      </Box>

      <div className={classes.surahListContainer}>
        {dataSurat ? (
          viewMode === "all" ? (
            dataSurat.map((res) => <MenuSurat key={res.number} data={res} />)
          ) : (
            renderSurahsWithJuzHeaders()
          )
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default MenuPage;
