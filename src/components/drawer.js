import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
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
import Flag from "react-world-flags";
import mosqueImg from "../images/mosque.jpg";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../i18n";

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
});

export default function TemporaryDrawer({ isDrawerOpen, isDrawerClose }) {
  const Router = useHistory();
  const classes = useStyles();
  const { t, language, toggleLanguage } = useLanguage();

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
