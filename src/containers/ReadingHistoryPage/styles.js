import { makeStyles } from "@material-ui/core/styles";

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
  pageTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  pageSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: (props) => props.isDarkMode ? "#a0a0a0" : "#757575",
    textAlign: "center",
    marginBottom: 20,
  },

  // Streak Card
  streakCard: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    borderRadius: 20,
    padding: "24px 20px",
    marginBottom: 20,
    boxShadow: "0 8px 30px rgba(27, 94, 32, 0.3)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -50,
      right: -50,
      width: 150,
      height: 150,
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "50%",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -30,
      left: -30,
      width: 100,
      height: 100,
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "50%",
    },
  },
  streakHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
  },
  streakIconContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  fireIcon: {
    fontSize: "2.5rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
  streakNumber: {
    fontFamily: "'Reem Kufi', sans-serif",
    fontSize: "3rem",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  streakLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
  streakBadge: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  streakBadgeText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#fff",
    fontWeight: 600,
  },

  // Stats Row
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
    position: "relative",
    zIndex: 1,
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontFamily: "'Reem Kufi', sans-serif",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#fff",
  },
  statLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },

  // Calendar Section
  calendarSection: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calendarTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
  },
  calendarNav: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  navButton: {
    padding: 4,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  calendarMonthYear: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    minWidth: 120,
    textAlign: "center",
  },
  weekDaysRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    marginBottom: 8,
  },
  weekDay: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.7rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
    textAlign: "center",
    padding: 4,
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
  },
  calendarDay: {
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(76, 175, 80, 0.15)" 
        : "rgba(27, 94, 32, 0.1)",
    },
  },
  calendarDayActive: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(27, 94, 32, 0.3)",
  },
  calendarDayToday: {
    border: (props) => props.isDarkMode 
      ? "2px solid #81c784" 
      : "2px solid #1b5e20",
    fontWeight: 700,
  },
  calendarDayEmpty: {
    visibility: "hidden",
  },
  calendarDayDisabled: {
    color: (props) => props.isDarkMode ? "#555" : "#ccc",
    cursor: "default",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  // History Section
  historySection: {
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    borderRadius: 20,
    boxShadow: (props) => props.isDarkMode 
      ? "0 4px 20px rgba(0, 0, 0, 0.3)" 
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  historyHeader: {
    padding: "16px 20px",
    borderBottom: (props) => props.isDarkMode 
      ? "1px solid rgba(255, 255, 255, 0.06)" 
      : "1px solid rgba(0, 0, 0, 0.06)",
  },
  historyTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  historyList: {
    maxHeight: 400,
    overflowY: "auto",
  },
  historyDateHeader: {
    padding: "8px 20px",
    backgroundColor: (props) => props.isDarkMode 
      ? "rgba(76, 175, 80, 0.1)" 
      : "rgba(27, 94, 32, 0.04)",
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.8rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    fontWeight: 600,
  },
  historyItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: (props) => props.isDarkMode 
      ? "1px solid rgba(255, 255, 255, 0.04)" 
      : "1px solid rgba(0, 0, 0, 0.04)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: (props) => props.isDarkMode 
        ? "rgba(76, 175, 80, 0.1)" 
        : "rgba(27, 94, 32, 0.04)",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  historyItemIcon: {
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: (props) => props.isDarkMode 
      ? "linear-gradient(135deg, #1a2e1a 0%, #2e7d32 100%)" 
      : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    borderRadius: 12,
    marginRight: 16,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 2,
      background: (props) => props.isDarkMode ? "#252525" : "#fff",
      borderRadius: 10,
    },
  },
  historyItemNumber: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    position: "relative",
    zIndex: 1,
  },
  historyItemContent: {
    flex: 1,
  },
  historyItemTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#212121",
    marginBottom: 2,
  },
  historyItemMeta: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
  },
  historyItemTime: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
    textAlign: "right",
  },
  historyItemArabic: {
    fontFamily: "'Amiri', serif",
    fontSize: "1.3rem",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
    color: (props) => props.isDarkMode ? "#e0e0e0" : "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: (props) => props.isDarkMode ? "#808080" : "#757575",
  },

  // Milestone Badge
  milestoneBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)",
    borderRadius: 20,
    padding: "6px 12px",
    marginTop: 12,
  },
  milestoneBadgeText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#5d4037",
  },

  // Clear History Button
  clearButton: {
    marginTop: 16,
    textAlign: "center",
    paddingBottom: 16,
  },
  clearButtonText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#ef5350",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default useStyles;
