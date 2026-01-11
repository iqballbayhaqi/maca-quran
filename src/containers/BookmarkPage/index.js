import React, { useState, useEffect } from "react";
import { Container, Typography, Box, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../../components/header";
import useStyles from "./styles";
import { useLanguage } from "../../i18n";
import { TajwidText } from "../../tajwid";
import SEO from "../../components/SEO";
import { useThemeContext } from "../../theme";

const BookmarkPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const Router = useHistory();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("surat");
  const [bookmarksSurat, setBookmarksSurat] = useState([]);
  const [bookmarksAyat, setBookmarksAyat] = useState([]);

  // Get current user name for bookmark keys
  const userName = localStorage.getItem("nama") || "default";
  const bookmarkSuratKey = `bookmarks_surat_${userName}`;
  const bookmarkAyatKey = `bookmarks_ayat_${userName}`;

  useEffect(() => {
    loadBookmarks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const loadBookmarks = () => {
    const savedSurat = localStorage.getItem(bookmarkSuratKey);
    const savedAyat = localStorage.getItem(bookmarkAyatKey);
    
    if (savedSurat) {
      setBookmarksSurat(JSON.parse(savedSurat));
    } else {
      setBookmarksSurat([]);
    }
    if (savedAyat) {
      setBookmarksAyat(JSON.parse(savedAyat));
    } else {
      setBookmarksAyat([]);
    }
  };

  const removeSuratBookmark = (suratNumber, e) => {
    e.stopPropagation();
    const updated = bookmarksSurat.filter((s) => s.number !== suratNumber);
    setBookmarksSurat(updated);
    localStorage.setItem(bookmarkSuratKey, JSON.stringify(updated));
  };

  const removeAyatBookmark = (ayatId, e) => {
    e.stopPropagation();
    const updated = bookmarksAyat.filter((a) => a.number.inQuran !== ayatId);
    setBookmarksAyat(updated);
    localStorage.setItem(bookmarkAyatKey, JSON.stringify(updated));
  };

  const goToSurat = (surat) => {
    localStorage.setItem("history", JSON.stringify(surat));
    Router.push(`/surah/${surat.number}`);
  };

  const goToAyat = (ayat) => {
    localStorage.setItem("history", JSON.stringify(ayat.suratInfo));
    Router.push(`/surah/${ayat.suratInfo.number}?ayat=${ayat.number.inSurah}`);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <SEO 
        title="Bookmark Saya"
        description="Kelola bookmark surah dan ayat Al-Quran favorit Anda. Simpan ayat-ayat penting untuk dibaca kembali di Maca Quran."
        keywords="bookmark quran, simpan ayat, ayat favorit, surah tersimpan"
        path="/bookmark"
      />
      <Header />
      
      <Typography className={classes.pageTitle}>
        {t("myBookmark")}
      </Typography>
      <Typography className={classes.pageSubtitle}>
        {t("bookmarkSubtitle")}
      </Typography>

      {/* Tabs */}
      <div className={classes.tabsContainer}>
        <button
          className={`${classes.tab} ${activeTab === "surat" ? classes.tabActive : ""}`}
          onClick={() => setActiveTab("surat")}
        >
          {t("surah")}
          <span className={`${classes.tabCount} ${activeTab === "surat" ? classes.tabCountActive : ""}`}>
            {bookmarksSurat.length}
          </span>
        </button>
        <button
          className={`${classes.tab} ${activeTab === "ayat" ? classes.tabActive : ""}`}
          onClick={() => setActiveTab("ayat")}
        >
          {t("ayat")}
          <span className={`${classes.tabCount} ${activeTab === "ayat" ? classes.tabCountActive : ""}`}>
            {bookmarksAyat.length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className={classes.bookmarkListContainer}>
        {activeTab === "surat" ? (
          bookmarksSurat.length > 0 ? (
            bookmarksSurat.map((surat) => (
              <div
                key={surat.number}
                className={classes.bookmarkSuratItem}
                onClick={() => goToSurat(surat)}
              >
                <div className={classes.suratInfo}>
                  <Box className={classes.numberBadge}>
                    <Typography className={classes.numberText}>
                      {surat.number}
                    </Typography>
                  </Box>
                  <div className={classes.suratDetails}>
                    <Typography className={classes.suratName}>
                      {surat.name.transliteration.id}
                    </Typography>
                    <Typography className={classes.suratMeta}>
                      {surat.revelation.id} • {surat.numberOfVerses} {t("ayat")}
                    </Typography>
                  </div>
                </div>
                <div className={classes.suratActions}>
                  <Typography className={classes.arabicName}>
                    {surat.name.short}
                  </Typography>
                  <IconButton
                    className={classes.deleteBtn}
                    onClick={(e) => removeSuratBookmark(surat.number, e)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.emptyState}>
              <div className={classes.emptyIcon}>📑</div>
              <Typography className={classes.emptyTitle}>
                {t("noSurahBookmark")}
              </Typography>
              <Typography className={classes.emptySubtitle}>
                {t("noSurahBookmarkHint")}
              </Typography>
            </div>
          )
        ) : (
          bookmarksAyat.length > 0 ? (
            bookmarksAyat.map((ayat) => (
              <div
                key={ayat.number.inQuran}
                className={classes.bookmarkAyatItem}
                onClick={() => goToAyat(ayat)}
              >
                <div className={classes.ayatHeader}>
                  <div className={classes.ayatBadge}>
                    <Box className={classes.ayatNumberBadge}>
                      <Typography className={classes.ayatNumberText}>
                        {ayat.number.inSurah}
                      </Typography>
                    </Box>
                    <Typography className={classes.ayatSuratName}>
                      {ayat.suratInfo.name.transliteration.id}
                    </Typography>
                  </div>
                  <IconButton
                    className={classes.deleteBtn}
                    onClick={(e) => removeAyatBookmark(ayat.number.inQuran, e)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography className={classes.arabicText}>
                  <TajwidText text={ayat.text.arab} />
                </Typography>
                <Typography className={classes.translationText}>
                  {ayat.translation.id}
                </Typography>
              </div>
            ))
          ) : (
            <div className={classes.emptyState}>
              <div className={classes.emptyIcon}>📝</div>
              <Typography className={classes.emptyTitle}>
                {t("noAyatBookmark")}
              </Typography>
              <Typography className={classes.emptySubtitle}>
                {t("noAyatBookmarkHint")}
              </Typography>
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default BookmarkPage;
