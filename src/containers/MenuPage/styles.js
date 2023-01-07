import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f2f2f2",
    // height: "100%",
    paddingTop: 20,
  },
  greetingContainer: {
    paddingTop: 20,
  },
  lastHistoryContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    cursor: "pointer",
  },
  lastRead: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
}));

export default useStyles;
