import React, { useState, useEffect } from "react";
import { Typography, Box, IconButton, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareIcon from "@material-ui/icons/Share";
import { useLanguage } from "../i18n";
import { TajwidText } from "../tajwid";
import { useHistory } from "react-router-dom";

const Styles = makeStyles((theme) => ({
  ayatCard: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },
  ayatCardActive: {
    background: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)",
    border: "2px solid #2e7d32",
    boxShadow: "0 6px 25px rgba(27, 94, 32, 0.3)",
    transform: "scale(0.98)",
  },
  // Header row: number + actions
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ayatNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    borderRadius: 8,
  },
  ayatNumberText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "0.85rem",
    color: "#fff",
  },
  actionButtons: {
    display: "flex",
    gap: 4,
  },
  iconBtn: {
    padding: 8,
    color: "#1b5e20",
    backgroundColor: "rgba(27, 94, 32, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(27, 94, 32, 0.15)",
    },
  },
  playBtn: {
    color: "#ff9800",
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 152, 0, 0.2)",
    },
  },
  bookmarkBtn: {
    color: "#1976d2",
    backgroundColor: "rgba(25, 118, 210, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.15)",
    },
  },
  bookmarkBtnActive: {
    color: "#1976d2",
    backgroundColor: "rgba(25, 118, 210, 0.2)",
  },
  shareBtn: {
    color: "#4caf50",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
  },
  expandBtn: {
    color: "#757575",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  expandBtnOpen: {
    transform: "rotate(180deg)",
  },
  // Arabic text
  arabicText: {
    textAlign: "right",
    fontFamily: "'Amiri', serif",
    fontSize: "1.6rem",
    lineHeight: 2,
    color: "#1b5e20",
    marginBottom: 8,
    direction: "rtl",
  },
  // Translation (always visible, compact)
  translationText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: "#555",
    lineHeight: 1.5,
  },
  // Expanded content
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px dashed rgba(0,0,0,0.1)",
  },
  transliteration: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#888",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "right",
    direction: "rtl",
  },
  sectionLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "#1b5e20",
    marginBottom: 4,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: 14,
      marginRight: 4,
    },
  },
  tafsirText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#666",
    lineHeight: 1.6,
    padding: "10px 12px",
    background: "rgba(27, 94, 32, 0.04)",
    borderRadius: 8,
    borderLeft: "3px solid #1b5e20",
  },
}));

// Convert number to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
};

const MenuAyat = ({data, playSound, isActive, suratInfo}) => {
  const classes = Styles();
  const { t } = useLanguage();
  const Router = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;

  useEffect(() => {
    // Check if this ayat is bookmarked
    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      const found = bookmarks.some((b) => b.number.inQuran === data.number.inQuran);
      setIsBookmarked(found);
    }
  }, [data.number.inQuran, bookmarkAyatKey]);

  const toggleBookmark = () => {
    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

    if (isBookmarked) {
      // Remove from bookmarks
      bookmarks = bookmarks.filter((b) => b.number.inQuran !== data.number.inQuran);
    } else {
      // Add to bookmarks with surat info
      bookmarks.push({
        ...data,
        suratInfo: suratInfo,
      });
    }

    localStorage.setItem(bookmarkAyatKey, JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Navigate to share ayat page
  const handleShareAyat = () => {
    // Save ayat data to localStorage for share page
    const shareData = {
      ayat: data,
      surahInfo: suratInfo,
    };
    localStorage.setItem("share_ayat_data", JSON.stringify(shareData));
    Router.push("/share-ayat");
  };

  return (
    <div 
      className={`${classes.ayatCard} ${isActive ? classes.ayatCardActive : ''}`} 
      id={data.number.inQuran}
    >
      {/* Header: Number + Action Buttons */}
      <Box className={classes.headerRow}>
        <Box className={classes.ayatNumber}>
          <Typography className={classes.ayatNumberText}>
            {toArabicNumeral(data.number.inSurah)}
          </Typography>
        </Box>
        <Box className={classes.actionButtons}>
          <IconButton 
            className={`${classes.iconBtn} ${classes.bookmarkBtn} ${isBookmarked ? classes.bookmarkBtnActive : ''}`}
            onClick={toggleBookmark}
            size="small"
          >
            {isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
          </IconButton>
          <IconButton 
            className={`${classes.iconBtn} ${classes.shareBtn}`}
            onClick={handleShareAyat}
            size="small"
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton 
            className={`${classes.iconBtn} ${classes.playBtn}`}
            onClick={() => playSound(data.number.inSurah - 1)}
            size="small"
          >
            <VolumeUpIcon fontSize="small" />
          </IconButton>
          <IconButton 
            className={`${classes.iconBtn} ${classes.expandBtn} ${expanded ? classes.expandBtnOpen : ''}`}
            onClick={() => setExpanded(!expanded)}
            size="small"
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Arabic Text */}
      <Typography className={classes.arabicText}>
        <TajwidText text={data.text.arab} />
      </Typography>

      {/* Translation (always visible) */}
      <Typography className={classes.translationText}>
        {data.translation.id}
      </Typography>

      {/* Expanded Content: Transliteration + Tafsir */}
      <Collapse in={expanded}>
        <div className={classes.expandedContent}>
          {/* Transliteration */}
          <Typography className={classes.sectionLabel}>
            {t("transliteration")}
          </Typography>
          <Typography className={classes.transliteration}>
            <span
              dangerouslySetInnerHTML={{ __html: data.text.transliteration.en }}
            />
          </Typography>

          {/* Tafsir */}
          <Typography className={classes.sectionLabel}>
            <MenuBookIcon /> {t("tafsir")}
          </Typography>
          <Typography className={classes.tafsirText}>
            {data.tafsir.id.short}
          </Typography>
        </div>
      </Collapse>
    </div>
  );
};

export default MenuAyat;
