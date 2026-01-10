import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, IconButton } from "@material-ui/core";
import useStyles from "./styles";
import { useParams, useLocation } from "react-router-dom";
import MenuAyat from "../../components/menuAyat";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useLanguage } from "../../i18n";

const DetailPage = () => {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const { t } = useLanguage();
  const [dataAyat, setDataAyat] = useState();
  const detailSurah = JSON.parse(localStorage.getItem("history"));
  const [currentTrack, setTrackIndex] = useState(0);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef(null);
  const [isSuratBookmarked, setIsSuratBookmarked] = useState(false);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkSuratKey = `bookmarks_surat_${userName}`;

  // Get ayat parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const ayatParam = queryParams.get("ayat");

  useEffect(() => {
    // fetch detail surat
    fetch(`https://api.quran.gading.dev/surah/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setDataAyat(result.data.verses);
      });

    // Check if surat is bookmarked
    const savedBookmarks = localStorage.getItem(bookmarkSuratKey);
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      const found = bookmarks.some((b) => b.number === detailSurah.number);
      setIsSuratBookmarked(found);
    }
  }, [params.id, detailSurah.number, bookmarkSuratKey]);

  // Handle ayat parameter - scroll to and activate specific ayat
  useEffect(() => {
    if (dataAyat && ayatParam) {
      const ayatIndex = parseInt(ayatParam) - 1; // Convert to 0-based index
      if (ayatIndex >= 0 && ayatIndex < dataAyat.length) {
        setTrackIndex(ayatIndex);
        // Scroll to the ayat after a short delay to ensure DOM is ready
        setTimeout(() => {
          scrollToAyat(dataAyat[ayatIndex].number.inQuran);
        }, 300);
      }
    }
  }, [dataAyat, ayatParam]);

  const toggleSuratBookmark = () => {
    const savedBookmarks = localStorage.getItem(bookmarkSuratKey);
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

    if (isSuratBookmarked) {
      // Remove from bookmarks
      bookmarks = bookmarks.filter((b) => b.number !== detailSurah.number);
    } else {
      // Add to bookmarks
      bookmarks.push(detailSurah);
    }

    localStorage.setItem(bookmarkSuratKey, JSON.stringify(bookmarks));
    setIsSuratBookmarked(!isSuratBookmarked);
  };

  const handleClickNext = () => {
    const nextTrack = currentTrack < dataAyat.length - 1 ? currentTrack + 1 : 0;
    setTrackIndex(nextTrack);
    scrollToAyat(dataAyat[nextTrack].number.inQuran);
  };

  const handleEnd = () => {
    if (currentTrack < dataAyat.length - 1) {
      const nextTrack = currentTrack + 1;
      setTrackIndex(nextTrack);
      setShouldAutoPlay(true); // Auto-play next ayat
      scrollToAyat(dataAyat[nextTrack].number.inQuran);
    } else {
      setTrackIndex(0);
      setShouldAutoPlay(false); // Stop at end of surah
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToAyat = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 70; // sticky header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
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
          <IconButton 
            className={classes.bookmarkSuratBtn}
            onClick={toggleSuratBookmark}
            size="small"
          >
            {isSuratBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <Typography className={classes.surahName}>
            {detailSurah.name.transliteration.id}
            <span className={classes.surahArabic}>{detailSurah.name.short}</span>
          </Typography>
          <Typography className={classes.surahTranslation}>
            {detailSurah.name.translation.id}
          </Typography>
          <div className={classes.surahMeta}>
            <span className={classes.metaBadge}>
              {detailSurah.numberOfVerses} {t("verses")}
            </span>
            <span className={classes.metaBadge}>
              {detailSurah.revelation.id}
            </span>
          </div>
        </div>
        
        {dataAyat && (
          <div className={classes.audioPlayerContainer}>
            <AudioPlayer
              ref={audioRef}
              src={dataAyat[currentTrack].audio.primary}
              showSkipControls
              onClickNext={handleClickNext}
              onEnded={handleEnd}
              autoPlay={shouldAutoPlay}
              onPlay={() => setShouldAutoPlay(false)}
            />
          </div>
        )}
      </div>

      <div className={classes.ayatListContainer}>
        {dataAyat ? (
          dataAyat.map((res, index) => (
            <MenuAyat
              key={res.number.inQuran}
              data={res}
              isActive={currentTrack === index}
              suratInfo={detailSurah}
              playSound={(id) => {
                setTrackIndex(id);
                setShouldAutoPlay(true);
                scrollToAyat(dataAyat[id].number.inQuran);
              }}
            />
          ))
        ) : (
          <div className={classes.loadingContainer}>
            <div className={classes.loadingCard}>
              <div className={classes.loadingIcon}>
                <CircularProgress size={28} className={classes.loadingSpinner} />
              </div>
              <Typography className={classes.loadingArabic}>
                ﷽
              </Typography>
              <Typography className={classes.loadingText}>
                {t("loadingAyat")}
              </Typography>
              <div className={classes.loadingDots}>
                <span className={classes.dot}></span>
                <span className={classes.dot}></span>
                <span className={classes.dot}></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DetailPage;
