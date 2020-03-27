import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Admin from "@/containers/admin";
import Login from "@/containers/login";
import Product from "@/containers/product";
import Install from "@/containers/install";
import AuthRouter from "@/utils/authUtil";
const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route component={Install} exact path="/install" />
        <Route component={Login} exact path="/login" />
        <Route component={Product} path="/product" />
        <AuthRouter path="/" component={Admin} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
