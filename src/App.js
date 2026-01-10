import { Fragment } from "react";
import routes from "./routes";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "./theme";
import { LanguageProvider } from "./i18n";

function App() {
  return (
    <Fragment>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              {routes.map((res) => (
                <Route exact={res.exact} path={res.path} key={res.id}>
                  {res.page}
                </Route>
              ))}
            </Switch>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </Fragment>
  );
}

export default App;
