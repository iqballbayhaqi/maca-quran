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
  tabsContainer: {
    display: "flex",
    gap: 10,
    padding: "0 4px",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      background: (props) => props.isDarkMode ? "#303030" : "#f5f5f5",
    },
  },
  tabActive: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(27, 94, 32, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    },
  },
  tabCount: {
    marginLeft: 8,
    padding: "2px 8px",
    borderRadius: 10,
    fontSize: "0.75rem",
    background: (props) => props.isDarkMode 
      ? "rgba(255, 255, 255, 0.1)" 
      : "rgba(0, 0, 0, 0.08)",
  },
  tabCountActive: {
    background: "rgba(255, 255, 255, 0.25)",
  },
  bookmarkListContainer: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 20,
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    padding: "10px 0",
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
  // Bookmark Surat Item
  bookmarkSuratItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: 12,
    margin: "2px 8px",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(76, 175, 80, 0.1)" 
        : "rgba(27, 94, 32, 0.06)",
    },
  },
  suratInfo: {
    display: "flex",
    alignItems: "center",
  },
  numberBadge: {
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: (props) => props.isDarkMode 
      ? "linear-gradient(135deg, #1a2e1a 0%, #2e7d32 100%)" 
      : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    borderRadius: 12,
    marginRight: 16,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 2,
      background: (props) => props.isDarkMode ? "#252525" : "#fff",
      borderRadius: 10,
    },
  },
  numberText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    position: "relative",
    zIndex: 1,
  },
  suratDetails: {
    textAlign: "left",
  },
  suratName: {
    fontFamily: "'El Messiri', 'Reem Kufi', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#212121",
  },
  suratMeta: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
    marginTop: 2,
  },
  suratActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  arabicName: {
    fontFamily: "'Amiri', 'Reem Kufi', serif",
    fontSize: "1.4rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginRight: 8,
  },
  deleteBtn: {
    color: "#ef5350",
    padding: 8,
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(239, 83, 80, 0.15)" 
        : "rgba(239, 83, 80, 0.1)",
    },
  },
  // Bookmark Ayat Item
  bookmarkAyatItem: {
    padding: "16px",
    margin: "8px",
    borderRadius: 16,
    backgroundColor: (props) => props.isDarkMode ? "#1e1e1e" : "#fff",
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: (props) => props.isDarkMode 
        ? "0 4px 15px rgba(0, 0, 0, 0.4)" 
        : "0 4px 15px rgba(0, 0, 0, 0.1)",
    },
  },
  ayatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ayatBadge: {
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
  ayatSuratName: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  arabicText: {
    textAlign: "right",
    fontFamily: "'Amiri', serif",
    fontSize: "1.4rem",
    lineHeight: 2,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 8,
    direction: "rtl",
  },
  translationText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#555",
    lineHeight: 1.5,
  },
}));

export default useStyles;
