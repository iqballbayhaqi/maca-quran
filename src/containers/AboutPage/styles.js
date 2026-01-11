import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    background: (props) => props.isDarkMode 
      ? "linear-gradient(180deg, #1a2e1a 0%, #121212 100%)"
      : "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingBottom: 40,
    transition: "background 0.3s ease",
  },
  heroSection: {
    textAlign: "center",
    padding: "40px 20px",
    marginTop: 20,
  },
  quranImage: {
    height: 120,
    margin: "auto",
    display: "block",
    filter: (props) => props.isDarkMode 
      ? "drop-shadow(0 10px 30px rgba(76, 175, 80, 0.4))" 
      : "drop-shadow(0 10px 30px rgba(27, 94, 32, 0.3))",
    marginBottom: 24,
  },
  appName: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "2rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 8,
  },
  appTagline: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#4caf50",
    marginBottom: 8,
  },
  arabicText: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.4rem",
    color: (props) => props.isDarkMode ? "#a5d6a7" : "#1b5e20",
    marginTop: 16,
    opacity: 0.8,
  },
  infoCard: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 20,
    padding: "24px",
    margin: "30px 16px",
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  infoTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: 8,
      fontSize: 20,
    },
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: "12px 16px",
    background: (props) => props.isDarkMode 
      ? "rgba(76, 175, 80, 0.08)" 
      : "rgba(27, 94, 32, 0.04)",
    borderRadius: 12,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  infoLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
    minWidth: 90,
  },
  infoValue: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.95rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    flex: 1,
  },
  link: {
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      color: (props) => props.isDarkMode ? "#a5d6a7" : "#2e7d32",
      textDecoration: "underline",
    },
  },
  creatorSection: {
    textAlign: "center",
    marginTop: 30,
    padding: "20px",
  },
  creatorAvatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: (props) => props.isDarkMode 
      ? "0 8px 25px rgba(76, 175, 80, 0.4)" 
      : "0 8px 25px rgba(27, 94, 32, 0.3)",
  },
  creatorInitial: {
    fontFamily: "'Reem Kufi', sans-serif",
    fontSize: "2rem",
    color: "#fff",
    fontWeight: 700,
  },
  creatorName: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.2rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginBottom: 4,
  },
  creatorRole: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    padding: "20px",
    borderTop: (props) => props.isDarkMode 
      ? "1px solid rgba(255, 255, 255, 0.08)" 
      : "1px solid rgba(0, 0, 0, 0.08)",
  },
  footerText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#666" : "#9e9e9e",
  },
  versionBadge: {
    display: "inline-block",
    background: (props) => props.isDarkMode 
      ? "linear-gradient(135deg, #1a3d1a 0%, #2e5d2e 100%)" 
      : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    padding: "6px 16px",
    borderRadius: 20,
    marginTop: 16,
  },
  versionText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.8rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    fontWeight: 600,
  },
}));

export default useStyles;
