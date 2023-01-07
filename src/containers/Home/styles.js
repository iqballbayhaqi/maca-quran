import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#f2f2f2",
      height: "100%",
    },
    title: {
      color: "#017901",
      fontWeight: "bold",
      marginTop: 50,
      marginBottom: 25,
    },
    captionTitle: {
      color: "#08820d",
      textAlign: "center",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 50px",
    },
    illustrationContainer: {
      backgroundColor: "#017901",
      height: 400,
      marginTop: 50,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundPositionX: -50
    },
    quranImage: {
      height: 200,
    },
    btnGetStarted: {
      color: "#fff"
    },
    btnGetStartedContainer: {
      textAlign: 'center'
    }
  }));

  export default useStyles;