import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Drawer from "./drawer";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useHistory } from "react-router-dom";
import { useThemeContext } from "../theme";

const useStyles = makeStyles({
  headerWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: (props) => props.isDarkMode 
      ? "linear-gradient(180deg, rgba(26, 46, 26, 1) 0%, rgba(26, 46, 26, 0.95) 80%, rgba(26, 46, 26, 0) 100%)"
      : "linear-gradient(180deg, rgba(232, 245, 233, 1) 0%, rgba(232, 245, 233, 0.95) 80%, rgba(232, 245, 233, 0) 100%)",
    paddingTop: 12,
    paddingBottom: 16,
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: -20,
    width: "calc(100% + 32px)",
    boxSizing: "border-box",
    transition: "background 0.3s ease",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: (props) => props.isDarkMode ? "#252525" : "#fff",
    boxShadow: (props) => props.isDarkMode 
      ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
      : "0 2px 8px rgba(27, 94, 32, 0.12)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: (props) => props.isDarkMode 
        ? "0 4px 12px rgba(0, 0, 0, 0.4)" 
        : "0 4px 12px rgba(27, 94, 32, 0.2)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
  iconColor: {
    fontSize: 24,
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
  titleText: {
    cursor: "pointer",
    fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "1px",
    color: (props) => props.isDarkMode ? "#81c784" : "#1b5e20",
  },
});

const Header = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Fragment>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        isDrawerClose={() => setIsDrawerOpen(false)}
      />

      <div className={classes.headerWrapper}>
        <div className={classes.headerContainer}>
          <div 
            className={classes.iconButton}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuRoundedIcon className={classes.iconColor} />
          </div>
          <Typography
            variant="h5"
            onClick={() => Router.push("/menu")}
            className={classes.titleText}
          >
            Maca Quran
          </Typography>
          <div 
            className={classes.iconButton}
            onClick={() => Router.push("/search")}
          >
            <SearchRoundedIcon className={classes.iconColor} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
