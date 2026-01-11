import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.isDarkMode 
      ? "linear-gradient(180deg, #1a2e1a 0%, #121212 100%)"
      : "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingTop: 20,
    paddingBottom: 140,
    transition: "background 0.3s ease",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookmarkSuratBtn: {
    position: "absolute",
    top: 8,
    left: 8,
    color: "rgba(255, 255, 255, 0.9)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 8,
    zIndex: 2,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    "& svg": {
      fontSize: "1.3rem",
    },
  },
  headSurah: {
    textAlign: "center",
    padding: "24px 20px",
    marginBottom: 10,
    marginTop: 20,
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(27, 94, 32, 0.3)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      opacity: 0.5,
    },
    "&::after": {
      content: '"﷽"',
      position: "absolute",
      top: 8,
      right: 16,
      fontFamily: "'Amiri', serif",
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.3)",
    },
  },
  surahName: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#fff",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    position: "relative",
    zIndex: 1,
  },
  surahArabic: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 8,
  },
  surahTranslation: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.95rem",
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 6,
    position: "relative",
    zIndex: 1,
  },
  surahMeta: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginTop: 12,
    position: "relative",
    zIndex: 1,
  },
  metaBadge: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "4px 12px",
    borderRadius: 20,
    backdropFilter: "blur(4px)",
  },
  audioPlayerContainer: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 32px)",
    maxWidth: 412,
    padding: "12px 16px",
    background: (props) => props.isDarkMode 
      ? "linear-gradient(180deg, rgba(37, 37, 37, 0.95) 0%, rgba(30, 30, 30, 0.98) 100%)"
      : "linear-gradient(180deg, rgba(232, 245, 233, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
    backdropFilter: "blur(10px)",
    boxShadow: (props) => props.isDarkMode 
      ? "0 -4px 30px rgba(0, 0, 0, 0.4)"
      : "0 -4px 30px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    boxSizing: "border-box",
    "& .rhap_container": {
      borderRadius: 16,
      boxShadow: (props) => props.isDarkMode 
        ? "0 2px 12px rgba(0, 0, 0, 0.3)"
        : "0 2px 12px rgba(0, 0, 0, 0.08)",
      background: (props) => props.isDarkMode ? "#1e1e1e" : "#fff",
      padding: "8px 12px",
    },
    "& .rhap_main-controls-button": {
      color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_progress-filled": {
      backgroundColor: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_progress-indicator": {
      backgroundColor: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_button-clear": {
      color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_volume-indicator": {
      backgroundColor: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_volume-filled": {
      backgroundColor: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_time": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "0.8rem",
      color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    "& .rhap_progress-bar": {
      background: (props) => props.isDarkMode ? "#333" : "#e0e0e0",
    },
    "& .rhap_volume-bar": {
      background: (props) => props.isDarkMode ? "#333" : "#e0e0e0",
    },
  },
  ayatListContainer: {
    marginTop: 10,
    padding: "0 8px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingBottom: 60,
  },
  loadingCard: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 16,
    padding: "24px 40px",
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
  },
  loadingIcon: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: (props) => props.isDarkMode 
      ? "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)"
      : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
    position: "relative",
  },
  loadingSpinner: {
    color: (props) => props.isDarkMode ? "#81c784 !important" : "#1b5e20 !important",
  },
  loadingArabic: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.3rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 6,
  },
  loadingText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    marginBottom: 4,
  },
  loadingDots: {
    display: "flex",
    justifyContent: "center",
    gap: 4,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    animation: "$bounce 1.4s infinite ease-in-out both",
    "&:nth-child(1)": {
      animationDelay: "-0.32s",
    },
    "&:nth-child(2)": {
      animationDelay: "-0.16s",
    },
    "&:nth-child(3)": {
      animationDelay: "0s",
    },
  },
  "@keyframes bounce": {
    "0%, 80%, 100%": {
      transform: "scale(0)",
    },
    "40%": {
      transform: "scale(1)",
    },
  },
}));

export default useStyles;
