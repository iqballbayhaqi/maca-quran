import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Switch, Collapse } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import HistoryIcon from "@material-ui/icons/History";
import SearchIcon from "@material-ui/icons/Search";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LanguageIcon from "@material-ui/icons/Language";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SchoolIcon from "@material-ui/icons/School";
import Flag from "react-world-flags";
import mosqueImg from "../images/mosque.jpg";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../i18n";
import { useTajwid, TAJWID_LEGEND } from "../tajwid";

const useStyles = makeStyles({
  drawerPaper: {
    width: 280,
    background: "linear-gradient(180deg, #f8faf8 0%, #ffffff 100%)",
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

export default function TemporaryDrawer({ isDrawerOpen, isDrawerClose }) {
  const Router = useHistory();
  const classes = useStyles();
  const { t, language, toggleLanguage } = useLanguage();
  const { tajwidEnabled, toggleTajwid } = useTajwid();
  const [showLegend, setShowLegend] = useState(false);

  const dataLocal = JSON.parse(localStorage.getItem("history"));

  const handleNavigation = (path) => {
    Router.push(path);
    isDrawerClose();
  };

  return (
    <Drawer 
      open={isDrawerOpen} 
      onClose={isDrawerClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        {/* Header */}
        <div className={classes.header}>
          <Typography className={classes.arabicDecor}>﷽</Typography>
          <MenuBookIcon className={classes.headerIcon} />
          <Typography className={classes.headerTitle}>
            {t("appName")}
          </Typography>
          <Typography className={classes.headerSubtitle}>
            {t("drawerSubtitle")}
          </Typography>
        </div>

        {/* Menu Items */}
        <List className={classes.menuList}>
          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/search")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={t("searchSurah")} className={classes.menuText} />
          </ListItem>

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/bookmark")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={t("bookmark")} className={classes.menuText} />
          </ListItem>

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/daily-ayat")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <WbSunnyIcon />
            </ListItemIcon>
            <ListItemText primary={t("dailyAyat")} className={classes.menuText} />
          </ListItem>

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/memorization")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={t("memorizationMode")} className={classes.menuText} />
          </ListItem>

          {dataLocal && (
            <ListItem 
              button 
              className={classes.menuItem}
              onClick={() => handleNavigation(`/surah/${dataLocal.number}`)}
            >
              <ListItemIcon className={classes.menuIcon}>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={t("lastRead")} className={classes.menuText} />
            </ListItem>
          )}

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/about")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t("about")} className={classes.menuText} />
          </ListItem>

          {/* Tajwid Color Toggle */}
          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => setShowLegend(!showLegend)}
          >
            <ListItemIcon className={classes.menuIcon}>
              <ColorLensIcon />
            </ListItemIcon>
            <ListItemText 
              primary={t("tajwidColor")} 
              secondary={tajwidEnabled ? t("tajwidOn") : t("tajwidOff")}
              className={classes.menuText} 
            />
            <Switch
              checked={tajwidEnabled}
              onChange={(e) => {
                e.stopPropagation();
                toggleTajwid();
              }}
              onClick={(e) => e.stopPropagation()}
              size="small"
              color="primary"
            />
            <ExpandMoreIcon 
              className={`${classes.expandIcon} ${showLegend ? classes.expandIconOpen : ''}`}
            />
          </ListItem>

          {/* Tajwid Legend */}
          <Collapse in={showLegend}>
            <div className={classes.legendContainer}>
              <Typography className={classes.legendTitle}>
                {t("tajwidLegend")}
              </Typography>
              <div className={classes.legendGrid}>
                {TAJWID_LEGEND.map((item) => (
                  <div key={item.id} className={classes.legendItem}>
                    <div 
                      className={classes.legendColor}
                      style={{ backgroundColor: item.color }}
                    />
                    <Typography className={classes.legendLabel}>
                      {language === "id" ? item.name : item.nameEn}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </Collapse>

          {/* Language Switcher */}
          <ListItem 
            button 
            className={classes.menuItem}
            onClick={toggleLanguage}
          >
            <ListItemIcon className={classes.menuIcon}>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText 
              primary={t("language")} 
              secondary={
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Flag code={language === "id" ? "ID" : "GB"} className={classes.flagIcon} />
                  {language === "id" ? "Indonesia" : "English"}
                </span>
              }
              className={classes.menuText} 
            />
          </ListItem>
        </List>

        {/* Footer */}
        <div className={classes.footer}>
          <Typography className={classes.footerText}>
            {t("madeWith")}
          </Typography>
        </div>
      </Box>
    </Drawer>
  );
}
