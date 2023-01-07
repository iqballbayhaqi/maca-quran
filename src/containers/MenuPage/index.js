import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import theme from "../../theme";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuSurat from "../../components/menuSurat";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

const MenuPage = () => {
  const Router = useHistory();
  const classes = useStyles();
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
          Assalamualaikum
        </Typography>
        <Typography variant="h5">{localStorage.getItem("nama")}</Typography>
      </div>

      {historyRead && historyRead.name.transliteration ? (
        <div className={classes.lastHistoryContainer} onClick={() => Router.push(`/surah/${historyRead.number}`)}>
          <div>
            <div className={classes.lastRead}>
              <ImportContactsIcon style={{ fontSize: 20 }} />
              <Typography variant="caption" style={{ marginLeft: 10 }}>
                Terakhir dibaca
              </Typography>
            </div>
            <Typography
              variant="h6"
              style={{ margin: "20px 0 5px 0", color: "#fff" }}
            >
              {historyRead.name.transliteration.id}
            </Typography>
          </div>
          <Typography
            variant="h6"
            style={{ margin: "20px 0 5px 0", color: "#fff" }}
          >
            {historyRead.name.long}
          </Typography>
        </div>
      ) : (
        <div className={classes.lastHistoryContainer}>
          <div style={{opacity: 0}}>
            <div className={classes.lastRead}>
              <ImportContactsIcon />
              <Typography style={{ marginLeft: 10 }}>Last read</Typography>
            </div>
            <Typography variant="h5">
              Al-fatihah
            </Typography>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {dataSurat ? (
          dataSurat.map((res) => <MenuSurat key={res.number} data={res} />)
        ) : (
          <div style={{ textAlign: "center", marginTop: 150 }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default MenuPage;
