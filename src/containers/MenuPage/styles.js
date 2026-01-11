import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/background.jpg";

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
  greetingContainer: {
    paddingTop: 20,
  },
  greetingText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    marginBottom: 4,
  },
  nameText: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  lastHistoryContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: `linear-gradient(135deg, rgba(21, 101, 192, 0.85) 0%, rgba(13, 71, 161, 0.9) 100%), url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "24px 20px",
    borderRadius: 20,
    marginTop: 20,
    cursor: "pointer",
    boxShadow: "0 10px 40px rgba(21, 101, 192, 0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 15px 50px rgba(21, 101, 192, 0.4)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
    "&:hover::before": {
      transform: "translateX(100%)",
    },
  },
  lastRead: {
    display: "flex",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "'El Messiri', sans-serif",
    "& svg": {
      fontSize: 18,
      marginRight: 8,
    },
    "& span": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "0.85rem",
    },
  },
  // Quick Access Shortcuts
  shortcutContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginTop: 20,
  },
  shortcutItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    padding: "12px 4px",
    borderRadius: 16,
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: (props) => props.isDarkMode 
        ? "0 6px 20px rgba(0, 0, 0, 0.4)" 
        : "0 6px 20px rgba(0, 0, 0, 0.12)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
  shortcutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    "& svg": {
      fontSize: 22,
    },
  },
  shortcutLabel: {
    fontFamily: "'El Messiri', sans-serif !important",
    fontSize: "0.7rem !important",
    fontWeight: "600 !important",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#424242",
    textAlign: "center",
    lineHeight: "1.2 !important",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  surahListContainer: {
    marginTop: 25,
    background: (props) => props.isDarkMode ? "#1e1e1e" : "#fff",
    borderRadius: 24,
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    padding: "10px 0",
  },
  viewToggleContainer: {
    marginTop: 20,
    display: "flex",
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 16,
    padding: 4,
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  viewToggleButton: {
    flex: 1,
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px !important",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "'El Messiri', sans-serif !important",
    fontSize: "0.95rem !important",
    fontWeight: "600 !important",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    transition: "all 0.3s ease",
    textTransform: "none !important",
    "&:hover": {
      color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
      background: (props) => props.isDarkMode 
        ? "rgba(76, 175, 80, 0.1)" 
        : "rgba(27, 94, 32, 0.05)",
    },
  },
  viewToggleButtonActive: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%) !important",
    color: "#fff !important",
    boxShadow: "0 4px 12px rgba(27, 94, 32, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%) !important",
      color: "#fff !important",
    },
  },
  juzHeader: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%)",
    padding: "14px 20px",
    margin: "0",
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    boxShadow: "0 4px 15px rgba(27, 94, 32, 0.3)",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
    letterSpacing: "0.5px",
    // Decorative borders
    borderTop: "3px solid rgba(255,215,0,0.6)",
    borderBottom: "3px solid rgba(255,215,0,0.6)",
    // Decorative pattern overlay
    backgroundImage: `
      linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.03) 10px,
        rgba(255,255,255,0.03) 20px
      )
    `,
    // Ornamental pseudo elements
    "&::before": {
      content: '"✦"',
      fontSize: "0.9rem",
      opacity: 0.8,
      color: "rgba(255,215,0,0.9)",
    },
    "&::after": {
      content: '"✦"',
      fontSize: "0.9rem",
      opacity: 0.8,
      color: "rgba(255,215,0,0.9)",
    },
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: 100,
    "& .MuiCircularProgress-root": {
      color: "#1b5e20",
    },
  },
}));

export default useStyles;
