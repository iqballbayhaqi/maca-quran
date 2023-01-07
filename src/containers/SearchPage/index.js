import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import MenuSurat from "../../components/menuSurat";
import Header from "../../components/header";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

const SearchPage = () => {
  const classes = useStyles();
  const [dataSurat, setDataSurat] = useState();
  const [dataSuratFiltered, setDataSuratFiltered] = useState();

  useEffect(() => {
    // fetch semua surat
    fetch("https://api.quran.gading.dev/surah")
      .then((response) => response.json())
      .then((result) => {
        setDataSurat(result.data);
        setDataSuratFiltered(result.data);
      });
  }, []);

  const searchFiltered = (keyword) => {
    setDataSuratFiltered(
      dataSurat.filter(
        (item) =>
          item.name.transliteration.id
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) !== -1
      )
    );
  };

  return (
    <Container
      maxWidth="xs"
      className={classes.root}
      style={{ height: !dataSuratFiltered && "100vh" }}
    >
      <Header />

      <div style={{ paddingTop: 20 }}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            Cari Surat
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // value={values.amount}
            onChange={(res) => searchFiltered(res.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#b9b3cd" }} />
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
      </div>

      <div style={{ marginTop: 20 }}>
        {dataSuratFiltered ? (
          dataSuratFiltered.map((res) => (
            <MenuSurat key={res.number} data={res} />
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: 150 }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
