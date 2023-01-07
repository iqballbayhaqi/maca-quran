import { makeStyles } from "@material-ui/core/styles";
import frame from "../../images/frame.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f2f2f2",
    // height: "100%",
    paddingTop: 20,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    paddingTop: 20,
  },
  lastHistoryContainer: {
    display: "flex",
    background:
      "linear-gradient(337deg, rgba(1,121,1,1) 21%, rgba(255,255,255,1) 100%)",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  lastRead: {
    display: "flex",
    alignItems: "center",
  },
  headSurah: {
    textAlign: "center",
    padding: "20px 10px",
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    marginBottom: 20,
    marginTop: 20
  },
}));

export default useStyles;
