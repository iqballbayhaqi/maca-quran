import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import theme from "../../theme";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SearchIcon from "@material-ui/icons/Search";
import { useParams } from "react-router-dom";
import MenuAyat from "../../components/menuAyat";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";

const DetailPage = () => {
  const classes = useStyles();
  const params = useParams();
  const [dataAyat, setDataAyat] = useState();
  const detailSurah = JSON.parse(localStorage.getItem("history"));

  useEffect(() => {
    // fetch detail surat
    fetch(`https://api-alquranid.herokuapp.com/surah/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDataAyat(result.data);
      });
  }, []);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Header/>

      <div>
        <div className={classes.headSurah}>
          <Typography variant="h5">
            {detailSurah.nama} ( {detailSurah.asma} )
          </Typography>
          <Typography>{detailSurah.arti}</Typography>
        </div>
        <AudioPlayer
          src={detailSurah.audio}
          onPlay={(e) => console.log("onPlay")}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        {dataAyat &&
          dataAyat.map((res) => <MenuAyat key={res.nomor} data={res} />)}
      </div>
    </Container>
  );
};

export default DetailPage;
