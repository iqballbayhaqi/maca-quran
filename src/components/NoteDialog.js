import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { useLanguage } from "../i18n";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: 16,
      maxWidth: 400,
      width: "100%",
      margin: 16,
    },
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
  },
  titleText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
  },
  closeBtn: {
    color: "#fff",
    padding: 4,
  },
  dialogContent: {
    padding: 16,
  },
  ayatPreview: {
    background: "linear-gradient(135deg, #e8f5e9 0%, #f5f5f5 100%)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  arabicText: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.2rem",
    textAlign: "right",
    direction: "rtl",
    color: "#1b5e20",
    marginBottom: 8,
    lineHeight: 1.8,
  },
  surahInfo: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#666",
    textAlign: "right",
  },
  noteField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      fontFamily: "'El Messiri', sans-serif",
      "&:hover fieldset": {
        borderColor: "#1b5e20",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1b5e20",
      },
    },
    "& .MuiInputBase-input": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "0.95rem",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "0.95rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1b5e20",
    },
  },
  colorSection: {
    marginTop: 16,
  },
  colorLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: 8,
  },
  colorPicker: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 8,
    cursor: "pointer",
    border: "3px solid transparent",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  colorOptionSelected: {
    border: "3px solid #1b5e20",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  noColorOption: {
    background: "#f5f5f5",
    border: "2px dashed #ccc",
    fontSize: "0.7rem",
    color: "#999",
    fontFamily: "'El Messiri', sans-serif",
  },
  dialogActions: {
    padding: "12px 16px",
    gap: 8,
  },
  saveBtn: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 8,
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    padding: "8px 24px",
    "&:hover": {
      background: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
    },
  },
  cancelBtn: {
    fontFamily: "'El Messiri', sans-serif",
    textTransform: "none",
    borderRadius: 8,
    color: "#666",
  },
  deleteBtn: {
    fontFamily: "'El Messiri', sans-serif",
    textTransform: "none",
    borderRadius: 8,
    color: "#d32f2f",
    marginRight: "auto",
  },
}));

// Available highlight colors
const HIGHLIGHT_COLORS = [
  { id: "none", color: null, name: "Tanpa" },
  { id: "yellow", color: "#fff59d", name: "Kuning" },
  { id: "green", color: "#a5d6a7", name: "Hijau" },
  { id: "blue", color: "#90caf9", name: "Biru" },
  { id: "pink", color: "#f48fb1", name: "Pink" },
  { id: "orange", color: "#ffcc80", name: "Oranye" },
  { id: "purple", color: "#ce93d8", name: "Ungu" },
];

const NoteDialog = ({
  open,
  onClose,
  ayatData,
  suratInfo,
  existingNote,
  onSave,
  onDelete,
}) => {
  const classes = useStyles();
  const { t } = useLanguage();
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (existingNote) {
      setNoteText(existingNote.note || "");
      setSelectedColor(existingNote.highlightColor || null);
    } else {
      setNoteText("");
      setSelectedColor(null);
    }
  }, [existingNote, open]);

  const handleSave = () => {
    if (noteText.trim() || selectedColor) {
      onSave({
        ayatId: ayatData.number.inQuran,
        ayatNumber: ayatData.number.inSurah,
        surahNumber: suratInfo.number,
        surahName: suratInfo.name.transliteration.id,
        arabicText: ayatData.text.arab,
        translation: ayatData.translation.id,
        note: noteText.trim(),
        highlightColor: selectedColor,
        createdAt: existingNote?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(t("confirmDeleteNote"))) {
      onDelete(ayatData.number.inQuran);
      onClose();
    }
  };

  // Truncate Arabic text for preview
  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Dialog open={open} onClose={onClose} className={classes.dialog}>
      <Box className={classes.dialogTitle}>
        <Typography className={classes.titleText}>
          {existingNote ? t("editNote") : t("addNote")}
        </Typography>
        <IconButton className={classes.closeBtn} onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent className={classes.dialogContent}>
        {/* Ayat Preview */}
        <Box className={classes.ayatPreview}>
          <Typography className={classes.arabicText}>
            {truncateText(ayatData?.text?.arab || "")}
          </Typography>
          <Typography className={classes.surahInfo}>
            {suratInfo?.name?.transliteration?.id} : {ayatData?.number?.inSurah}
          </Typography>
        </Box>

        {/* Note Text Field */}
        <TextField
          className={classes.noteField}
          label={t("writeYourNote")}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />

        {/* Highlight Color Picker */}
        <Box className={classes.colorSection}>
          <Typography className={classes.colorLabel}>
            {t("highlightColor")}
          </Typography>
          <Box className={classes.colorPicker}>
            {HIGHLIGHT_COLORS.map((colorOpt) => (
              <Box
                key={colorOpt.id}
                className={`${classes.colorOption} ${
                  selectedColor === colorOpt.color
                    ? classes.colorOptionSelected
                    : ""
                } ${colorOpt.id === "none" ? classes.noColorOption : ""}`}
                style={{
                  backgroundColor: colorOpt.color || undefined,
                }}
                onClick={() => setSelectedColor(colorOpt.color)}
              >
                {colorOpt.id === "none" && "✕"}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        {existingNote && (
          <Button
            className={classes.deleteBtn}
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            {t("deleteNote")}
          </Button>
        )}
        <Button className={classes.cancelBtn} onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          className={classes.saveBtn}
          onClick={handleSave}
          disabled={!noteText.trim() && !selectedColor}
        >
          {t("saveNote")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { HIGHLIGHT_COLORS };
export default NoteDialog;
