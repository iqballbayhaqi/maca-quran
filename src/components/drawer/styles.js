import { makeStyles } from "@material-ui/core/styles";
import mosqueImg from "../../images/mosque.jpg";

const useStyles = makeStyles({
  drawerPaper: {
    width: 280,
    background: "linear-gradient(180deg, #f8faf8 0%, #ffffff 100%)",
    // Custom scrollbar styles
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(27, 94, 32, 0.05)",
      borderRadius: 3,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg, #81c784 0%, #4caf50 100%)",
      borderRadius: 3,
      "&:hover": {
        background: "linear-gradient(180deg, #66bb6a 0%, #43a047 100%)",
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#4caf50 rgba(27, 94, 32, 0.05)",
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    // Custom scrollbar for scroll container
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg, #a5d6a7 0%, #81c784 100%)",
      borderRadius: 3,
      "&:hover": {
        background: "linear-gradient(180deg, #81c784 0%, #66bb6a 100%)",
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#81c784 transparent",
    // Smooth scroll
    scrollBehavior: "smooth",
  },
  header: {
    backgroundImage: `linear-gradient(180deg, rgba(27, 94, 32, 0.85) 0%, rgba(21, 101, 50, 0.9) 100%), url(${mosqueImg})`,
    height: 180,
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "20px",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 30,
      background: "linear-gradient(180deg, transparent 0%, rgba(248, 250, 248, 0.3) 100%)",
    },
  },
  headerIcon: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 40,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#fff",
    letterSpacing: "1px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  headerSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 4,
  },
  menuList: {
    padding: "16px 12px",
  },
  menuItem: {
    borderRadius: 12,
    marginBottom: 8,
    padding: "12px 16px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(27, 94, 32, 0.08)",
    },
  },
  menuIcon: {
    color: "#1b5e20",
    minWidth: 44,
    "& svg": {
      fontSize: 24,
    },
  },
  menuText: {
    "& .MuiListItemText-primary": {
      fontFamily: "'El Messiri', sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      color: "#333",
    },
    "& .MuiListItemText-secondary": {
      fontFamily: "'El Messiri', sans-serif",
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
  },
  flagIcon: {
    width: 20,
    height: 14,
    borderRadius: 2,
    objectFit: "cover",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  footer: {
    padding: "20px",
    marginTop: "auto",
    borderTop: "1px solid rgba(0, 0, 0, 0.08)",
    textAlign: "center",
  },
  footerText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.8rem",
    color: "#757575",
  },
  arabicDecor: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    top: 16,
    right: 16,
  },
  // Tajwid styles
  tajwidSwitch: {
    marginLeft: "auto",
  },
  tajwidSwitchTrack: {
    backgroundColor: "#ccc",
  },
  tajwidSwitchChecked: {
    color: "#1b5e20 !important",
    "& + $tajwidSwitchTrack": {
      backgroundColor: "#4caf50 !important",
    },
  },
  legendContainer: {
    padding: "8px 16px 16px 16px",
    backgroundColor: "rgba(27, 94, 32, 0.04)",
    borderRadius: 8,
    margin: "0 12px 8px 12px",
  },
  legendTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: "#1b5e20",
    marginBottom: 8,
  },
  legendGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px 12px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 3,
    flexShrink: 0,
  },
  legendLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.7rem",
    color: "#555",
    lineHeight: 1.2,
  },
  expandIcon: {
    marginLeft: "auto",
    transition: "transform 0.2s ease",
    color: "#757575",
    fontSize: 20,
  },
  expandIconOpen: {
    transform: "rotate(180deg)",
  },
});

export default useStyles;
