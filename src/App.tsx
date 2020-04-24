import React, { Suspense } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import routes, { IRoute, routeComponent } from "./routes";
import "./styles/App.css"

const Router = HashRouter;
const getRoute: (path: string, component: routeComponent) => JSX.Element = (path, component) => <Route path={path} component={component} exact />

const Fallback: React.FC<any> = React.memo(() => (
  <section className="app-route-fallback-container">
    <div>Loading...</div>
  </section>
));

const Links: React.FC<any> = React.memo(() => (
  <section className="app-route-links-container">
    {routes.map((item: IRoute) => item.isRoot? null: (
      <Link className="app-route-links-item btn btn-link" to={item.path}>
        {item.text}
      </Link>
    ))}
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
        <Routes />
      </Switch>
    </section>
  </Router>
));

const App: React.FC<any> = React.memo(() => (
  <Suspense fallback={<Fallback />}>
    <RouterWithLayout />
  </Suspense>
));

export default App;