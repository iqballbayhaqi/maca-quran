import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.isDarkMode 
      ? "linear-gradient(180deg, #1a2e1a 0%, #121212 100%)"
      : "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingTop: 20,
    paddingBottom: 30,
    transition: "background 0.3s ease",
  },
  pageTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  pageSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    display: "flex",
    gap: 10,
    padding: "0 4px",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: "16px 12px",
    borderRadius: 12,
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    textAlign: "center",
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  statNumber: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  statLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
    marginTop: 4,
  },
  notesListContainer: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 20,
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    padding: 10,
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
  },
  // Note Item
  noteItem: {
    padding: 16,
    margin: "8px 0",
    borderRadius: 16,
    backgroundColor: (props) => props.isDarkMode ? "#1e1e1e" : "#fafafa",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      boxShadow: (props) => props.isDarkMode 
        ? "0 4px 15px rgba(0, 0, 0, 0.4)" 
        : "0 4px 15px rgba(0, 0, 0, 0.1)",
    },
  },
  highlightBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  noteHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  noteBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  ayatNumberBadge: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    borderRadius: 8,
  },
  ayatNumberText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "0.8rem",
    color: "#fff",
  },
  suratName: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  noteActions: {
    display: "flex",
    gap: 4,
  },
  actionBtn: {
    padding: 6,
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(255, 255, 255, 0.08)" 
        : "rgba(0, 0, 0, 0.04)",
    },
  },
  editBtn: {
    color: (props) => props.isDarkMode ? "#ce93d8" : "#9c27b0",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(206, 147, 216, 0.15)" 
        : "rgba(156, 39, 176, 0.1)",
    },
  },
  deleteBtn: {
    color: "#ef5350",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(239, 83, 80, 0.15)" 
        : "rgba(239, 83, 80, 0.1)",
    },
  },
  arabicText: {
    textAlign: "right",
    fontFamily: "'Amiri', serif",
    fontSize: "1.3rem",
    lineHeight: 1.8,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 8,
    direction: "rtl",
  },
  translationText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.8rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#666",
    lineHeight: 1.5,
    marginBottom: 10,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  noteContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "10px 12px",
    background: (props) => props.isDarkMode 
      ? "rgba(206, 147, 216, 0.1)" 
      : "rgba(156, 39, 176, 0.08)",
    borderRadius: 8,
    borderLeft: (props) => props.isDarkMode 
      ? "3px solid #ce93d8" 
      : "3px solid #9c27b0",
  },
  noteIcon: {
    color: (props) => props.isDarkMode ? "#ce93d8" : "#9c27b0",
    fontSize: "1rem",
    marginTop: 2,
    flexShrink: 0,
  },
  noteText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    lineHeight: 1.5,
    flex: 1,
  },
  noteDate: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.7rem",
    color: (props) => props.isDarkMode ? "#666" : "#999",
    marginTop: 8,
    textAlign: "right",
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    marginLeft: 8,
  },
  snackbar: {
    "& .MuiSnackbarContent-root": {
      fontFamily: "'El Messiri', sans-serif",
      borderRadius: 8,
      backgroundColor: (props) => props.isDarkMode ? "#2e7d32" : "#1b5e20",
    },
  },
}));

export default useStyles;
