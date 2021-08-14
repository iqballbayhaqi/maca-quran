import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const Styles = makeStyles((theme) => ({
    root: {
      padding: "20px 20px 5px 20px",
      borderBottom: `2px solid ${theme.palette.grey.main}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f2f2f2",
      width: "100%"
    },
    ayatContainer: {
        display: "flex",
        alignItems: 'center'
    }
  }));

const menuSurat = (data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Router = useHistory();
    const classes = Styles();
    data = data.data;

    const saveToLocalStorage = () => {
        Router.push(`/surah/${data.nomor}`);
        localStorage.setItem("history", JSON.stringify(data));
    }

    return (
        <Button onClick={saveToLocalStorage} className={classes.root}>
            <div className={classes.ayatContainer}>
                <Typography>{data.nomor}</Typography>
                <div style={{marginLeft: 20}}>
                    <Typography>{data.nama}</Typography>
                    <Typography variant="caption" style={{textTransform: "uppercase"}} >{`${data.type} ${data.ayat} AYAT`}</Typography>
                </div>
            </div>
            <div>
                {/* dalam bahasa arab */}
                <Typography>{data.asma}</Typography>
            </div>
        </Button>
    )
}

export default menuSurat;