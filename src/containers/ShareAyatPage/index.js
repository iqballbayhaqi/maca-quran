import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, IconButton, Button } from "@material-ui/core";
import useStyles from "./styles";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import GetAppIcon from "@material-ui/icons/GetApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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

const ShareAyatPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t, language } = useLanguage();
  const [ayatData, setAyatData] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(BACKGROUND_IMAGES[0]);
  const audioRef = useRef(null);
  const cardRef = useRef(null);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;

  // Load ayat data from localStorage
  useEffect(() => {
    const savedShareAyat = localStorage.getItem("share_ayat_data");
    if (savedShareAyat) {
      const parsed = JSON.parse(savedShareAyat);
      setAyatData(parsed.ayat);
      setSurahInfo(parsed.surahInfo);
      setBackgroundImage(BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)]);
      checkIfBookmarked(parsed.ayat);
    }
    setLoading(false);
  }, []);

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
    if (!ayatData || !surahInfo) return;

    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter(
        (b) => b.number.inQuran !== ayatData.number.inQuran
      );
    } else {
      bookmarks.push({
        ...ayatData,
        suratInfo: surahInfo,
      });
    }

    localStorage.setItem(bookmarkAyatKey, JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Share functionality
  const handleShare = () => {
    if (!ayatData || !surahInfo) return;

    const text = `${ayatData.text.arab}\n\n"${ayatData.translation.id}"\n\n— ${surahInfo.name.transliteration.id} (${surahInfo.number}:${ayatData.number.inSurah})`;

    if (navigator.share) {
      navigator.share({
        title: t("shareAyat"),
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert(t("copiedToClipboard"));
    }
  };

  // Download card as image
  const handleDownload = async () => {
    if (!cardRef.current || !ayatData || !surahInfo) return;

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
      link.download = `${surahInfo.name.transliteration.id}-ayat-${ayatData.number.inSurah}.png`;
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
    if (!surahInfo || !ayatData) return;
    localStorage.setItem("history", JSON.stringify(surahInfo));
    Router.push(`/surah/${surahInfo.number}?ayat=${ayatData.number.inSurah}`);
  };

  // Go back
  const handleBack = () => {
    Router.goBack();
  };

  // Change background
  const changeBackground = (bg) => {
    setBackgroundImage(bg);
  };

  if (loading) {
    return (
      <Container maxWidth="xs" className={classes.root}>
        <Header />
        <div className={classes.loadingContainer}>
          <div className={classes.loadingCard}>
            <div className={classes.loadingIcon}>
              <CircularProgress size={28} className={classes.loadingSpinner} />
            </div>
            <Typography className={classes.loadingArabic}>﷽</Typography>
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
      </Container>
    );
  }

  if (!ayatData || !surahInfo) {
    return (
      <Container maxWidth="xs" className={classes.root}>
        <Header />
        <div className={classes.errorContainer}>
          <Typography className={classes.errorText}>
            {t("noAyatSelected")}
          </Typography>
          <Button
            variant="outlined"
            className={classes.backBtn}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            {t("back")}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" className={classes.root}>
      <SEO 
        title={`Share Ayat - ${surahInfo.name.transliteration.id} Ayat ${ayatData.number.inSurah}`}
        description={`Bagikan ayat dari Surah ${surahInfo.name.transliteration.id} ayat ${ayatData.number.inSurah}. ${ayatData.translation.id}`}
        keywords="share ayat, bagikan ayat, quran image, ayat gambar"
        path="/share-ayat"
      />
      <Header />

      <div className={classes.pageHeader}>
        <Typography className={classes.pageTitle}>
          📤 {t("shareAyat")}
        </Typography>
        <Typography className={classes.pageSubtitle}>
          {t("shareAyatSubtitle")}
        </Typography>
      </div>

      <div 
        className={classes.ayatCard} 
        ref={cardRef}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        {/* Arabic Text */}
        <Typography className={classes.arabicText}>
          <TajwidText text={ayatData.text.arab} />
        </Typography>

        {/* Translation */}
        <div className={classes.translationContainer}>
          <Typography className={classes.translation}>
            "{language === "id" ? ayatData.translation.id : ayatData.translation.en}"
          </Typography>
        </div>

        {/* Surah Info - Bottom */}
        <div className={classes.surahInfo} onClick={goToSurah} style={{ cursor: "pointer" }}>
          <Typography className={classes.surahLabel}>
            {surahInfo.name.transliteration.id.toUpperCase()} | {t("ayat").toUpperCase()} {ayatData.number.inSurah}
          </Typography>
        </div>

        {/* Watermark */}
        <div className={classes.watermark}>
          <span>Maca Quran</span>
          <span>@iqballbayhaqi</span>
        </div>
      </div>

      {/* Background Selector */}
      <div className={classes.backgroundSelector}>
        <Typography className={classes.backgroundSelectorTitle}>
          {t("chooseBackground")}
        </Typography>
        <div className={classes.backgroundGrid}>
          {BACKGROUND_IMAGES.map((bg, index) => (
            <div
              key={index}
              className={`${classes.backgroundThumb} ${backgroundImage === bg ? classes.backgroundThumbActive : ''}`}
              style={{ backgroundImage: `url('${bg}')` }}
              onClick={() => changeBackground(bg)}
            />
          ))}
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
          src={ayatData.audio.primary}
          showSkipControls={false}
          showJumpControls={false}
        />
      </div>

      {/* Back Button */}
      <Button
        variant="outlined"
        className={classes.backBtn}
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
      >
        {t("back")}
      </Button>

      {/* Go to Surah Button */}
      <Button
        variant="contained"
        className={classes.goToSurahBtn}
        onClick={goToSurah}
      >
        {t("readFullSurah")}
      </Button>
    </Container>
  );
};

export default ShareAyatPage;
