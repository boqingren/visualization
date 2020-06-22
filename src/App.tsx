import React, { Suspense } from "react";
import { HashRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import { useMedia } from "react-media";
import { IRoute } from "./types";
import classnames from "classnames";
import { useRoutesWithMedia } from "./hooks";
import DataLoading from "./components/DataLoading";

import "./styles/App.css";

const Router = HashRouter;

const PCLinks: React.FC<any> = React.memo(() => {
  const routes: Array<IRoute> = useRoutesWithMedia()
  return (
    <section className="app-route-h5-links-container">
      {routes.map((item: IRoute) => {
        const location = useLocation();
        const isActive = item.path === location.pathname;
        const customCss = isActive? "btn-light": "btn-link";
        const className = classnames(["app-route-pc-links-item", "btn", customCss]);
        return item.isRoot? null: (
          <Link key={item.path} className={className} to={item.path}>
          {item.text}
        </Link>
        )
      })}
    </section>
  )
});

const Routes: React.FC<any> = React.memo(() => {
  const routes: Array<IRoute> = useRoutesWithMedia()
  return (
    <section className="app-route-views-container">
      {routes.map((item: IRoute) => <Route key={item.path} path={item.path} component={item.component} exact />)}
    </section>
  )
});

// PC Layout
const RouterWithPCLayout: React.FC<any> = React.memo(() => (
  <Router>
    <section className="app-route-pc-layout-container">
      <PCLinks />
      <Switch>
        <Suspense fallback={<DataLoading />}>
          <Routes />
        </Suspense>
      </Switch>
    </section>
  </Router>
));

// H5 Layout
const RouterWithH5Layout: React.FC<any> = React.memo(() => (
  <Router>
    <Switch>
      <Suspense fallback={<DataLoading />}>
        <Routes />
      </Suspense>
    </Switch>
  </Router>
));

const RouterWithLayout: React.FC<any> = React.memo(() => {
  const isSmallScreen = useMedia({ query: "(max-width: 599px)" });
  return isSmallScreen? <RouterWithH5Layout /> : <RouterWithPCLayout />
});

const App: React.FC<any> = React.memo(() => <RouterWithLayout />);

export default App;