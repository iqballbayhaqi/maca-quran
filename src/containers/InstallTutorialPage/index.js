import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Collapse, IconButton } from "@material-ui/core";
import useStyles from "./styles";
import Header from "../../components/header";
import GetAppIcon from "@material-ui/icons/GetApp";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useLanguage } from "../../i18n";
import SEO from "../../components/SEO";
import { useThemeContext } from "../../theme";

const InstallTutorialPage = () => {
  const { isDarkMode } = useThemeContext();
  const classes = useStyles({ isDarkMode });
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState({
    android: true,
    ios: false,
    desktop: false,
  });
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const toggleExpand = (platform) => {
    setExpanded((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const androidSteps = [
    {
      step: 1,
      icon: <MoreVertIcon />,
      text: t("installAndroidStep1"),
    },
    {
      step: 2,
      icon: <GetAppIcon />,
      text: t("installAndroidStep2"),
    },
    {
      step: 3,
      icon: <CheckCircleIcon />,
      text: t("installAndroidStep3"),
    },
  ];

  const iosSteps = [
    {
      step: 1,
      icon: <ShareIcon />,
      text: t("installIosStep1"),
    },
    {
      step: 2,
      icon: <AddBoxIcon />,
      text: t("installIosStep2"),
    },
    {
      step: 3,
      icon: <CheckCircleIcon />,
      text: t("installIosStep3"),
    },
  ];

  const desktopSteps = [
    {
      step: 1,
      icon: <GetAppIcon />,
      text: t("installDesktopStep1"),
    },
    {
      step: 2,
      icon: <CheckCircleIcon />,
      text: t("installDesktopStep2"),
    },
  ];

  return (
    <Container maxWidth="xs" className={classes.root}>
      <SEO
        title="Cara Install Aplikasi"
        description="Panduan cara menginstall Maca Quran sebagai aplikasi di Android, iPhone, dan Desktop. Install sekarang untuk akses cepat dan offline."
        keywords="install pwa, install maca quran, cara install aplikasi quran, pwa android ios"
        path="/install"
      />
      <Header />

      {/* Hero Section */}
      <div className={classes.heroSection}>
        <div className={classes.iconContainer}>
          <GetAppIcon className={classes.heroIcon} />
        </div>
        <Typography className={classes.title}>{t("installTitle")}</Typography>
        <Typography className={classes.subtitle}>{t("installSubtitle")}</Typography>
      </div>

      {/* Install Button (if available) */}
      {deferredPrompt && !isInstalled && (
        <div className={classes.installButtonContainer}>
          <button className={classes.installButton} onClick={handleInstallClick}>
            <GetAppIcon style={{ marginRight: 8 }} />
            {t("installNow")}
          </button>
        </div>
      )}

      {/* Already Installed Banner */}
      {isInstalled && (
        <div className={classes.installedBanner}>
          <CheckCircleIcon className={classes.installedIcon} />
          <Typography className={classes.installedText}>{t("alreadyInstalled")}</Typography>
        </div>
      )}

      {/* Benefits Section */}
      <div className={classes.benefitsCard}>
        <Typography className={classes.benefitsTitle}>{t("installBenefits")}</Typography>
        <div className={classes.benefitsList}>
          <div className={classes.benefitItem}>
            <CheckCircleIcon className={classes.benefitIcon} />
            <Typography className={classes.benefitText}>{t("benefit1")}</Typography>
          </div>
          <div className={classes.benefitItem}>
            <CheckCircleIcon className={classes.benefitIcon} />
            <Typography className={classes.benefitText}>{t("benefit2")}</Typography>
          </div>
          <div className={classes.benefitItem}>
            <CheckCircleIcon className={classes.benefitIcon} />
            <Typography className={classes.benefitText}>{t("benefit3")}</Typography>
          </div>
          <div className={classes.benefitItem}>
            <CheckCircleIcon className={classes.benefitIcon} />
            <Typography className={classes.benefitText}>{t("benefit4")}</Typography>
          </div>
        </div>
      </div>

      {/* Android Tutorial */}
      <div className={classes.tutorialCard}>
        <Box
          className={classes.tutorialHeader}
          onClick={() => toggleExpand("android")}
        >
          <Box display="flex" alignItems="center">
            <PhoneAndroidIcon className={classes.platformIcon} />
            <Typography className={classes.platformTitle}>Android</Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon
              className={`${classes.expandIcon} ${
                expanded.android ? classes.expandIconRotated : ""
              }`}
            />
          </IconButton>
        </Box>
        <Collapse in={expanded.android}>
          <div className={classes.stepsContainer}>
            {androidSteps.map((item) => (
              <div key={item.step} className={classes.stepItem}>
                <div className={classes.stepNumber}>{item.step}</div>
                <div className={classes.stepContent}>
                  <div className={classes.stepIconContainer}>{item.icon}</div>
                  <Typography className={classes.stepText}>{item.text}</Typography>
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* iOS Tutorial */}
      <div className={classes.tutorialCard}>
        <Box
          className={classes.tutorialHeader}
          onClick={() => toggleExpand("ios")}
        >
          <Box display="flex" alignItems="center">
            <PhoneIphoneIcon className={classes.platformIcon} />
            <Typography className={classes.platformTitle}>iPhone / iPad</Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon
              className={`${classes.expandIcon} ${
                expanded.ios ? classes.expandIconRotated : ""
              }`}
            />
          </IconButton>
        </Box>
        <Collapse in={expanded.ios}>
          <div className={classes.stepsContainer}>
            {iosSteps.map((item) => (
              <div key={item.step} className={classes.stepItem}>
                <div className={classes.stepNumber}>{item.step}</div>
                <div className={classes.stepContent}>
                  <div className={classes.stepIconContainer}>{item.icon}</div>
                  <Typography className={classes.stepText}>{item.text}</Typography>
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Desktop Tutorial */}
      <div className={classes.tutorialCard}>
        <Box
          className={classes.tutorialHeader}
          onClick={() => toggleExpand("desktop")}
        >
          <Box display="flex" alignItems="center">
            <DesktopWindowsIcon className={classes.platformIcon} />
            <Typography className={classes.platformTitle}>Desktop (Chrome/Edge)</Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon
              className={`${classes.expandIcon} ${
                expanded.desktop ? classes.expandIconRotated : ""
              }`}
            />
          </IconButton>
        </Box>
        <Collapse in={expanded.desktop}>
          <div className={classes.stepsContainer}>
            {desktopSteps.map((item) => (
              <div key={item.step} className={classes.stepItem}>
                <div className={classes.stepNumber}>{item.step}</div>
                <div className={classes.stepContent}>
                  <div className={classes.stepIconContainer}>{item.icon}</div>
                  <Typography className={classes.stepText}>{item.text}</Typography>
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Note Section */}
      <div className={classes.noteSection}>
        <Typography className={classes.noteText}>{t("installNote")}</Typography>
      </div>
    </Container>
  );
};

export default InstallTutorialPage;
