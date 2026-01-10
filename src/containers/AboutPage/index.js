import React from "react";
import { Container, Typography, Link, Box } from "@material-ui/core";
import useStyles from "./styles";
import Header from "../../components/header";
import quranImage from "../../images/quran.png";
import InfoIcon from "@material-ui/icons/Info";
import GitHubIcon from "@material-ui/icons/GitHub";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useLanguage } from "../../i18n";

const AboutPage = () => {
  const classes = useStyles();
  const { t } = useLanguage();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Header />

      {/* Hero Section */}
      <div className={classes.heroSection}>
        <img src={quranImage} className={classes.quranImage} alt="quran" />
        <Typography className={classes.appName}>
          {t("appName")}
        </Typography>
        <Typography className={classes.appTagline}>
          {t("aboutTagline")}
        </Typography>
        <Typography className={classes.arabicText}>
          ﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴾
        </Typography>
        <div className={classes.versionBadge}>
          <Typography className={classes.versionText}>
            Version 1.0.0
          </Typography>
        </div>
      </div>

      {/* Info Card */}
      <div className={classes.infoCard}>
        <Typography className={classes.infoTitle}>
          <InfoIcon /> {t("appInfo")}
        </Typography>
        
        <div className={classes.infoItem}>
          <Typography className={classes.infoLabel}>{t("name")}</Typography>
          <Typography className={classes.infoValue}>Maca Quran App</Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography className={classes.infoLabel}>{t("repository")}</Typography>
          <Typography className={classes.infoValue}>
            <Link 
              href="https://github.com/iqballbayhaqi/maca-quran"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <Box display="flex" alignItems="center">
                <GitHubIcon style={{ fontSize: 16, marginRight: 6 }} />
                github.com/iqballbayhaqi
              </Box>
            </Link>
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography className={classes.infoLabel}>{t("technology")}</Typography>
          <Typography className={classes.infoValue}>
            React.js, Material-UI
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography className={classes.infoLabel}>API</Typography>
          <Typography className={classes.infoValue}>
            <Link 
              href="https://api.quran.gading.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              api.quran.gading.dev
            </Link>
          </Typography>
        </div>
      </div>

      {/* Creator Section */}
      <div className={classes.creatorSection}>
        <div className={classes.creatorAvatar}>
          <Typography className={classes.creatorInitial}>I</Typography>
        </div>
        <Link 
          href="https://iqbalbaihaqi.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography className={classes.creatorName}>
            iqballbayhaqi
          </Typography>
        </Link>
        <Typography className={classes.creatorRole}>
          Developer & Creator
        </Typography>
      </div>

      {/* Footer */}
      <div className={classes.footer}>
        <Typography className={classes.footerText}>
          Made with <FavoriteIcon style={{ fontSize: 14, color: "#e91e63", verticalAlign: "middle" }} /> in Jakarta
        </Typography>
        <Typography className={classes.footerText} style={{ marginTop: 8 }}>
          © 2024 Maca Quran. All rights reserved.
        </Typography>
      </div>
    </Container>
  );
};

export default AboutPage;
