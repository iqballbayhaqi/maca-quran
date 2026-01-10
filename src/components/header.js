import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Drawer from "./drawer";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  headerWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "linear-gradient(180deg, rgba(232, 245, 233, 1) 0%, rgba(232, 245, 233, 0.95) 80%, rgba(232, 245, 233, 0) 100%)",
    paddingTop: 12,
    paddingBottom: 16,
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: -20,
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
    background: "#fff",
    boxShadow: "0 2px 8px rgba(27, 94, 32, 0.12)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(27, 94, 32, 0.2)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
});

const Header = () => {
  const classes = useStyles();
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
            <MenuRoundedIcon
              style={{
                fontSize: 24,
                color: "#1b5e20",
              }}
            />
          </div>
          <Typography
            variant="h5"
            onClick={() => Router.push("/menu")}
            style={{ 
              cursor: "pointer",
              fontFamily: "'Reem Kufi', 'El Messiri', sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: "1px",
              background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Maca Quran
          </Typography>
          <div 
            className={classes.iconButton}
            onClick={() => Router.push("/search")}
          >
            <SearchRoundedIcon
              style={{
                fontSize: 24,
                color: "#1b5e20",
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
