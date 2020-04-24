import React, { Suspense } from "react";
import { HashRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import routes, { IRoute, routeComponent } from "./routes";
import "./styles/App.css"

const Router = HashRouter;
const getRoute: (path: string, component: routeComponent) => JSX.Element = (path, component) => <Route key={path} path={path} component={component} exact />

const Fallback: React.FC<any> = React.memo(() => (
  <section className="app-route-fallback-container">
    <div>Loading...</div>
  </section>
));

const Links: React.FC<any> = React.memo((props) => (
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
    {routes.map((item: IRoute) => getRoute(item.path, item.component))}
  </section>
));

const RouterWithLayout: React.FC<any> = React.memo(() => (
  <Router>
    <section className="app-route-layout-container">
      <Links />
      <Switch>
        <Suspense fallback={<Fallback />}>
          <Routes />
        </Suspense>
      </Switch>
    </section>
  </Router>
));

const App: React.FC<any> = React.memo(() => <RouterWithLayout />);

export default App;