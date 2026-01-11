import React, { useState, useEffect } from "react";
import { Typography, Box, IconButton, Collapse, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareIcon from "@material-ui/icons/Share";
import NoteIcon from "@material-ui/icons/Note";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useLanguage } from "../i18n";
import { TajwidText } from "../tajwid";
import { useHistory } from "react-router-dom";
import NoteDialog from "./NoteDialog";
import { useThemeContext } from "../theme";

const Styles = makeStyles((theme) => ({
  ayatCard: {
    backgroundColor: (props) => props.isDarkMode ? "#252525" : "#fff",
    padding: "16px",
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },
  ayatCardActive: {
    background: (props) => props.isDarkMode 
      ? "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)"
      : "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)",
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
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    backgroundColor: (props) => props.isDarkMode 
      ? "rgba(76, 175, 80, 0.15)" 
      : "rgba(27, 94, 32, 0.08)",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(76, 175, 80, 0.25)" 
        : "rgba(27, 94, 32, 0.15)",
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
  noteBtn: {
    color: "#9c27b0",
    backgroundColor: "rgba(156, 39, 176, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(156, 39, 176, 0.15)",
    },
  },
  noteBtnActive: {
    color: "#9c27b0",
    backgroundColor: "rgba(156, 39, 176, 0.2)",
  },
  shareBtn: {
    color: "#4caf50",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
  },
  expandBtn: {
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    backgroundColor: (props) => props.isDarkMode 
      ? "rgba(255, 255, 255, 0.08)" 
      : "rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(255, 255, 255, 0.15)" 
        : "rgba(0, 0, 0, 0.08)",
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
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 8,
    direction: "rtl",
  },
  // Translation (always visible, compact)
  translationText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => props.isDarkMode ? "#b0b0b0" : "#555",
    lineHeight: 1.5,
  },
  // Expanded content
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: (props) => props.isDarkMode 
      ? "1px dashed rgba(255,255,255,0.1)" 
      : "1px dashed rgba(0,0,0,0.1)",
  },
  transliteration: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#888",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "right",
    direction: "rtl",
  },
  sectionLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
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
    color: (props) => props.isDarkMode ? "#b0b0b0" : "#666",
    lineHeight: 1.6,
    padding: "10px 12px",
    background: (props) => props.isDarkMode 
      ? "rgba(76, 175, 80, 0.1)" 
      : "rgba(27, 94, 32, 0.04)",
    borderRadius: 8,
    borderLeft: (props) => props.isDarkMode 
      ? "3px solid #81c784" 
      : "3px solid #1b5e20",
  },
  // Note indicator
  noteIndicator: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 12,
    padding: "10px 12px",
    background: (props) => props.isDarkMode 
      ? "rgba(156, 39, 176, 0.15)" 
      : "rgba(156, 39, 176, 0.08)",
    borderRadius: 8,
    borderLeft: "3px solid #9c27b0",
  },
  noteIndicatorIcon: {
    color: "#9c27b0",
    fontSize: "1rem",
    marginTop: 2,
  },
  noteIndicatorText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#b0b0b0" : "#666",
    lineHeight: 1.5,
    flex: 1,
  },
  snackbar: {
    "& .MuiSnackbarContent-root": {
      fontFamily: "'El Messiri', sans-serif",
      borderRadius: 8,
      backgroundColor: (props) => props.isDarkMode ? "#2e7d32" : "#1b5e20",
    },
  },
}));

// Convert number to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
};

const MenuAyat = ({data, playSound, isActive, suratInfo}) => {
  const { t } = useLanguage();
  const { isDarkMode } = useThemeContext();
  const classes = Styles({ isDarkMode });
  const Router = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;
  const notesKey = `ayat_notes_${userName}`;

  useEffect(() => {
    // Check if this ayat is bookmarked
    const savedBookmarks = localStorage.getItem(bookmarkAyatKey);
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      const found = bookmarks.some((b) => b.number.inQuran === data.number.inQuran);
      setIsBookmarked(found);
    }

    // Check if this ayat has a note
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      const foundNote = notes.find((n) => n.ayatId === data.number.inQuran);
      setCurrentNote(foundNote || null);
    }
  }, [data.number.inQuran, bookmarkAyatKey, notesKey]);

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

  // Handle save note
  const handleSaveNote = (noteData) => {
    const savedNotes = localStorage.getItem(notesKey);
    let notes = savedNotes ? JSON.parse(savedNotes) : [];

    // Check if note already exists
    const existingIndex = notes.findIndex((n) => n.ayatId === noteData.ayatId);
    if (existingIndex >= 0) {
      notes[existingIndex] = noteData;
    } else {
      notes.push(noteData);
    }

    localStorage.setItem(notesKey, JSON.stringify(notes));
    setCurrentNote(noteData);
    setSnackbarMessage(t("noteSaved"));
    setSnackbarOpen(true);
  };

  // Handle delete note
  const handleDeleteNote = (ayatId) => {
    const savedNotes = localStorage.getItem(notesKey);
    let notes = savedNotes ? JSON.parse(savedNotes) : [];
    notes = notes.filter((n) => n.ayatId !== ayatId);
    localStorage.setItem(notesKey, JSON.stringify(notes));
    setCurrentNote(null);
    setSnackbarMessage(t("noteDeleted"));
    setSnackbarOpen(true);
  };

  // Get highlight style
  const getHighlightStyle = () => {
    if (currentNote?.highlightColor) {
      return {
        background: `linear-gradient(135deg, ${currentNote.highlightColor}40 0%, ${currentNote.highlightColor}20 100%)`,
        borderLeft: `4px solid ${currentNote.highlightColor}`,
      };
    }
    return {};
  };

  return (
    <div 
      className={`${classes.ayatCard} ${isActive ? classes.ayatCardActive : ''}`} 
      id={data.number.inQuran}
      style={getHighlightStyle()}
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
            className={`${classes.iconBtn} ${classes.noteBtn} ${currentNote ? classes.noteBtnActive : ''}`}
            onClick={() => setNoteDialogOpen(true)}
            size="small"
            title={currentNote ? t("editNote") : t("addNote")}
          >
            {currentNote ? <NoteIcon fontSize="small" /> : <NoteAddIcon fontSize="small" />}
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

      {/* Note indicator */}
      {currentNote?.note && (
        <Box className={classes.noteIndicator} onClick={() => setNoteDialogOpen(true)} style={{ cursor: "pointer" }}>
          <NoteIcon className={classes.noteIndicatorIcon} />
          <Typography className={classes.noteIndicatorText}>
            {currentNote.note}
          </Typography>
        </Box>
      )}

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

      {/* Note Dialog */}
      <NoteDialog
        open={noteDialogOpen}
        onClose={() => setNoteDialogOpen(false)}
        ayatData={data}
        suratInfo={suratInfo}
        existingNote={currentNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default MenuAyat;
