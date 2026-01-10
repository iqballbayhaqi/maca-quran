import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    minHeight: "100vh",
    paddingTop: 20,
    paddingBottom: 30,
  },
  pageTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1b5e20",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  pageSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: "#757575",
    textAlign: "center",
    marginBottom: 20,
  },

  // Setup Card (when no target)
  setupCard: {
    background: "#fff",
    borderRadius: 24,
    padding: "40px 24px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  setupIcon: {
    fontSize: "4rem",
    marginBottom: 16,
  },
  setupTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.3rem",
    color: "#1b5e20",
    marginBottom: 8,
  },
  setupSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: "#757575",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  setupButton: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "12px 32px",
    borderRadius: 12,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(27, 94, 32, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #145218 0%, #256b29 100%)",
    },
  },

  // Completed Card
  completedCard: {
    background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    borderRadius: 24,
    padding: "40px 24px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  completedIcon: {
    marginBottom: 16,
  },
  completedTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1b5e20",
    marginBottom: 8,
  },
  completedSubtitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.95rem",
    color: "#2e7d32",
    marginBottom: 24,
    lineHeight: 1.6,
  },

  // Progress Card
  progressCard: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    borderRadius: 24,
    padding: "24px 20px",
    marginBottom: 16,
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
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    position: "relative",
    zIndex: 1,
  },
  progressLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  progressTarget: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.3rem",
    color: "#fff",
  },
  editButton: {
    color: "rgba(255, 255, 255, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },

  // Main Progress Circle
  mainProgress: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
    zIndex: 1,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid rgba(255, 255, 255, 0.3)",
  },
  progressPercent: {
    fontFamily: "'Reem Kufi', sans-serif",
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },
  progressJuz: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },

  // Progress Bar
  progressBarContainer: {
    position: "relative",
    marginBottom: 20,
    zIndex: 1,
  },
  progressBarLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressBarLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  progressBarValue: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#fff",
    fontWeight: 600,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  progressBarFill: {
    borderRadius: 6,
    background: "linear-gradient(90deg, #81c784 0%, #a5d6a7 100%)",
  },
  expectedMarker: {
    position: "absolute",
    bottom: -20,
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  expectedLine: {
    width: 2,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginBottom: 2,
  },
  expectedLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.7rem",
    color: "rgba(255, 255, 255, 0.7)",
    whiteSpace: "nowrap",
  },

  // Status Badge
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: "8px 16px",
    marginTop: 16,
    position: "relative",
    zIndex: 1,
  },
  statusText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
  },
  statValue: {
    fontFamily: "'Reem Kufi', sans-serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#1b5e20",
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#757575",
    marginTop: 4,
  },

  // Timeline Card
  timelineCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
  },
  timelineTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#333",
    marginBottom: 16,
  },
  timelineRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timelineItem: {
    flex: 1,
    textAlign: "center",
  },
  timelineLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#757575",
    marginBottom: 4,
  },
  timelineValue: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: "#1b5e20",
    fontWeight: 600,
  },
  timelineArrow: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "1.5rem",
    color: "#c8e6c9",
    margin: "0 12px",
  },

  // Tips Card
  tipsCard: {
    background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  tipsTitle: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#f57c00",
    marginBottom: 8,
  },
  tipsText: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.85rem",
    color: "#5d4037",
    lineHeight: 1.6,
  },

  // Action Buttons
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 8,
  },
  readNowButton: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "14px 24px",
    borderRadius: 12,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(27, 94, 32, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #145218 0%, #256b29 100%)",
    },
  },
  resetButton: {
    borderColor: "#ef5350",
    color: "#ef5350",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "12px 24px",
    borderRadius: 12,
    textTransform: "none",
    "&:hover": {
      borderColor: "#d32f2f",
      backgroundColor: "rgba(239, 83, 80, 0.04)",
    },
  },

  // Dialog
  dialogPaper: {
    borderRadius: 20,
    padding: "8px 0",
  },
  dialogTitle: {
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.3rem",
    color: "#1b5e20",
    textAlign: "center",
    paddingBottom: 8,
  },
  dialogContent: {
    padding: "8px 24px 24px",
  },
  dialogLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.9rem",
    color: "#333",
    fontWeight: 600,
    marginBottom: 8,
    marginTop: 16,
    "&:first-child": {
      marginTop: 0,
    },
  },
  dialogField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      fontFamily: "'El Messiri', sans-serif",
    },
    "& .MuiSelect-select": {
      fontFamily: "'El Messiri', sans-serif",
    },
  },
  dialogActions: {
    padding: "8px 24px 16px",
    justifyContent: "center",
    gap: 12,
  },
  dialogCancelButton: {
    fontFamily: "'El Messiri', sans-serif",
    color: "#757575",
    textTransform: "none",
    padding: "10px 24px",
    borderRadius: 10,
  },
  dialogConfirmButton: {
    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    color: "#fff",
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    textTransform: "none",
    padding: "10px 24px",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(27, 94, 32, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #145218 0%, #256b29 100%)",
    },
  },

  // Enhanced Preset Menu
  menuPaper: {
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
    marginTop: 4,
  },
  presetMenuItem: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s ease",
    "&:last-child": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "rgba(27, 94, 32, 0.08)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(27, 94, 32, 0.12)",
      "&:hover": {
        backgroundColor: "rgba(27, 94, 32, 0.16)",
      },
    },
  },
  presetItemContent: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  presetIcon: {
    fontSize: "1.5rem",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(27, 94, 32, 0.08)",
    borderRadius: 10,
    flexShrink: 0,
  },
  presetInfo: {
    flex: 1,
    minWidth: 0,
  },
  presetMainRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  presetLabel: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#1b5e20",
  },
  presetDuration: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#fff",
    backgroundColor: "#1b5e20",
    padding: "2px 8px",
    borderRadius: 10,
    fontWeight: 500,
  },
  presetDesc: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#757575",
    lineHeight: 1.3,
  },
  presetBadge: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.65rem",
    padding: "4px 8px",
    borderRadius: 6,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    flexShrink: 0,
  },
  badgeIntensive: {
    backgroundColor: "#ffebee",
    color: "#c62828",
  },
  badgeModerate: {
    backgroundColor: "#fff3e0",
    color: "#e65100",
  },
  badgeRelaxed: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
}));

export default useStyles;
