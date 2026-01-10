import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import theme from "../../theme";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuSurat from "../../components/menuSurat";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../../i18n";

const MenuPage = () => {
  const Router = useHistory();
  const classes = useStyles();
  const { t } = useLanguage();
  const [dataSurat, setDataSurat] = useState();
  const [historyRead, setHistoryRead] = useState();

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

  return (
    <Container maxWidth="xs" className={classes.root} style={{height: !dataSurat && '100vh'}}>
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

      <div className={classes.surahListContainer}>
        {dataSurat ? (
          dataSurat.map((res) => <MenuSurat key={res.number} data={res} />)
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
