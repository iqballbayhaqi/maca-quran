import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Header from "../../components/header";
import useStyles from "./styles";
import { useLanguage } from "../../i18n";
import SEO from "../../components/SEO";
import { useThemeContext } from "../../theme";

// Juz data - pages per juz (standard mushaf has 604 pages, 30 juz)
const JUZ_DATA = [
  { juz: 1, startSurah: 1, endSurah: 2, pages: 20 },
  { juz: 2, startSurah: 2, endSurah: 2, pages: 20 },
  { juz: 3, startSurah: 2, endSurah: 3, pages: 20 },
  { juz: 4, startSurah: 3, endSurah: 4, pages: 20 },
  { juz: 5, startSurah: 4, endSurah: 4, pages: 20 },
  { juz: 6, startSurah: 4, endSurah: 5, pages: 20 },
  { juz: 7, startSurah: 5, endSurah: 6, pages: 20 },
  { juz: 8, startSurah: 6, endSurah: 7, pages: 20 },
  { juz: 9, startSurah: 7, endSurah: 8, pages: 20 },
  { juz: 10, startSurah: 8, endSurah: 9, pages: 20 },
  { juz: 11, startSurah: 9, endSurah: 11, pages: 20 },
  { juz: 12, startSurah: 11, endSurah: 12, pages: 20 },
  { juz: 13, startSurah: 12, endSurah: 14, pages: 20 },
  { juz: 14, startSurah: 15, endSurah: 16, pages: 20 },
  { juz: 15, startSurah: 17, endSurah: 18, pages: 20 },
  { juz: 16, startSurah: 18, endSurah: 20, pages: 20 },
  { juz: 17, startSurah: 21, endSurah: 22, pages: 20 },
  { juz: 18, startSurah: 23, endSurah: 25, pages: 20 },
  { juz: 19, startSurah: 25, endSurah: 27, pages: 20 },
  { juz: 20, startSurah: 27, endSurah: 29, pages: 20 },
  { juz: 21, startSurah: 29, endSurah: 33, pages: 20 },
  { juz: 22, startSurah: 33, endSurah: 36, pages: 20 },
  { juz: 23, startSurah: 36, endSurah: 39, pages: 20 },
  { juz: 24, startSurah: 39, endSurah: 41, pages: 20 },
  { juz: 25, startSurah: 41, endSurah: 45, pages: 20 },
  { juz: 26, startSurah: 46, endSurah: 51, pages: 20 },
  { juz: 27, startSurah: 51, endSurah: 57, pages: 20 },
  { juz: 28, startSurah: 58, endSurah: 66, pages: 20 },
  { juz: 29, startSurah: 67, endSurah: 77, pages: 20 },
  { juz: 30, startSurah: 78, endSurah: 114, pages: 24 },
];

// Preset targets
const TARGET_PRESETS = [
  { 
    id: "khatam_30", 
    juz: 30, 
    days: 30, 
    label: "1 Juz/Hari", 
    labelEn: "1 Juz/Day",
    duration: "30 Hari",
    durationEn: "30 Days",
    icon: "🚀",
    desc: "Khatam dalam 1 bulan",
    descEn: "Complete in 1 month",
    intensity: "Intensif"
  },
  { 
    id: "khatam_60", 
    juz: 30, 
    days: 60, 
    label: "½ Juz/Hari", 
    labelEn: "½ Juz/Day",
    duration: "60 Hari",
    durationEn: "60 Days",
    icon: "⭐",
    desc: "Khatam dalam 2 bulan",
    descEn: "Complete in 2 months",
    intensity: "Sedang"
  },
  { 
    id: "khatam_90", 
    juz: 30, 
    days: 90, 
    label: "⅓ Juz/Hari", 
    labelEn: "⅓ Juz/Day",
    duration: "90 Hari",
    durationEn: "90 Days",
    icon: "🌙",
    desc: "Khatam dalam 3 bulan",
    descEn: "Complete in 3 months",
    intensity: "Santai"
  },
  { 
    id: "custom", 
    juz: 0, 
    days: 0, 
    label: "Custom", 
    labelEn: "Custom",
    duration: "",
    durationEn: "",
    icon: "⚙️",
    desc: "Atur sendiri targetmu",
    descEn: "Set your own target",
    intensity: ""
  },
];

const DailyTargetPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t, language } = useLanguage();
  
  // Get user name for storage keys
  const userName = localStorage.getItem("nama") || "default";
  const targetKey = `daily_target_${userName}`;
  const historyKey = `reading_history_${userName}`;
  
  // State
  const [target, setTarget] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("khatam_30");
  const [customJuz, setCustomJuz] = useState(30);
  const [customDays, setCustomDays] = useState(30);
  const [readingHistory, setReadingHistory] = useState([]);

  // Load target and history
  useEffect(() => {
    const savedTarget = localStorage.getItem(targetKey);
    if (savedTarget) {
      setTarget(JSON.parse(savedTarget));
    }
    
    const savedHistory = localStorage.getItem(historyKey);
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
  }, [targetKey, historyKey]);

  // Calculate progress based on reading history
  const progressData = useMemo(() => {
    if (!target) return null;
    
    const startDate = new Date(target.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    
    // Days elapsed since start
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const daysRemaining = Math.max(0, target.totalDays - daysElapsed);
    
    // Count unique surahs read since target started
    const surahsReadSinceStart = readingHistory.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate;
    });
    
    // Calculate unique reading days since start
    const uniqueReadingDays = [...new Set(
      surahsReadSinceStart.map(item => {
        const date = new Date(item.timestamp);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })
    )].length;
    
    // Estimate juz completed based on surahs read
    // This is a simplified calculation
    const uniqueSurahsRead = [...new Set(surahsReadSinceStart.map(item => item.surahNumber))];
    
    let juzCompleted = 0;
    JUZ_DATA.forEach(juz => {
      const surahsInJuz = [];
      for (let s = juz.startSurah; s <= juz.endSurah; s++) {
        surahsInJuz.push(s);
      }
      const surahsReadInJuz = surahsInJuz.filter(s => uniqueSurahsRead.includes(s));
      if (surahsReadInJuz.length === surahsInJuz.length) {
        juzCompleted += 1;
      } else {
        juzCompleted += surahsReadInJuz.length / surahsInJuz.length;
      }
    });
    
    // Expected progress
    const expectedJuz = Math.min(target.totalJuz, (target.totalJuz / target.totalDays) * daysElapsed);
    const actualProgress = (juzCompleted / target.totalJuz) * 100;
    const expectedProgress = (expectedJuz / target.totalJuz) * 100;
    
    // Daily target
    const dailyJuzTarget = target.totalJuz / target.totalDays;
    
    // Status
    let status = "on_track";
    if (actualProgress >= expectedProgress) {
      status = "ahead";
    } else if (actualProgress < expectedProgress - 10) {
      status = "behind";
    }
    
    // End date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + target.totalDays - 1);
    
    return {
      daysElapsed,
      daysRemaining,
      uniqueReadingDays,
      juzCompleted: Math.min(juzCompleted, target.totalJuz),
      expectedJuz,
      actualProgress: Math.min(100, actualProgress),
      expectedProgress,
      dailyJuzTarget,
      status,
      startDate,
      endDate,
      isCompleted: juzCompleted >= target.totalJuz,
    };
  }, [target, readingHistory]);

  const handleSetTarget = () => {
    let juz, days;
    
    if (selectedPreset === "custom") {
      juz = customJuz;
      days = customDays;
    } else {
      const preset = TARGET_PRESETS.find(p => p.id === selectedPreset);
      juz = preset.juz;
      days = preset.days;
    }
    
    const newTarget = {
      totalJuz: juz,
      totalDays: days,
      startDate: new Date().toISOString(),
      preset: selectedPreset,
    };
    
    localStorage.setItem(targetKey, JSON.stringify(newTarget));
    setTarget(newTarget);
    setDialogOpen(false);
  };

  const handleResetTarget = () => {
    if (window.confirm(language === "id" ? "Reset target bacaan?" : "Reset reading target?")) {
      localStorage.removeItem(targetKey);
      setTarget(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ahead": return "#4caf50";
      case "on_track": return "#2196f3";
      case "behind": return "#ff9800";
      default: return "#757575";
    }
  };

  const getStatusText = (status) => {
    if (language === "id") {
      switch (status) {
        case "ahead": return "Di Depan Target! 🎉";
        case "on_track": return "Sesuai Target 👍";
        case "behind": return "Perlu Kejar Target 💪";
        default: return "";
      }
    } else {
      switch (status) {
        case "ahead": return "Ahead of Target! 🎉";
        case "on_track": return "On Track 👍";
        case "behind": return "Need to Catch Up 💪";
        default: return "";
      }
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <SEO 
        title={t("dailyTarget")}
        description="Atur target bacaan Al-Quran harian dan tracking progres khatam Anda di Maca Quran."
        keywords="target bacaan quran, khatam quran, target harian"
        path="/daily-target"
      />
      <Header />
      
      <Typography className={classes.pageTitle}>
        {t("dailyTarget")}
      </Typography>
      <Typography className={classes.pageSubtitle}>
        {t("dailyTargetSubtitle")}
      </Typography>

      {!target ? (
        // No target set - show setup card
        <div className={classes.setupCard}>
          <div className={classes.setupIcon}>🎯</div>
          <Typography className={classes.setupTitle}>
            {t("setYourTarget")}
          </Typography>
          <Typography className={classes.setupSubtitle}>
            {t("setYourTargetHint")}
          </Typography>
          <Button
            variant="contained"
            className={classes.setupButton}
            onClick={() => setDialogOpen(true)}
          >
            {t("createTarget")}
          </Button>
        </div>
      ) : progressData?.isCompleted ? (
        // Target completed
        <div className={classes.completedCard}>
          <div className={classes.completedIcon}>
            <CheckCircleIcon style={{ fontSize: 60, color: "#4caf50" }} />
          </div>
          <Typography className={classes.completedTitle}>
            {t("targetCompleted")} 🎉
          </Typography>
          <Typography className={classes.completedSubtitle}>
            {language === "id" 
              ? `Alhamdulillah! Kamu telah menyelesaikan ${target.totalJuz} juz dalam ${progressData.daysElapsed} hari!`
              : `Alhamdulillah! You've completed ${target.totalJuz} juz in ${progressData.daysElapsed} days!`
            }
          </Typography>
          <Button
            variant="contained"
            className={classes.setupButton}
            onClick={() => setDialogOpen(true)}
          >
            {t("startNewTarget")}
          </Button>
        </div>
      ) : (
        // Active target - show progress
        <>
          {/* Progress Card */}
          <div className={classes.progressCard}>
            <div className={classes.progressHeader}>
              <div>
                <Typography className={classes.progressLabel}>
                  {t("yourTarget")}
                </Typography>
                <Typography className={classes.progressTarget}>
                  {target.totalJuz} Juz / {target.totalDays} {t("days")}
                </Typography>
              </div>
              <IconButton 
                className={classes.editButton}
                onClick={() => setDialogOpen(true)}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </div>

            {/* Main Progress */}
            <div className={classes.mainProgress}>
              <div className={classes.progressCircle}>
                <Typography className={classes.progressPercent}>
                  {Math.round(progressData.actualProgress)}%
                </Typography>
                <Typography className={classes.progressJuz}>
                  {progressData.juzCompleted.toFixed(1)} / {target.totalJuz} Juz
                </Typography>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={classes.progressBarContainer}>
              <div className={classes.progressBarLabels}>
                <Typography className={classes.progressBarLabel}>
                  {t("progress")}
                </Typography>
                <Typography className={classes.progressBarValue}>
                  {Math.round(progressData.actualProgress)}%
                </Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={progressData.actualProgress}
                className={classes.progressBar}
                classes={{
                  bar: classes.progressBarFill,
                }}
              />
              {/* Expected progress marker */}
              <div 
                className={classes.expectedMarker}
                style={{ left: `${progressData.expectedProgress}%` }}
              >
                <div className={classes.expectedLine} />
                <Typography className={classes.expectedLabel}>
                  {t("expected")}
                </Typography>
              </div>
            </div>

            {/* Status */}
            <div 
              className={classes.statusBadge}
              style={{ backgroundColor: `${getStatusColor(progressData.status)}20` }}
            >
              <Typography 
                className={classes.statusText}
                style={{ color: getStatusColor(progressData.status) }}
              >
                {getStatusText(progressData.status)}
              </Typography>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={classes.statsGrid}>
            <div className={classes.statCard}>
              <Typography className={classes.statValue}>
                {progressData.daysElapsed}
              </Typography>
              <Typography className={classes.statLabel}>
                {t("daysElapsed")}
              </Typography>
            </div>
            <div className={classes.statCard}>
              <Typography className={classes.statValue}>
                {progressData.daysRemaining}
              </Typography>
              <Typography className={classes.statLabel}>
                {t("daysRemaining")}
              </Typography>
            </div>
            <div className={classes.statCard}>
              <Typography className={classes.statValue}>
                {progressData.dailyJuzTarget.toFixed(1)}
              </Typography>
              <Typography className={classes.statLabel}>
                {t("juzPerDay")}
              </Typography>
            </div>
            <div className={classes.statCard}>
              <Typography className={classes.statValue}>
                {progressData.uniqueReadingDays}
              </Typography>
              <Typography className={classes.statLabel}>
                {t("activeDays")}
              </Typography>
            </div>
          </div>

          {/* Timeline */}
          <div className={classes.timelineCard}>
            <Typography className={classes.timelineTitle}>
              📅 {t("timeline")}
            </Typography>
            <div className={classes.timelineRow}>
              <div className={classes.timelineItem}>
                <Typography className={classes.timelineLabel}>
                  {t("startDate")}
                </Typography>
                <Typography className={classes.timelineValue}>
                  {formatDate(progressData.startDate)}
                </Typography>
              </div>
              <div className={classes.timelineArrow}>→</div>
              <div className={classes.timelineItem}>
                <Typography className={classes.timelineLabel}>
                  {t("targetDate")}
                </Typography>
                <Typography className={classes.timelineValue}>
                  {formatDate(progressData.endDate)}
                </Typography>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className={classes.tipsCard}>
            <Typography className={classes.tipsTitle}>
              💡 {t("tips")}
            </Typography>
            <Typography className={classes.tipsText}>
              {language === "id"
                ? `Untuk mencapai target, bacalah sekitar ${progressData.dailyJuzTarget.toFixed(1)} juz setiap hari. Konsistensi lebih penting daripada kuantitas!`
                : `To reach your target, read about ${progressData.dailyJuzTarget.toFixed(1)} juz daily. Consistency matters more than quantity!`
              }
            </Typography>
          </div>

          {/* Action Buttons */}
          <div className={classes.actionButtons}>
            <Button
              variant="contained"
              className={classes.readNowButton}
              onClick={() => Router.push("/menu")}
            >
              {t("readNow")}
            </Button>
            <Button
              variant="outlined"
              className={classes.resetButton}
              onClick={handleResetTarget}
            >
              {t("resetTarget")}
            </Button>
          </div>
        </>
      )}

      {/* Set Target Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          {t("setReadingTarget")}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography className={classes.dialogLabel}>
            {t("choosePreset")}
          </Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className={classes.dialogField}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  className: classes.menuPaper
                }
              }
            }}
          >
            {TARGET_PRESETS.map((preset) => (
              <MenuItem 
                key={preset.id} 
                value={preset.id}
                className={classes.presetMenuItem}
              >
                <div className={classes.presetItemContent}>
                  <span className={classes.presetIcon}>{preset.icon}</span>
                  <div className={classes.presetInfo}>
                    <div className={classes.presetMainRow}>
                      <Typography className={classes.presetLabel}>
                        {language === "id" ? preset.label : preset.labelEn}
                      </Typography>
                      {preset.duration && (
                        <span className={classes.presetDuration}>
                          {language === "id" ? preset.duration : preset.durationEn}
                        </span>
                      )}
                    </div>
                    <Typography className={classes.presetDesc}>
                      {language === "id" ? preset.desc : preset.descEn}
                    </Typography>
                  </div>
                  {preset.intensity && (
                    <span className={`${classes.presetBadge} ${
                      preset.id === "khatam_30" ? classes.badgeIntensive :
                      preset.id === "khatam_60" ? classes.badgeModerate :
                      classes.badgeRelaxed
                    }`}>
                      {preset.intensity}
                    </span>
                  )}
                </div>
              </MenuItem>
            ))}
          </TextField>

          {selectedPreset === "custom" && (
            <>
              <Typography className={classes.dialogLabel}>
                {t("totalJuz")}
              </Typography>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={customJuz}
                onChange={(e) => setCustomJuz(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                inputProps={{ min: 1, max: 30 }}
                className={classes.dialogField}
              />
              
              <Typography className={classes.dialogLabel}>
                {t("totalDays")}
              </Typography>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={customDays}
                onChange={(e) => setCustomDays(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1 }}
                className={classes.dialogField}
              />
            </>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button 
            onClick={() => setDialogOpen(false)}
            className={classes.dialogCancelButton}
          >
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleSetTarget}
            variant="contained"
            className={classes.dialogConfirmButton}
          >
            {t("setTarget")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DailyTargetPage;
