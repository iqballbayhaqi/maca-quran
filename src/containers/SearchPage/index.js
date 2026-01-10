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
import { useLanguage } from "../../i18n";

const SearchPage = () => {
  const classes = useStyles();
  const { t } = useLanguage();
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

      <div className={classes.searchContainer}>
        <FormControl fullWidth variant="outlined" className={classes.searchInput}>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t("searchPlaceholder")}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(res) => searchFiltered(res.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>

      <div className={classes.surahListContainer}>
        {dataSuratFiltered ? (
          dataSuratFiltered.map((res) => (
            <MenuSurat key={res.number} data={res} />
          ))
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
