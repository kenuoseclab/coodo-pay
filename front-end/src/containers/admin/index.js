import React, { Component } from "react";
import { Layout, Row } from "antd";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import "./index.css";
import { connect } from "react-redux";
import Pageloading from "../../components/pageLoading";
import { handleFetchByWeek } from "@/redux/weekData.redux";
import { handleFetchByMonth } from "@/redux/monthData.redux";
import { handleFetchByYear } from "@/redux/yearData.redux";
import { handleFetchByPeriod } from "@/redux/periodData.redux";
import {
  handleFetchAllProduct,
  handleFetchSetting
} from "../../redux/product.redux";
import { handleFetchForm } from "../../redux/form.redux";
class App extends Component {
  state = { loading: true };
  UNSAFE_componentWillMount() {
    this.props.handleFetchByPeriod();
    this.props.handleFetchByYear();
    this.props.handleFetchByMonth();
    this.props.handleFetchByWeek();
    this.props.handleFetchAllProduct();
    this.props.handleFetchForm();
    this.props.handleFetchSetting();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      loading: !(
        // nextProps.salesByPeriod &&
        // nextProps.visitsByPeriod &&
        // nextProps.ordersByPeriod &&
        // nextProps.allSales &&
        // nextProps.allVisits &&
        // nextProps.allOrders &&
        // nextProps.salesByYear &&
        // nextProps.visitsByYear &&
        // nextProps.ordersByYear &&
        // nextProps.salesByMonth &&
        // nextProps.visitsByMonth &&
        // nextProps.ordersByMonth &&
        // nextProps.salesByWeek &&
        // nextProps.visitsByWeek &&
        // nextProps.ordersByWeek &&
        (
          nextProps.allProducts &&
          nextProps.alipay &&
          nextProps.wechatPay &&
          nextProps.paypal &&
          nextProps.email &&
          nextProps.user &&
          nextProps.setting
        )
        // nextProps.period
      )
    });
  }

  render() {
    const { loading } = this.state;
    // console.log(loading);
    const renderFetchMask = () => {
      return (
        <div className="fetching-data-mask">
          <img src="/assets/default.svg" alt="" className="login-mask-image" />
          <Row justify="center" className="login-mask-title">
            Coodo Pay
          </Row>
          <Row justify="center" className="login-mask-subtitle">
            <span>👏</span> 欢迎使用可道支付
          </Row>
          <Pageloading />
          <Row justify="center" style={{ lineHeight: "40px" }}>
            正在为您加载数据
          </Row>
          <Row className="login-title" justify="center">
            <div style={{ width: "150px" }}>
              <img
                src="../assets/logo.svg"
                alt=""
                className="login-logo"
                style={{
                  width: "30px",
                  marginTop: "30px"
                  // marginLeft: "70px"
                }}
              />

              <span className="login-mask-text">Coodo Pay</span>
            </div>
          </Row>
          <Row justify="center"></Row>
        </div>
      );
    };
    return (
      <div className="admin-container" style={{ height: "100%" }}>
        {loading ? (
          renderFetchMask()
        ) : (
          <Layout style={{ height: "100%" }}>
            <Sidebar />
            <Layout>
              <Header />
              <Content />
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    salesByPeriod: state.periodData.salesByPeriod,
    visitsByPeriod: state.periodData.visitsByPeriod,
    ordersByPeriod: state.periodData.ordersByPeriod,
    allSales: state.periodData.allSales,
    allVisits: state.periodData.allVisits,
    allOrders: state.periodData.allOrders,
    period: state.periodData.period,
    salesByYear: state.yearData.salesByYear,
    visitsByYear: state.yearData.visitsByYear,
    ordersByYear: state.yearData.ordersByYear,
    salesByMonth: state.monthData.salesByMonth,
    visitsByMonth: state.monthData.visitsByMonth,
    ordersByMonth: state.monthData.ordersByMonth,
    salesByWeek: state.weekData.salesByWeek,
    visitsByWeek: state.weekData.visitsByWeek,
    ordersByWeek: state.weekData.ordersByWeek,
    allProducts: state.product.allProducts,
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
    email: state.form.email,
    user: state.form.user,
    setting: state.product.setting
  };
};
const actionCreator = {
  handleFetchByPeriod,
  handleFetchAllProduct,
  handleFetchByYear,
  handleFetchByMonth,
  handleFetchByWeek,
  handleFetchForm,
  handleFetchSetting
};

export default connect(mapStateToProps, actionCreator)(App);
