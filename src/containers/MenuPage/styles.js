import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingTop: 20,
    paddingBottom: 30,
  },
  greetingContainer: {
    paddingTop: 20,
    "& h5:first-child": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      color: "#757575",
      marginBottom: 4,
    },
    "& h5:last-child": {
      fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "#1b5e20",
      background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
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
  },
  surahListContainer: {
    marginTop: 25,
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    padding: "10px 0",
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
