import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    background: (props) =>
      props.isDarkMode
        ? "linear-gradient(180deg, #1a2e1a 0%, #121212 100%)"
        : "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingBottom: 40,
    transition: "background 0.3s ease",
  },
  heroSection: {
    textAlign: "center",
    padding: "30px 20px",
    marginTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: (props) =>
      props.isDarkMode
        ? "0 8px 25px rgba(76, 175, 80, 0.4)"
        : "0 8px 25px rgba(27, 94, 32, 0.3)",
  },
  heroIcon: {
    fontSize: 40,
    color: "#fff",
  },
  title: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.6rem",
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.95rem",
    color: (props) => (props.isDarkMode ? "#a5d6a7" : "#4caf50"),
    lineHeight: 1.5,
  },
  installButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "0 16px 20px",
  },
  installButton: {
    background: "linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "14px 32px",
    fontSize: "1rem",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(27, 94, 32, 0.4)",
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: 300,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(27, 94, 32, 0.5)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  installedBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: (props) =>
      props.isDarkMode
        ? "linear-gradient(135deg, #1a3d1a 0%, #2e5d2e 100%)"
        : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    padding: "12px 20px",
    borderRadius: 12,
    margin: "0 16px 20px",
  },
  installedIcon: {
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    marginRight: 8,
    fontSize: 24,
  },
  installedText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
  },
  benefitsCard: {
    background: (props) => (props.isDarkMode ? "#252525" : "#fff"),
    borderRadius: 20,
    padding: "20px",
    margin: "0 16px 20px",
    boxShadow: (props) =>
      props.isDarkMode
        ? "0 4px 20px rgba(0, 0, 0, 0.3)"
        : "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  benefitsTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    marginBottom: 16,
    textAlign: "center",
  },
  benefitsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    background: (props) =>
      props.isDarkMode
        ? "rgba(76, 175, 80, 0.08)"
        : "rgba(27, 94, 32, 0.04)",
    borderRadius: 10,
  },
  benefitIcon: {
    color: "#4caf50",
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => (props.isDarkMode ? "#e0e0e0" : "#333"),
  },
  tutorialCard: {
    background: (props) => (props.isDarkMode ? "#252525" : "#fff"),
    borderRadius: 20,
    margin: "0 16px 16px",
    boxShadow: (props) =>
      props.isDarkMode
        ? "0 4px 20px rgba(0, 0, 0, 0.3)"
        : "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  tutorialHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    cursor: "pointer",
    transition: "background 0.2s ease",
    "&:hover": {
      background: (props) =>
        props.isDarkMode
          ? "rgba(76, 175, 80, 0.05)"
          : "rgba(27, 94, 32, 0.02)",
    },
  },
  platformIcon: {
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    fontSize: 28,
    marginRight: 12,
  },
  platformTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1.05rem",
    color: (props) => (props.isDarkMode ? "#e0e0e0" : "#333"),
  },
  expandIcon: {
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    transition: "transform 0.3s ease",
  },
  expandIconRotated: {
    transform: "rotate(180deg)",
  },
  stepsContainer: {
    padding: "0 20px 20px",
  },
  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 16,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "0.85rem",
    marginRight: 12,
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    background: (props) =>
      props.isDarkMode
        ? "rgba(76, 175, 80, 0.08)"
        : "rgba(27, 94, 32, 0.04)",
    borderRadius: 12,
    padding: "12px 14px",
  },
  stepIconContainer: {
    color: (props) => (props.isDarkMode ? "#81c784" : "#1b5e20"),
    marginRight: 10,
    "& svg": {
      fontSize: 22,
    },
  },
  stepText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => (props.isDarkMode ? "#e0e0e0" : "#333"),
    lineHeight: 1.5,
    flex: 1,
  },
  noteSection: {
    margin: "10px 16px 20px",
    padding: "16px",
    background: (props) =>
      props.isDarkMode
        ? "rgba(255, 193, 7, 0.1)"
        : "rgba(255, 193, 7, 0.15)",
    borderRadius: 12,
    borderLeft: "4px solid #ffc107",
  },
  noteText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => (props.isDarkMode ? "#e0e0e0" : "#666"),
    lineHeight: 1.6,
  },
}));

export default useStyles;
