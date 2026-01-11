import { Fragment } from "react";
import routes from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import { TajwidProvider } from "./tajwid";
import { ThemeContextProvider } from "./theme";

function App() {
  return (
    <Fragment>
      <LanguageProvider>
        <TajwidProvider>
          <ThemeContextProvider>
            <Router>
              <Switch>
                {routes.map((res) => (
                  <Route exact={res.exact} path={res.path} key={res.id}>
                    {res.page}
                  </Route>
                ))}
              </Switch>
            </Router>
          </ThemeContextProvider>
        </TajwidProvider>
      </LanguageProvider>
    </Fragment>
  );
}

export default App;
