import React, { Component } from "react";
// import Admin from "./containers/admin";
import { Provider } from "react-redux";
// import { hot } from "react-hot-loader/root";
import Router from "./router/index";
import store from "./store";
import "./assets/style/reset.css";

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
