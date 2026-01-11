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
import GetAppIcon from "@material-ui/icons/GetApp";
import { useLanguage } from "../../i18n";
import { useHistory } from "react-router-dom";
import html2canvas from "html2canvas";
import { TajwidText } from "../../tajwid";
import SEO from "../../components/SEO";
import { useThemeContext } from "../../theme";

// Array of Islamic themed background images
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80",
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80",
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80",
  "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&q=80",
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  "https://images.unsplash.com/photo-1517309230475-6736d926b979?w=800&q=80",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
];

const DailyAyatPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t, language } = useLanguage();
  const [dailyAyat, setDailyAyat] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(BACKGROUND_IMAGES[0]);
  const audioRef = useRef(null);
  const cardRef = useRef(null);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;
  const dailyAyatKey = `daily_ayat_${userName}`;

  // Get random background image
  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    return BACKGROUND_IMAGES[randomIndex];
  };

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
        setBackgroundImage(parsed.backgroundImage || BACKGROUND_IMAGES[0]);
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

      // Get random background image
      const newBackground = getRandomBackground();

      // Save to localStorage
      const dailyData = {
        date: today,
        ayat: ayat,
        surahInfo: surahInfo,
        backgroundImage: newBackground,
      };
      localStorage.setItem(dailyAyatKey, JSON.stringify(dailyData));

      setDailyAyat(ayat);
      setSurahInfo(surahInfo);
      setBackgroundImage(newBackground);
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

  // Download card as image
  const handleDownload = async () => {
    if (!cardRef.current || !dailyAyat || !surahInfo) return;

    try {
      // Temporarily remove border-radius for download
      const originalBorderRadius = cardRef.current.style.borderRadius;
      cardRef.current.style.borderRadius = "0";

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      // Restore border-radius
      cardRef.current.style.borderRadius = originalBorderRadius;

      const link = document.createElement("a");
      link.download = `${surahInfo.name.transliteration.id}-ayat-${dailyAyat.number.inSurah}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error downloading card:", error);
      // Restore border-radius in case of error
      if (cardRef.current) {
        cardRef.current.style.borderRadius = "";
      }
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
      <SEO 
        title="Ayat Harian"
        description="Dapatkan ayat Al-Quran harian untuk inspirasi dan renungan. Bagikan ayat favorit dengan teman dan keluarga di Maca Quran."
        keywords="ayat harian, daily quran, ayat hari ini, inspirasi quran, renungan islami"
        path="/daily-ayat"
      />
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
            <div 
              className={classes.ayatCard} 
              ref={cardRef}
              style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
              {/* Arabic Text */}
              <Typography className={classes.arabicText}>
                <TajwidText text={dailyAyat.text.arab} />
              </Typography>

              {/* Translation */}
              <div className={classes.translationContainer}>
                <Typography className={classes.translation}>
                  "{language === "id" ? dailyAyat.translation.id : dailyAyat.translation.en}"
                </Typography>
              </div>

              {/* Surah Info - Bottom */}
              <div className={classes.surahInfo} onClick={goToSurah} style={{ cursor: "pointer" }}>
                <Typography className={classes.surahLabel}>
                  {surahInfo.name.transliteration.id.toUpperCase()} | {t("ayat").toUpperCase()} {dailyAyat.number.inSurah}
                </Typography>
              </div>

              {/* Watermark */}
              <div className={classes.watermark}>
                <span>Maca Quran</span>
                <span>@iqballbayhaqi</span>
              </div>
            </div>

            {/* Action Buttons - Outside Card */}
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
              <IconButton className={classes.actionBtn} onClick={handleDownload}>
                <GetAppIcon />
              </IconButton>
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
