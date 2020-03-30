import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { routes } from "@/router/routes";
import $axios from "../../../$axios";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.handleFirstLogin();
  }

  handleFirstLogin = async () => {
    const { setting } = this.props;
    // console.log("test");
    if (setting.isFirst === "yes") {
      await $axios.post(`/setting/${setting._id}`, { isFirst: "no" });
    }
    // console.log("test");
  };
  render() {
    return (
      <div
        className="content-container"
        style={{ height: "calc(100% - 61px)" }}
      >
        <Switch>
          {routes.map(ele => (
            <Route
              render={() => <ele.component />}
              key={ele.path}
              path={ele.path}
            />
          ))}
          <Redirect from="/" exact to="/productList" />
          <Redirect to="/error/404" />
        </Switch>
        <div className="default-footer">
          Supported by
          <a
            href="https://github.com/troyeguo/coodo-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Coodo Pay
          </a>
          , Copyright © 2020
          <a
            href="https://github.com/troyeguo"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            App by Troye
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ setting: state.product.setting });
export default withRouter(connect(mapStateToProps)(MainContent));
