import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
      background: "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
      minHeight: "100vh",
      paddingTop: 20,
      paddingBottom: 30,
    },
    searchContainer: {
      paddingTop: 20,
    },
    searchInput: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 16,
        backgroundColor: "#fff",
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
        },
        "&.Mui-focused": {
          boxShadow: "0 6px 25px rgba(27, 94, 32, 0.15)",
        },
        "& fieldset": {
          borderColor: "rgba(27, 94, 32, 0.2)",
        },
        "&:hover fieldset": {
          borderColor: "rgba(27, 94, 32, 0.4)",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#1b5e20",
        },
      },
      "& .MuiOutlinedInput-input": {
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        padding: "16px 14px",
      },
      "& .MuiInputLabel-root": {
        fontFamily: "'El Messiri', sans-serif",
        fontSize: "1rem",
        color: "#757575",
        "&.Mui-focused": {
          color: "#1b5e20",
        },
      },
    },
    searchIcon: {
      color: "#1b5e20",
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