import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SchoolIcon from "@material-ui/icons/School";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "../../components/header";
import useStyles from "./styles";
import { useLanguage } from "../../i18n";
import { TajwidText } from "../../tajwid";
import SEO from "../../components/SEO";

// Convert number to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit)])
    .join("");
};

const MemorizationPage = () => {
  const classes = useStyles();
  const { t } = useLanguage();
  const audioRef = useRef(null);

  // State for surah selection
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState("");
  const [startAyat, setStartAyat] = useState(1);
  const [endAyat, setEndAyat] = useState(1);

  // State for memorization
  const [dataAyat, setDataAyat] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [isTranslationHidden, setIsTranslationHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // State for quiz mode
  const [mode, setMode] = useState("practice"); // 'practice' or 'quiz'
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  // Fetch surah list on mount
  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((response) => response.json())
      .then((result) => {
        setSurahList(result.data);
      });
  }, []);

  // Update endAyat when surah changes
  useEffect(() => {
    if (selectedSurah) {
      const surah = surahList.find((s) => s.number === selectedSurah);
      if (surah) {
        setEndAyat(surah.numberOfVerses);
      }
    }
  }, [selectedSurah, surahList]);

  // Start memorization
  const handleStart = () => {
    if (!selectedSurah) return;

    setIsLoading(true);
    fetch(`https://api.quran.gading.dev/surah/${selectedSurah}`)
      .then((response) => response.json())
      .then((result) => {
        const allVerses = result.data.verses;
        const filteredVerses = allVerses.filter(
          (v) => v.number.inSurah >= startAyat && v.number.inSurah <= endAyat
        );
        setDataAyat(filteredVerses);
        setSurahInfo(result.data);
        setCurrentIndex(0);
        setIsStarted(true);
        setIsLoading(false);
        setQuizScore({ correct: 0, total: 0 });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // Navigate ayat
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsTextHidden(false);
      setShowQuizAnswer(false);
    }
  };

  const handleNext = () => {
    if (dataAyat && currentIndex < dataAyat.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsTextHidden(false);
      setShowQuizAnswer(false);
    }
  };

  // Quiz functions
  const handleRevealAnswer = () => {
    setShowQuizAnswer(true);
    setQuizScore((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  const handleMarkCorrect = () => {
    setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total }));
    handleNextQuiz();
  };

  const handleNextQuiz = () => {
    if (dataAyat && currentIndex < dataAyat.length - 2) {
      setCurrentIndex(currentIndex + 1);
      setShowQuizAnswer(false);
    }
  };

  // Get current and next ayat for quiz
  const currentAyat = dataAyat ? dataAyat[currentIndex] : null;
  const nextAyat =
    dataAyat && currentIndex < dataAyat.length - 1
      ? dataAyat[currentIndex + 1]
      : null;

  // Get selected surah info
  const selectedSurahInfo = surahList.find((s) => s.number === selectedSurah);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <SEO
        title={t("memorizationMode")}
        description={t("memorizationSubtitle")}
        path="/memorization"
      />
      <Header />

      {/* Header Card */}
      <div className={classes.headerCard}>
        <div className={classes.pageIcon}>📖</div>
        <Typography className={classes.pageTitle}>
          {t("memorizationMode")}
        </Typography>
        <Typography className={classes.pageSubtitle}>
          {t("memorizationSubtitle")}
        </Typography>
      </div>

      {!isStarted ? (
        // Selection Card
        <div className={classes.selectionCard}>
          <Typography className={classes.selectionTitle}>
            {t("selectSurahToMemorize")}
          </Typography>

          <div className={classes.selectContainer}>
            <Typography className={classes.selectLabel}>
              {t("chooseSurah")}
            </Typography>
            <FormControl variant="outlined" fullWidth size="small">
              <Select
                value={selectedSurah}
                onChange={(e) => {
                  setSelectedSurah(e.target.value);
                  setStartAyat(1);
                }}
                className={classes.select}
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    className: classes.menuPaper,
                    style: { width: "100%", maxWidth: 340 },
                  },
                  MenuListProps: {
                    className: classes.menuList,
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
                renderValue={(value) => {
                  if (!value) return t("selectSurah");
                  const surah = surahList.find((s) => s.number === value);
                  return surah
                    ? `${surah.number}. ${surah.name.transliteration.id}`
                    : "";
                }}
              >
                <MenuItem value="" disabled className={classes.menuItemDisabled}>
                  {t("selectSurah")}
                </MenuItem>
                {surahList.map((surah) => (
                  <MenuItem
                    key={surah.number}
                    value={surah.number}
                    className={classes.menuItem}
                  >
                    <div className={classes.surahMenuItem}>
                      <div className={classes.surahNumberBadge}>
                        <span className={classes.surahNumberText}>
                          {surah.number}
                        </span>
                      </div>
                      <div className={classes.surahDetails}>
                        <div className={classes.surahNameRow}>
                          <span className={classes.surahNameLatin}>
                            {surah.name.transliteration.id}
                          </span>
                          <span className={classes.surahNameArabic}>
                            {surah.name.short}
                          </span>
                        </div>
                        <div className={classes.surahTranslation}>
                          {surah.name.translation.id}
                        </div>
                        <div className={classes.surahMeta}>
                          <span className={classes.surahMetaBadge}>
                            {surah.numberOfVerses} {t("ayat")}
                          </span>
                          <span className={classes.surahMetaBadge}>
                            {surah.revelation.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {selectedSurahInfo && (
            <>
              <div className={classes.selectContainer}>
                <Typography className={classes.selectLabel}>
                  {t("startFromAyat")}
                </Typography>
                <FormControl variant="outlined" fullWidth size="small">
                  <Select
                    value={startAyat}
                    onChange={(e) => setStartAyat(e.target.value)}
                    className={classes.select}
                    MenuProps={{
                      PaperProps: {
                        className: classes.menuPaper,
                      },
                      MenuListProps: {
                        className: classes.menuList,
                      },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {[...Array(selectedSurahInfo.numberOfVerses)].map(
                      (_, i) => (
                        <MenuItem key={i + 1} value={i + 1} className={classes.menuItem}>
                          <div className={classes.ayatMenuItem}>
                            <div className={classes.ayatBadge}>
                              <span className={classes.ayatBadgeText}>{i + 1}</span>
                            </div>
                            <span>{t("ayat")} {i + 1}</span>
                          </div>
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.selectContainer}>
                <Typography className={classes.selectLabel}>
                  {t("endAtAyat")}
                </Typography>
                <FormControl variant="outlined" fullWidth size="small">
                  <Select
                    value={endAyat}
                    onChange={(e) => setEndAyat(e.target.value)}
                    className={classes.select}
                    MenuProps={{
                      PaperProps: {
                        className: classes.menuPaper,
                      },
                      MenuListProps: {
                        className: classes.menuList,
                      },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {[...Array(selectedSurahInfo.numberOfVerses - startAyat + 1)].map(
                      (_, i) => (
                        <MenuItem key={startAyat + i} value={startAyat + i} className={classes.menuItem}>
                          <div className={classes.ayatMenuItem}>
                            <div className={classes.ayatBadge}>
                              <span className={classes.ayatBadgeText}>{startAyat + i}</span>
                            </div>
                            <span>{t("ayat")} {startAyat + i}</span>
                          </div>
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.startButton}
            onClick={handleStart}
            disabled={!selectedSurah || isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : <SchoolIcon />
            }
          >
            {isLoading ? t("loading") : t("startMemorization")}
          </Button>
        </div>
      ) : (
        <>
          {/* Mode Tabs */}
          <div className={classes.modeTabs}>
            <button
              className={`${classes.modeTab} ${
                mode === "practice" ? classes.modeTabActive : ""
              }`}
              onClick={() => setMode("practice")}
            >
              📖 {t("practiceMode")}
            </button>
            <button
              className={`${classes.modeTab} ${
                mode === "quiz" ? classes.modeTabActive : ""
              }`}
              onClick={() => setMode("quiz")}
            >
              🎯 {t("quizMode")}
            </button>
          </div>

          {/* Stats Card */}
          {mode === "quiz" && quizScore.total > 0 && (
            <div className={classes.statsCard}>
              <div className={classes.statItem}>
                <Typography className={classes.statValue}>
                  {quizScore.correct}
                </Typography>
                <Typography className={classes.statLabel}>{t("correct")}</Typography>
              </div>
              <div className={classes.statItem}>
                <Typography className={classes.statValue}>
                  {quizScore.total}
                </Typography>
                <Typography className={classes.statLabel}>{t("attempted")}</Typography>
              </div>
              <div className={classes.statItem}>
                <Typography className={classes.statValue}>
                  {quizScore.total > 0
                    ? Math.round((quizScore.correct / quizScore.total) * 100)
                    : 0}
                  %
                </Typography>
                <Typography className={classes.statLabel}>{t("accuracy")}</Typography>
              </div>
            </div>
          )}

          {/* Memorization Area */}
          <div className={classes.memorizationArea}>
            <div className={classes.surahInfo}>
              <Typography className={classes.surahName}>
                {surahInfo?.name?.transliteration?.id}
              </Typography>
              <Typography className={classes.ayatProgress}>
                {t("ayat")} {currentAyat?.number?.inSurah} / {dataAyat?.length}
              </Typography>
            </div>

            {mode === "practice" ? (
              // Practice Mode
              <>
                <div className={classes.ayatCard}>
                  <div className={classes.ayatNumber}>
                    <Typography className={classes.ayatNumberText}>
                      {toArabicNumeral(currentAyat?.number?.inSurah || 0)}
                    </Typography>
                  </div>
                  <Typography
                    className={`${classes.arabicText} ${
                      isTextHidden ? classes.hiddenText : ""
                    }`}
                  >
                    <TajwidText text={currentAyat?.text?.arab || ""} />
                  </Typography>
                  <Typography
                    className={`${classes.translationText} ${
                      isTranslationHidden ? classes.hiddenText : ""
                    }`}
                  >
                    {currentAyat?.translation?.id}
                  </Typography>
                </div>

                {/* Control Buttons */}
                <div className={classes.controlButtons}>
                  <Button
                    variant="contained"
                    className={`${classes.controlBtn} ${
                      isTextHidden ? classes.showBtn : classes.hideBtn
                    }`}
                    onClick={() => setIsTextHidden(!isTextHidden)}
                    startIcon={
                      isTextHidden ? <VisibilityIcon /> : <VisibilityOffIcon />
                    }
                  >
                    {isTextHidden ? t("showArabic") : t("hideArabic")}
                  </Button>
                  <Button
                    variant="contained"
                    className={`${classes.controlBtn} ${
                      isTranslationHidden ? classes.showBtn : classes.hideBtn
                    }`}
                    onClick={() => setIsTranslationHidden(!isTranslationHidden)}
                    startIcon={
                      isTranslationHidden ? <VisibilityIcon /> : <VisibilityOffIcon />
                    }
                  >
                    {isTranslationHidden
                      ? t("showTranslation")
                      : t("hideTranslation")}
                  </Button>
                </div>

                {/* Audio Player */}
                {currentAyat && (
                  <div className={classes.audioContainer}>
                    <AudioPlayer
                      ref={audioRef}
                      src={currentAyat.audio.primary}
                      showSkipControls={false}
                      showJumpControls={false}
                    />
                  </div>
                )}
              </>
            ) : (
              // Quiz Mode - Sambung Ayat
              <div className={classes.quizSection}>
                <div className={classes.quizHeader}>
                  <QuestionAnswerIcon className={classes.quizIcon} />
                  <Typography className={classes.quizTitle}>
                    {t("continueNextAyat")}
                  </Typography>
                </div>

                <Typography className={classes.quizQuestion}>
                  {t("quizQuestion")}
                </Typography>

                {/* Current Ayat (Preview) */}
                <Typography className={classes.quizAyatPreview}>
                  <TajwidText text={currentAyat?.text?.arab || ""} />
                </Typography>

                {/* Next Ayat (Answer) */}
                {showQuizAnswer && nextAyat && (
                  <Typography className={classes.quizAnswer}>
                    <TajwidText text={nextAyat?.text?.arab || ""} />
                  </Typography>
                )}

                {/* Quiz Buttons */}
                <div className={classes.quizButtons}>
                  {!showQuizAnswer ? (
                    <Button
                      variant="contained"
                      className={`${classes.controlBtn} ${classes.revealBtn}`}
                      onClick={handleRevealAnswer}
                      disabled={!nextAyat}
                      startIcon={<VisibilityIcon />}
                    >
                      {t("showAnswer")}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        className={`${classes.controlBtn} ${classes.showBtn}`}
                        onClick={handleMarkCorrect}
                        disabled={currentIndex >= dataAyat.length - 2}
                      >
                        ✓ {t("iKnewIt")}
                      </Button>
                      <Button
                        variant="contained"
                        className={`${classes.controlBtn} ${classes.nextQuizBtn}`}
                        onClick={handleNextQuiz}
                        disabled={currentIndex >= dataAyat.length - 2}
                      >
                        {t("nextQuestion")}
                      </Button>
                    </>
                  )}
                </div>

                {/* Audio untuk jawaban */}
                {showQuizAnswer && nextAyat && (
                  <div className={classes.audioContainer} style={{ marginTop: 16 }}>
                    <AudioPlayer
                      src={nextAyat.audio.primary}
                      showSkipControls={false}
                      showJumpControls={false}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className={classes.navigationButtons}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.navBtn}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              startIcon={<NavigateBeforeIcon />}
            >
              {t("previousAyat")}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.navBtn}
              onClick={handleNext}
              disabled={!dataAyat || currentIndex >= dataAyat.length - 1}
              endIcon={<NavigateNextIcon />}
            >
              {t("nextAyat")}
            </Button>
          </div>

          {/* Back to Selection */}
          <Button
            variant="text"
            color="primary"
            fullWidth
            style={{ marginTop: 16 }}
            onClick={() => {
              setIsStarted(false);
              setDataAyat(null);
            }}
          >
            {t("changeSurah")}
          </Button>
        </>
      )}
    </Container>
  );
};

export default MemorizationPage;
