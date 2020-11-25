import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RedirectPage from "../pages/RedirectPage";
import StatsPage from "../pages/StatsPage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:code" exact component={RedirectPage} />
        <Route path="/:code/stats" exact component={StatsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
