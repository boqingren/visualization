import React, { Suspense } from "react";
import { HashRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import routes, { IRoute } from "./routes";
import DataLoading from "./components/DataLoading";
import "./styles/App.css";

const Router = HashRouter;

const Links: React.FC<any> = React.memo(() => (
  <section className="app-route-links-container">
    {routes.map((item: IRoute) => {
      const location = useLocation();
      const isActive = item.path === location.pathname;
      const customCss = isActive? "btn-light": "btn-link";
      const className = classnames(["app-route-links-item", "btn", customCss]);
      return item.isRoot? null: (
        <Link key={item.path} className={className} to={item.path}>
        {item.text}
      </Link>
      )
    })}
  </section>
));

const Routes: React.FC<any> = React.memo(() => (
  <section className="app-route-views-container">
    {routes.map((item: IRoute) => <Route key={item.path} path={item.path} component={item.component} exact />)}
  </section>
));

const RouterWithLayout: React.FC<any> = React.memo(() => (
  <Router>
    <section className="app-route-layout-container">
      <Links />
      <Switch>
        <Suspense fallback={<DataLoading />}>
          <Routes />
        </Suspense>
      </Switch>
    </section>
  </Router>
));

const App: React.FC<any> = React.memo(() => <RouterWithLayout />);

export default App;