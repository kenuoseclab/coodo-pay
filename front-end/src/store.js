import { createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { login } from "./redux/login.redux";
import { sidebar } from "./redux/sidebar.redux";
import { weekData } from "./redux/weekData.redux";
import { monthData } from "./redux/monthData.redux";
import { yearData } from "./redux/yearData.redux";
import { periodData } from "./redux/periodData.redux";
import { product } from "./redux/product.redux";

import { form } from "./redux/form.redux";
import { combineReducers } from "redux";
const reducers = combineReducers({
  login,
  sidebar,
  weekData,
  monthData,
  yearData,
  periodData,
  form,
  product
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  // applyMiddleware(thunk, loggerMiddleware)
  process.env.NODE_ENV === "development"
    ? composeEnhancers(applyMiddleware(thunk))
    : composeEnhancers(applyMiddleware(thunk))
);
export default store;
