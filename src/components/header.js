import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Drawer from "./drawer";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SearchIcon from "@material-ui/icons/Search";
import theme from "../theme";
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
          <ShortTextIcon
            style={{
              fontSize: 40,
              color: theme.palette.grey.main,
              cursor: "pointer",
            }}
            onClick={() => setIsDrawerOpen(true)}
          />
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
          <SearchIcon
            style={{
              fontSize: 40,
              color: theme.palette.grey.main,
              cursor: "pointer",
            }}
            onClick={() => Router.push("/search")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
