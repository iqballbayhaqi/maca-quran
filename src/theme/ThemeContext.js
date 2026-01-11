import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const ThemeContext = createContext();

// Light theme palette
const lightPalette = {
  type: "light",
  primary: {
    main: "#017901",
    light: "#4caf50",
    dark: "#1b5e20",
  },
  secondary: {
    main: "#ff9800",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
    gradient: "linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)",
    drawer: "linear-gradient(180deg, #f8faf8 0%, #ffffff 100%)",
    card: "#ffffff",
    cardHover: "rgba(27, 94, 32, 0.08)",
  },
  text: {
    primary: "#333333",
    secondary: "#757575",
    hint: "#9e9e9e",
  },
  divider: "rgba(0, 0, 0, 0.08)",
  action: {
    hover: "rgba(27, 94, 32, 0.08)",
  },
};

// Dark theme palette
const darkPalette = {
  type: "dark",
  primary: {
    main: "#4caf50",
    light: "#81c784",
    dark: "#388e3c",
  },
  secondary: {
    main: "#ffb74d",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
    gradient: "linear-gradient(180deg, #1a2e1a 0%, #121212 100%)",
    drawer: "linear-gradient(180deg, #1a2e1a 0%, #1e1e1e 100%)",
    card: "#252525",
    cardHover: "rgba(76, 175, 80, 0.15)",
  },
  text: {
    primary: "#e0e0e0",
    secondary: "#a0a0a0",
    hint: "#757575",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  action: {
    hover: "rgba(76, 175, 80, 0.15)",
  },
};

const createAppTheme = (isDarkMode) => {
  const palette = isDarkMode ? darkPalette : lightPalette;
  
  return createTheme({
    palette,
    typography: {
      fontFamily: "'El Messiri', 'Roboto', sans-serif",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: palette.background.default,
            transition: "background-color 0.3s ease",
          },
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: palette.background.paper,
        },
      },
    },
  });
};

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // Check system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("darkMode");
      // Only auto-switch if user hasn't set a preference
      if (savedTheme === null) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(() => createAppTheme(isDarkMode), [isDarkMode]);

  const value = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};

export default ThemeContext;
