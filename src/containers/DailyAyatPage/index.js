import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, IconButton, Button } from "@material-ui/core";
import useStyles from "./styles";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useLanguage } from "../../i18n";
import { useHistory } from "react-router-dom";

const DailyAyatPage = () => {
  const classes = useStyles();
  const Router = useHistory();
  const { t, language } = useLanguage();
  const [dailyAyat, setDailyAyat] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const audioRef = useRef(null);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;
  const dailyAyatKey = `daily_ayat_${userName}`;

  // Get today's date as string (YYYY-MM-DD)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Generate random surah and ayat
  const generateRandomAyat = async (forceNew = false) => {
    setLoading(true);

    const today = getTodayDate();
    const savedDaily = localStorage.getItem(dailyAyatKey);

    // Check if we have a saved daily ayat for today
    if (!forceNew && savedDaily) {
      const parsed = JSON.parse(savedDaily);
      if (parsed.date === today) {
        setDailyAyat(parsed.ayat);
        setSurahInfo(parsed.surahInfo);
        checkIfBookmarked(parsed.ayat);
        setLoading(false);
        return;
      }
    }

    try {
      // Random surah number (1-114)
      const randomSurahNumber = Math.floor(Math.random() * 114) + 1;

      // Fetch surah info first to get number of verses
      const surahResponse = await fetch(
        `https://api.quran.gading.dev/surah/${randomSurahNumber}`
      );
      const surahData = await surahResponse.json();

      // Random ayat number based on surah's total verses
      const totalVerses = surahData.data.numberOfVerses;
      const randomAyatNumber = Math.floor(Math.random() * totalVerses) + 1;

      // Get the specific ayat
      const ayat = surahData.data.verses[randomAyatNumber - 1];
      const surahInfo = {
        number: surahData.data.number,
        name: surahData.data.name,
        revelation: surahData.data.revelation,
        numberOfVerses: surahData.data.numberOfVerses,
      };

      // Save to localStorage
      const dailyData = {
        date: today,
        ayat: ayat,
        surahInfo: surahInfo,
      };
      localStorage.setItem(dailyAyatKey, JSON.stringify(dailyData));

      setDailyAyat(ayat);
      setSurahInfo(surahInfo);
      checkIfBookmarked(ayat);
    } catch (error) {
      console.error("Error fetching daily ayat:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if current ayat is bookmarked
  const checkIfBookmarked = (ayat) => {
    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    if (savedBookmarks && ayat) {
      const bookmarks = JSON.parse(savedBookmarks);
      const found = bookmarks.some((b) => b.number.inQuran === ayat.number.inQuran);
      setIsBookmarked(found);
    }
  };

  // Toggle bookmark for ayat
  const toggleBookmark = () => {
    if (!dailyAyat || !surahInfo) return;

    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter(
        (b) => b.number.inQuran !== dailyAyat.number.inQuran
      );
    } else {
      bookmarks.push({
        ...dailyAyat,
        suratInfo: surahInfo,
      });
    }

    localStorage.setItem(bookmarkAyatKey, JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Share functionality
  const handleShare = () => {
    if (!dailyAyat || !surahInfo) return;

    const text = `${dailyAyat.text.arab}\n\n"${dailyAyat.translation.id}"\n\n— ${surahInfo.name.transliteration.id} (${surahInfo.number}:${dailyAyat.number.inSurah})`;

    if (navigator.share) {
      navigator.share({
        title: t("dailyAyat"),
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert(t("copiedToClipboard"));
    }
  };

  // Navigate to surah detail
  const goToSurah = () => {
    if (!surahInfo || !dailyAyat) return;
    localStorage.setItem("history", JSON.stringify(surahInfo));
    Router.push(`/surah/${surahInfo.number}?ayat=${dailyAyat.number.inSurah}`);
  };

  useEffect(() => {
    generateRandomAyat();
  }, []);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Header />

      <div className={classes.pageHeader}>
        <Typography className={classes.pageTitle}>
          ✨ {t("dailyAyat")}
        </Typography>
        <Typography className={classes.pageSubtitle}>
          {t("dailyAyatSubtitle")}
        </Typography>
      </div>

      {loading ? (
        <div className={classes.loadingContainer}>
          <div className={classes.loadingCard}>
            <div className={classes.loadingIcon}>
              <CircularProgress size={28} className={classes.loadingSpinner} />
            </div>
            <Typography className={classes.loadingArabic}>﷽</Typography>
            <Typography className={classes.loadingText}>
              {t("loadingDailyAyat")}
            </Typography>
            <div className={classes.loadingDots}>
              <span className={classes.dot}></span>
              <span className={classes.dot}></span>
              <span className={classes.dot}></span>
            </div>
          </div>
        </div>
      ) : (
        dailyAyat &&
        surahInfo && (
          <>
            <div className={classes.ayatCard}>
              {/* Surah Info */}
              <div className={classes.surahBadge} onClick={goToSurah}>
                <Typography className={classes.surahName}>
                  {surahInfo.name.transliteration.id}
                </Typography>
                <Typography className={classes.surahArabic}>
                  {surahInfo.name.short}
                </Typography>
                <Typography className={classes.ayatNumber}>
                  {t("ayat")} {dailyAyat.number.inSurah}
                </Typography>
              </div>

              {/* Arabic Text */}
              <Typography className={classes.arabicText}>
                {dailyAyat.text.arab}
              </Typography>

              {/* Transliteration */}
              <Typography className={classes.transliteration}>
                {dailyAyat.text.transliteration.en}
              </Typography>

              {/* Translation */}
              <div className={classes.translationContainer}>
                <Typography className={classes.translation}>
                  "{language === "id" ? dailyAyat.translation.id : dailyAyat.translation.en}"
                </Typography>
              </div>

              {/* Action Buttons */}
              <div className={classes.actionButtons}>
                <IconButton
                  className={classes.actionBtn}
                  onClick={toggleBookmark}
                >
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton className={classes.actionBtn} onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </div>
            </div>

            {/* Audio Player */}
            <div className={classes.audioContainer}>
              <AudioPlayer
                ref={audioRef}
                src={dailyAyat.audio.primary}
                showSkipControls={false}
                showJumpControls={false}
              />
            </div>

            {/* Refresh Button */}
            <Button
              variant="outlined"
              className={classes.refreshBtn}
              onClick={() => generateRandomAyat(true)}
              startIcon={<RefreshIcon />}
            >
              {t("getNewAyat")}
            </Button>

            {/* Go to Surah Button */}
            <Button
              variant="contained"
              className={classes.goToSurahBtn}
              onClick={goToSurah}
            >
              {t("readFullSurah")}
            </Button>
          </>
        )
      )}
    </Container>
  );
};

export default DailyAyatPage;
