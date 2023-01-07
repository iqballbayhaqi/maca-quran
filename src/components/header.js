import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Drawer from "./drawer";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SearchIcon from "@material-ui/icons/Search";
import theme from "../theme";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
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
          color="primary"
          variant="h5"
          onClick={() => Router.push("/menu")}
          style={{ cursor: "pointer" }}
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
    </Fragment>
  );
};

export default Header;
