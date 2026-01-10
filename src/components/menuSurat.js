import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const Styles = makeStyles((theme) => ({
  root: {
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    width: "100%",
    transition: "all 0.2s ease",
    borderRadius: 12,
    margin: "2px 0",
    "&:hover": {
      backgroundColor: "rgba(27, 94, 32, 0.06)",
    },
  },
  ayatContainer: {
    display: "flex",
    alignItems: "center",
  },
  numberBadge: {
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    borderRadius: 12,
    marginRight: 16,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 2,
      background: "#fff",
      borderRadius: 10,
    },
  },
  numberText: {
    fontFamily: "'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#1b5e20",
    position: "relative",
    zIndex: 1,
  },
  surahInfo: {
    textAlign: "left",
  },
  surahName: {
    fontFamily: "'El Messiri', 'Reem Kufi', sans-serif",
    fontWeight: 600,
    fontSize: "1.1rem",
    color: "#212121",
    textTransform: "none",
    lineHeight: 1.3,
  },
  surahMeta: {
    fontFamily: "'El Messiri', sans-serif",
    fontSize: "0.75rem",
    color: "#757575",
    textTransform: "none",
    marginTop: 2,
  },
  arabicName: {
    fontFamily: "'Amiri', 'Reem Kufi', serif",
    fontSize: "1.4rem",
    color: "#1b5e20",
    fontWeight: 400,
  },
}));

const MenuSurat = ({ data, ayatRange }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Router = useHistory();
  const classes = Styles();

  const saveToLocalStorage = () => {
    Router.push(`/surah/${data.number}`);
    localStorage.setItem("history", JSON.stringify(data));
  };

  // Determine what to show for ayat info
  const getAyatInfo = () => {
    if (ayatRange) {
      // Show ayat range for juz view
      return `${data.revelation.id} • Ayat ${ayatRange.start}-${ayatRange.end}`;
    }
    // Show total ayat for normal view
    return `${data.revelation.id} • ${data.numberOfVerses} Ayat`;
  };

  return (
    <Button onClick={saveToLocalStorage} className={classes.root}>
      <div className={classes.ayatContainer}>
        <Box className={classes.numberBadge}>
          <Typography className={classes.numberText}>{data.number}</Typography>
        </Box>
        <div className={classes.surahInfo}>
          <Typography className={classes.surahName}>
            {data.name.transliteration.id}
          </Typography>
          <Typography className={classes.surahMeta}>
            {getAyatInfo()}
          </Typography>
        </div>
      </div>
      <div>
        <Typography className={classes.arabicName}>{data.name.short}</Typography>
      </div>
    </Button>
  );
};

export default MenuSurat;
