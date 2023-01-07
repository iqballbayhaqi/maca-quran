import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from "@material-ui/icons/Info";
import HistoryIcon from "@material-ui/icons/History";
import SearchIcon from "@material-ui/icons/Search";
import mosqueImg from "../images/mosque.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  footer: {
    padding: 10,
  },
  header: {
      backgroundImage: `url(${mosqueImg})`,
      height: 150,
      backgroundPosition: "center",
      backgroundSize: "cover"
  }
});

export default function TemporaryDrawer({ isDrawerOpen, isDrawerClose }) {
  const Router = useHistory();
  const classes = useStyles();

  const dataLocal = JSON.parse(localStorage.getItem("history"))

  return (
    <Drawer open={isDrawerOpen} onClose={isDrawerClose}>
      <div>
          <div className={classes.header}>

          </div>
        <List>
          <ListItem button onClick={() => Router.push("/search")}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Cari Surat" />
          </ListItem>
          <ListItem button onClick={() => Router.push(`/surah/${dataLocal.number}`)}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Terakhir Dibaca" />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Surat Favorite" />
          </ListItem> */}
          <ListItem button onClick={() => Router.push("/about")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Tentang" />
          </ListItem>
        </List>
        <Divider />
        <Typography variant="caption" className={classes.footer}>
          Made with ❤️ in Jakarta
        </Typography>
      </div>
    </Drawer>
  );
}
