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
    searchContainer: {
      paddingTop: 20,
    },
    searchInput: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 16,
        backgroundColor: (props) => props.isDarkMode ? "#252525" : "#fff",
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        boxShadow: (props) => props.isDarkMode 
          ? "0 4px 15px rgba(0, 0, 0, 0.3)" 
          : "0 4px 15px rgba(0, 0, 0, 0.08)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: (props) => props.isDarkMode 
            ? "0 6px 20px rgba(0, 0, 0, 0.4)" 
            : "0 6px 20px rgba(0, 0, 0, 0.12)",
        },
        "&.Mui-focused": {
          boxShadow: (props) => props.isDarkMode 
            ? "0 6px 25px rgba(76, 175, 80, 0.2)" 
            : "0 6px 25px rgba(27, 94, 32, 0.15)",
        },
        "& fieldset": {
          borderColor: (props) => props.isDarkMode 
            ? "rgba(129, 199, 132, 0.3)" 
            : "rgba(27, 94, 32, 0.2)",
        },
        "&:hover fieldset": {
          borderColor: (props) => props.isDarkMode 
            ? "rgba(129, 199, 132, 0.5)" 
            : "rgba(27, 94, 32, 0.4)",
        },
        "&.Mui-focused fieldset": {
          borderColor: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
        },
      },
      "& .MuiOutlinedInput-input": {
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        padding: "16px 14px",
        color: (props) => props.isDarkMode ? "#e0e0e0" : "inherit",
      },
      "& .MuiInputLabel-root": {
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        color: (props) => props.isDarkMode ? "#808080" : "#757575",
        "&.Mui-focused": {
          color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
        },
      },
    },
    searchIcon: {
      color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    },
    surahListContainer: {
      marginTop: 25,
      background: (props) => props.isDarkMode ? "#252525" : "#fff",
      borderRadius: 24,
      boxShadow: (props) => props.isDarkMode 
        ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
        : "0 4px 20px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      padding: "10px 0",
    },
    loadingContainer: {
      textAlign: "center",
      marginTop: 100,
      "& .MuiCircularProgress-root": {
        color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
      },
    },
    greetingContainer: {
      paddingTop: 20
    },
    lastHistoryContainer: {
      display: "flex",
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      padding: 20,
      borderRadius: 15,
      marginTop: 20
    },
    lastRead: {
      display: "flex",
      alignItems: "center",
      color: "#fff"
    }
  }));

  export default useStyles;
