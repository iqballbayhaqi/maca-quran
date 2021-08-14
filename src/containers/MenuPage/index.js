import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import theme from "../../theme";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuSurat from "../../components/menuSurat";
import Header from "../../components/header";

const MenuPage = () => {
  const classes = useStyles();
  const [dataSurat, setDataSurat] = useState();
  const [historyRead, setHistoryRead] = useState();

  useEffect(() => {
    // fetch semua surat
    fetch("https://api-alquranid.herokuapp.com/surah")
      .then((response) => response.json())
      .then((result) => {
        setDataSurat(result.data);
      });

    const history = localStorage.getItem("history");
      console.log(history)
    if (history) {
      setHistoryRead(JSON.parse(history));
    }
  }, []);

  return (
    <Container maxWidth="xs" className={classes.root}>

     <Header/>

      <div className={classes.greetingContainer}>
        <Typography variant="h5" style={{ color: theme.palette.grey.main }}>
          Assalamualaikum
        </Typography>
        <Typography variant="h5">Iqballbaihaqi</Typography>
      </div>

      {historyRead ? (
        <div className={classes.lastHistoryContainer}>
          <div>
            <div className={classes.lastRead}>
              <ImportContactsIcon style={{fontSize: 20}} />
              <Typography variant="caption" style={{ marginLeft: 10 }}>Terakhir dibaca</Typography>
            </div>
            <Typography variant="h6" style={{ margin: "20px 0 5px 0", color: "#fff" }}>
              {historyRead.nama}
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.lastHistoryContainer} >
          <div>
            <div className={classes.lastRead}>
              <ImportContactsIcon />
              <Typography style={{ marginLeft: 10 }}>Last read</Typography>
            </div>
            <Typography variant="h5" style={{ margin: "20px 0 5px 0" }}>
               Al-fatihah
            </Typography>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {dataSurat &&
          dataSurat.map((res) => <MenuSurat key={res.nomor} data={res} />)}
      </div>
    </Container>
  );
};

export default MenuPage;
