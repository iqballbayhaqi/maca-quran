import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AudioPlayer from "react-h5-audio-player";

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
    marginBottom: 10,
  },
  ayatContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
}));

const MenuSurat = ({data, playSound}) => {
  const classes = Styles();
  const [tafsir, setTafsir] = useState(false);

  return (
    <div
      className={data.nomor % 2 === 0 ? classes.ayatContainer : classes.zebra}
      id={data.number.inQuran}
    >
      <Typography variant="h5" className={classes.ar}>
        {data.text.arab}
      </Typography>
      <Typography className={classes.tr} variant="caption">
        <div
          contentEditable="false"
          dangerouslySetInnerHTML={{ __html: data.text.transliteration.en }}
        ></div>
      </Typography>
      <Typography variant="caption" color="primary" style={{ fontWeight: 600 }}>
        Artinya :
      </Typography>
      <br />
      <Typography variant="caption">{data.translation.id}</Typography>
      {tafsir && (
        <>
          <br />
          <Typography
            variant="caption"
            color="primary"
            style={{ fontWeight: 600 }}
          >
            Tafsir :
          </Typography>
          <br />
          <Typography variant="caption">{data.tafsir.id.short}</Typography>
        </>
      )}
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setTafsir(!tafsir)}
        size="small"
      >
        Tafsir
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => playSound(data.number.inSurah - 1)}
        size="small"
      >
        Bunyi
      </Button>
    </div>
  );
};

export default MenuSurat;
