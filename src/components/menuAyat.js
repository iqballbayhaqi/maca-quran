import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Styles = makeStyles((theme) => ({
  ar: {
    textAlign: "right",
  },
  tr: {
    textAlign: "right",
  },
  zebra: {
    backgroundColor: "#dfdfdf",
    padding: 10,
    borderRadius: 10,
  },
  ayatContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
}));

const menuSurat = (data) => {
  const classes = Styles();
  data = data.data;

  return (
    <div
      className={data.nomor % 2 === 0 ? classes.ayatContainer : classes.zebra}
    >
      <Typography variant="h5" className={classes.ar}>
        {data.ar}
      </Typography>
      <Typography className={classes.tr} variant="caption">
        <div
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: data.tr }}
        ></div>
      </Typography>
      <Typography variant="caption" color="primary">Artinya :</Typography>
      <br />
      <Typography variant="caption">{data.id}</Typography>
    </div>
  );
};

export default menuSurat;
