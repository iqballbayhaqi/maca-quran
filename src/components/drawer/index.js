import React, { useState } from "react";
import { Typography, Box, Switch, Collapse } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import SearchIcon from "@material-ui/icons/Search";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import NoteIcon from "@material-ui/icons/Note";
import LanguageIcon from "@material-ui/icons/Language";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SchoolIcon from "@material-ui/icons/School";
import GetAppIcon from "@material-ui/icons/GetApp";
import Flag from "react-world-flags";
import { useHistory } from "react-router-dom";
import { useLanguage } from "../../i18n";
import { useTajwid, TAJWID_LEGEND } from "../../tajwid";
import { useThemeContext } from "../../theme";
import useStyles from "./styles";

export default function TemporaryDrawer({ isDrawerOpen, isDrawerClose }) {
  const Router = useHistory();
  const { t, language, toggleLanguage } = useLanguage();
  const { tajwidEnabled, toggleTajwid } = useTajwid();
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
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

        {/* Scrollable Menu Container */}
        <div className={classes.scrollContainer}>
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
            onClick={() => handleNavigation("/notes")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary={t("notes")} className={classes.menuText} />
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

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/reading-history")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary={t("readingHistory")} className={classes.menuText} />
          </ListItem>

          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/daily-target")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <TrackChangesIcon />
            </ListItemIcon>
            <ListItemText primary={t("dailyTarget")} className={classes.menuText} />
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

          {/* Dark Mode Toggle */}
          <ListItem 
            button 
            className={classes.menuItem}
            onClick={toggleDarkMode}
          >
            <ListItemIcon className={classes.menuIcon}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText 
              primary={t("darkMode")} 
              secondary={isDarkMode ? t("darkModeOn") : t("darkModeOff")}
              className={classes.menuText} 
            />
            <Switch
              checked={isDarkMode}
              onChange={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              onClick={(e) => e.stopPropagation()}
              size="small"
              color="primary"
            />
          </ListItem>

          {/* Install Tutorial */}
          <ListItem 
            button 
            className={classes.menuItem}
            onClick={() => handleNavigation("/install")}
          >
            <ListItemIcon className={classes.menuIcon}>
              <GetAppIcon />
            </ListItemIcon>
            <ListItemText primary={t("installTutorial")} className={classes.menuText} />
          </ListItem>

          {/* About */}
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
        </List>
        </div>

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
