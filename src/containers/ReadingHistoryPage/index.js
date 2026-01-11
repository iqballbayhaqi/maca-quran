import React, { useState, useEffect, useMemo } from "react";
import { Container, Typography, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Header from "../../components/header";
import useStyles from "./styles";
import { useLanguage } from "../../i18n";
import SEO from "../../components/SEO";
import { useThemeContext } from "../../theme";

const ReadingHistoryPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t, language } = useLanguage();
  const [readingHistory, setReadingHistory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get current user name for storage keys
  const userName = localStorage.getItem("nama") || "default";
  const historyKey = `reading_history_${userName}`;
  const streakKey = `reading_streak_${userName}`;

  useEffect(() => {
    loadReadingHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const loadReadingHistory = () => {
    const saved = localStorage.getItem(historyKey);
    if (saved) {
      setReadingHistory(JSON.parse(saved));
    }
  };

  // Calculate streak
  const streakData = useMemo(() => {
    if (readingHistory.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalDays: 0, totalSurahs: 0 };
    }

    // Get unique dates (only date part, not time)
    const uniqueDates = [...new Set(
      readingHistory.map(item => {
        const date = new Date(item.timestamp);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })
    )].sort().reverse();

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user read today or yesterday
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
    
    let streakStarted = false;
    if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
      streakStarted = true;
    }

    if (streakStarted) {
      // Count consecutive days
      const sortedDates = [...uniqueDates].sort();
      let checkDate = uniqueDates[0] === todayStr ? today : yesterday;
      
      for (let i = 0; i < sortedDates.length; i++) {
        const checkStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
        
        if (uniqueDates.includes(checkStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    const sortedDatesAsc = uniqueDates.sort();
    let longestStreak = 0;
    let tempStreak = 1;
    
    for (let i = 1; i < sortedDatesAsc.length; i++) {
      const [year1, month1, day1] = sortedDatesAsc[i - 1].split('-').map(Number);
      const [year2, month2, day2] = sortedDatesAsc[i].split('-').map(Number);
      
      const date1 = new Date(year1, month1, day1);
      const date2 = new Date(year2, month2, day2);
      const diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Total unique surahs read
    const uniqueSurahs = [...new Set(readingHistory.map(item => item.surahNumber))];

    // Save streak data
    localStorage.setItem(streakKey, JSON.stringify({
      currentStreak,
      longestStreak,
      lastUpdate: new Date().toISOString()
    }));

    return {
      currentStreak,
      longestStreak,
      totalDays: uniqueDates.length,
      totalSurahs: uniqueSurahs.length
    };
  }, [readingHistory, streakKey]);

  // Get milestone message
  const getMilestoneMessage = (streak) => {
    if (streak >= 30) return { emoji: "🏆", text: language === "id" ? "Luar Biasa! 30 Hari!" : "Amazing! 30 Days!" };
    if (streak >= 21) return { emoji: "🌟", text: language === "id" ? "Fantastis! 21 Hari!" : "Fantastic! 21 Days!" };
    if (streak >= 14) return { emoji: "⭐", text: language === "id" ? "Hebat! 2 Minggu!" : "Great! 2 Weeks!" };
    if (streak >= 7) return { emoji: "🔥", text: language === "id" ? "Konsisten 7 Hari!" : "7 Day Streak!" };
    if (streak >= 3) return { emoji: "✨", text: language === "id" ? "Bagus! 3 Hari!" : "Nice! 3 Days!" };
    return null;
  };

  // Calendar helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = language === "id" 
    ? ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const weekDays = language === "id" 
    ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Check if a day has reading activity
  const hasReadingOnDay = (day) => {
    return readingHistory.some(item => {
      const date = new Date(item.timestamp);
      return date.getDate() === day && 
             date.getMonth() === currentMonth.getMonth() && 
             date.getFullYear() === currentMonth.getFullYear();
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className={`${classes.calendarDay} ${classes.calendarDayEmpty}`} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasReading = hasReadingOnDay(day);
      const today = isToday(day);
      
      days.push(
        <div 
          key={day}
          className={`${classes.calendarDay} ${hasReading ? classes.calendarDayActive : ''} ${today ? classes.calendarDayToday : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Get recent history for display (grouped by date)
  const getGroupedHistory = () => {
    const grouped = {};
    
    readingHistory.forEach(item => {
      const date = new Date(item.timestamp);
      const dateKey = date.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      
      // Avoid duplicates for same surah on same day
      const exists = grouped[dateKey].some(h => h.surahNumber === item.surahNumber);
      if (!exists) {
        grouped[dateKey].push(item);
      }
    });

    return grouped;
  };

  const goToSurah = (surah) => {
    localStorage.setItem("history", JSON.stringify({
      number: surah.surahNumber,
      name: surah.surahName,
      numberOfVerses: surah.numberOfVerses,
      revelation: surah.revelation
    }));
    Router.push(`/surah/${surah.surahNumber}`);
  };

  const clearHistory = () => {
    if (window.confirm(language === "id" ? "Hapus semua riwayat bacaan?" : "Clear all reading history?")) {
      localStorage.removeItem(historyKey);
      setReadingHistory([]);
    }
  };

  const groupedHistory = getGroupedHistory();
  const milestone = getMilestoneMessage(streakData.currentStreak);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <SEO 
        title={t("readingHistory")}
        description="Lihat riwayat bacaan Al-Quran dan tracking streak konsistensi membaca Anda di Maca Quran."
        keywords="riwayat bacaan quran, streak membaca, tracking quran"
        path="/reading-history"
      />
      <Header />
      
      <Typography className={classes.pageTitle}>
        {t("readingHistory")}
      </Typography>
      <Typography className={classes.pageSubtitle}>
        {t("readingHistorySubtitle")}
      </Typography>

      {/* Streak Card */}
      <div className={classes.streakCard}>
        <div className={classes.streakHeader}>
          <div className={classes.streakIconContainer}>
            <span className={classes.fireIcon}>🔥</span>
            <div>
              <Typography className={classes.streakNumber}>
                {streakData.currentStreak}
              </Typography>
              <Typography className={classes.streakLabel}>
                {t("dayStreak")}
              </Typography>
            </div>
          </div>
          <div className={classes.streakBadge}>
            <TrendingUpIcon style={{ fontSize: 16, color: "#fff" }} />
            <Typography className={classes.streakBadgeText}>
              {t("longestStreak")}: {streakData.longestStreak}
            </Typography>
          </div>
        </div>

        {milestone && (
          <div className={classes.milestoneBadge}>
            <span>{milestone.emoji}</span>
            <Typography className={classes.milestoneBadgeText}>
              {milestone.text}
            </Typography>
          </div>
        )}

        <div className={classes.statsRow}>
          <div className={classes.statItem}>
            <Typography className={classes.statNumber}>
              {streakData.totalDays}
            </Typography>
            <Typography className={classes.statLabel}>
              {t("totalDaysRead")}
            </Typography>
          </div>
          <div className={classes.statItem}>
            <Typography className={classes.statNumber}>
              {streakData.totalSurahs}
            </Typography>
            <Typography className={classes.statLabel}>
              {t("surahsRead")}
            </Typography>
          </div>
          <div className={classes.statItem}>
            <Typography className={classes.statNumber}>
              {readingHistory.length}
            </Typography>
            <Typography className={classes.statLabel}>
              {t("totalSessions")}
            </Typography>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className={classes.calendarSection}>
        <div className={classes.calendarHeader}>
          <Typography className={classes.calendarTitle}>
            📅 {t("activityCalendar")}
          </Typography>
          <div className={classes.calendarNav}>
            <IconButton 
              className={classes.navButton}
              onClick={() => navigateMonth(-1)}
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography className={classes.calendarMonthYear}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Typography>
            <IconButton 
              className={classes.navButton}
              onClick={() => navigateMonth(1)}
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>

        <div className={classes.weekDaysRow}>
          {weekDays.map(day => (
            <div key={day} className={classes.weekDay}>{day}</div>
          ))}
        </div>

        <div className={classes.calendarGrid}>
          {renderCalendar()}
        </div>
      </div>

      {/* History Section */}
      <div className={classes.historySection}>
        <div className={classes.historyHeader}>
          <Typography className={classes.historyTitle}>
            📖 {t("recentReadings")}
          </Typography>
        </div>

        <div className={classes.historyList}>
          {Object.keys(groupedHistory).length > 0 ? (
            Object.entries(groupedHistory).slice(0, 10).map(([date, items]) => (
              <React.Fragment key={date}>
                <div className={classes.historyDateHeader}>
                  {date}
                </div>
                {items.map((item, index) => (
                  <div 
                    key={`${item.surahNumber}-${index}`}
                    className={classes.historyItem}
                    onClick={() => goToSurah(item)}
                  >
                    <div className={classes.historyItemIcon}>
                      <Typography className={classes.historyItemNumber}>
                        {item.surahNumber}
                      </Typography>
                    </div>
                    <div className={classes.historyItemContent}>
                      <Typography className={classes.historyItemTitle}>
                        {item.surahName?.transliteration?.id || item.surahName}
                      </Typography>
                      <Typography className={classes.historyItemMeta}>
                        {item.revelation?.id || item.revelation} • {item.numberOfVerses} {t("verses")}
                      </Typography>
                    </div>
                    <Typography className={classes.historyItemArabic}>
                      {item.surahName?.short || ""}
                    </Typography>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className={classes.emptyState}>
              <div className={classes.emptyIcon}>📚</div>
              <Typography className={classes.emptyTitle}>
                {t("noReadingHistory")}
              </Typography>
              <Typography className={classes.emptySubtitle}>
                {t("noReadingHistoryHint")}
              </Typography>
            </div>
          )}
        </div>

        {readingHistory.length > 0 && (
          <div className={classes.clearButton}>
            <Typography 
              className={classes.clearButtonText}
              onClick={clearHistory}
            >
              {t("clearHistory")}
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ReadingHistoryPage;
