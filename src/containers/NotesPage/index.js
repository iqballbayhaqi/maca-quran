import React, { useState, useEffect } from "react";
import { Container, Typography, Box, IconButton, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import NoteIcon from "@material-ui/icons/Note";
import Header from "../../components/header";
import useStyles from "./styles";
import { useLanguage } from "../../i18n";
import { TajwidText } from "../../tajwid";
import SEO from "../../components/SEO";
import NoteDialog from "../../components/NoteDialog";
import { useThemeContext } from "../../theme";

const NotesPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t } = useLanguage();
  const [notes, setNotes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Get current user name for note keys
  const userName = localStorage.getItem("nama") || "default";
  const notesKey = `ayat_notes_${userName}`;

  useEffect(() => {
    loadNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const loadNotes = () => {
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      // Sort by updatedAt (newest first)
      parsedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setNotes(parsedNotes);
    } else {
      setNotes([]);
    }
  };

  const handleDeleteNote = (ayatId, e) => {
    e.stopPropagation();
    if (window.confirm(t("confirmDeleteNote"))) {
      const updated = notes.filter((n) => n.ayatId !== ayatId);
      setNotes(updated);
      localStorage.setItem(notesKey, JSON.stringify(updated));
      setSnackbarMessage(t("noteDeleted"));
      setSnackbarOpen(true);
    }
  };

  const handleEditNote = (note, e) => {
    e.stopPropagation();
    setEditingNote(note);
    setEditDialogOpen(true);
  };

  const handleSaveNote = (noteData) => {
    const existingIndex = notes.findIndex((n) => n.ayatId === noteData.ayatId);
    let updatedNotes = [...notes];
    if (existingIndex >= 0) {
      updatedNotes[existingIndex] = noteData;
    } else {
      updatedNotes.push(noteData);
    }
    // Sort by updatedAt (newest first)
    updatedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setNotes(updatedNotes);
    localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
    setSnackbarMessage(t("noteSaved"));
    setSnackbarOpen(true);
    setEditDialogOpen(false);
  };

  const handleDeleteNoteFromDialog = (ayatId) => {
    const updated = notes.filter((n) => n.ayatId !== ayatId);
    setNotes(updated);
    localStorage.setItem(notesKey, JSON.stringify(updated));
    setSnackbarMessage(t("noteDeleted"));
    setSnackbarOpen(true);
  };

  const goToAyat = (note) => {
    // Build suratInfo object for the destination page
    const suratInfo = {
      number: note.surahNumber,
      name: {
        transliteration: { id: note.surahName },
        translation: { id: note.surahName },
        short: ""
      },
      numberOfVerses: 0,
      revelation: { id: "" }
    };
    localStorage.setItem("history", JSON.stringify(suratInfo));
    Router.push(`/surah/${note.surahNumber}?ayat=${note.ayatNumber}`);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Truncate text
  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Count notes with highlights
  const highlightedCount = notes.filter((n) => n.highlightColor).length;

  return (
    <Container maxWidth="xs" className={classes.root}>
      <SEO 
        title="Catatan Saya"
        description="Kelola catatan pribadi dan highlight ayat Al-Quran favorit Anda. Simpan pemikiran dan refleksi Anda di Maca Quran."
        keywords="catatan quran, highlight ayat, catatan pribadi, refleksi quran"
        path="/notes"
      />
      <Header />
      
      <Typography className={classes.pageTitle}>
        {t("myNotes")}
      </Typography>
      <Typography className={classes.pageSubtitle}>
        {t("notesSubtitle")}
      </Typography>

      {/* Stats */}
      <div className={classes.statsContainer}>
        <div className={classes.statCard}>
          <Typography className={classes.statNumber}>
            {notes.length}
          </Typography>
          <Typography className={classes.statLabel}>
            {t("notes")}
          </Typography>
        </div>
        <div className={classes.statCard}>
          <Typography className={classes.statNumber}>
            {highlightedCount}
          </Typography>
          <Typography className={classes.statLabel}>
            Highlighted
          </Typography>
        </div>
      </div>

      {/* Notes List */}
      <div className={classes.notesListContainer}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.ayatId}
              className={classes.noteItem}
              onClick={() => goToAyat(note)}
              style={note.highlightColor ? {
                background: `linear-gradient(135deg, ${note.highlightColor}30 0%, ${note.highlightColor}10 100%)`,
              } : {}}
            >
              {/* Highlight Border */}
              {note.highlightColor && (
                <div 
                  className={classes.highlightBorder} 
                  style={{ backgroundColor: note.highlightColor }}
                />
              )}

              {/* Header */}
              <div className={classes.noteHeader}>
                <div className={classes.noteBadge}>
                  <Box className={classes.ayatNumberBadge}>
                    <Typography className={classes.ayatNumberText}>
                      {note.ayatNumber}
                    </Typography>
                  </Box>
                  <Typography className={classes.suratName}>
                    {note.surahName}
                  </Typography>
                  {note.highlightColor && (
                    <div 
                      className={classes.colorDot}
                      style={{ backgroundColor: note.highlightColor }}
                    />
                  )}
                </div>
                <div className={classes.noteActions}>
                  <IconButton
                    className={`${classes.actionBtn} ${classes.editBtn}`}
                    onClick={(e) => handleEditNote(note, e)}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    className={`${classes.actionBtn} ${classes.deleteBtn}`}
                    onClick={(e) => handleDeleteNote(note.ayatId, e)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>

              {/* Arabic Text */}
              <Typography className={classes.arabicText}>
                <TajwidText text={truncateText(note.arabicText, 100)} />
              </Typography>

              {/* Translation */}
              <Typography className={classes.translationText}>
                {note.translation}
              </Typography>

              {/* Note Content */}
              {note.note && (
                <Box className={classes.noteContent}>
                  <NoteIcon className={classes.noteIcon} />
                  <Typography className={classes.noteText}>
                    {note.note}
                  </Typography>
                </Box>
              )}

              {/* Date */}
              <Typography className={classes.noteDate}>
                {formatDate(note.updatedAt)}
              </Typography>
            </div>
          ))
        ) : (
          <div className={classes.emptyState}>
            <div className={classes.emptyIcon}>📝</div>
            <Typography className={classes.emptyTitle}>
              {t("noNotes")}
            </Typography>
            <Typography className={classes.emptySubtitle}>
              {t("noNotesHint")}
            </Typography>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {editingNote && (
        <NoteDialog
          open={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            setEditingNote(null);
          }}
          ayatData={{
            number: {
              inQuran: editingNote.ayatId,
              inSurah: editingNote.ayatNumber
            },
            text: {
              arab: editingNote.arabicText
            },
            translation: {
              id: editingNote.translation
            }
          }}
          suratInfo={{
            number: editingNote.surahNumber,
            name: {
              transliteration: { id: editingNote.surahName }
            }
          }}
          existingNote={editingNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNoteFromDialog}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default NotesPage;
