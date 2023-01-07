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
import CircularProgress from "@material-ui/core/CircularProgress";
import FavoriteIcon from "@material-ui/icons/Favorite";

const DetailPage = () => {
  const classes = useStyles();
  const params = useParams();
  const [dataAyat, setDataAyat] = useState();
  const detailSurah = JSON.parse(localStorage.getItem("history"));
  const [currentTrack, setTrackIndex] = useState(0);

  useEffect(() => {
    // fetch detail surat
    fetch(`https://api.quran.gading.dev/surah/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setDataAyat(result.data.verses);
      });
  }, []);

  const saveToFavorite = () => {};

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < dataAyat.length - 1 ? currentTrack + 1 : 0
    );
    scrollTo(dataAyat[currentTrack].number.inQuran);
  };

  const handleEnd = () => {
    if (currentTrack < dataAyat.length - 1) {
      setTrackIndex((currentTrack) => currentTrack + 1);
      scrollTo(dataAyat[currentTrack].number.inQuran);
    } else {
      setTrackIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollTo = (id) => {
    const scroll = document.getElementById(id);
    window.scrollTo({
      top: scroll?.offsetTop ? scroll?.offsetTop + 100 : 100,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container
      maxWidth="xs"
      className={classes.root}
      style={{ height: !dataAyat && "100vh" }}
    >
      <Header />

      <div>
        <div className={classes.headSurah}>
          <Typography
            variant="h5"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {detailSurah.name.transliteration.id} ( {detailSurah.name.short} )
          </Typography>
          <Typography>{detailSurah.name.translation.id}</Typography>
        </div>
        {dataAyat && (
          <AudioPlayer
            src={dataAyat[currentTrack].audio.primary}
            showSkipControls
            onClickNext={handleClickNext}
            onEnded={handleEnd}
            autoPlay={false}
          />
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        {dataAyat ? (
          dataAyat.map((res) => (
            <MenuAyat
              key={res.nomor}
              data={res}
              playSound={(id) => setTrackIndex(id)}
            />
          ))
        ) : (
          <div
            style={{ textAlign: "center", marginTop: 150, paddingBottom: 300 }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default DetailPage;
