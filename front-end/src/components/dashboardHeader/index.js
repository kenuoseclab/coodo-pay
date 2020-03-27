import React, { Component } from "react";
import { Card, Col, Row, Statistic } from "antd";
import numeral from "numeral";
import "./index.css";
import AreaChart from "../areaChart";
import BarChart from "../barChart";
import { connect } from "react-redux";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24
  }
};

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  diff = arr => {
    let result = [];
    for (let i = 0; i < arr.length - 1; i++) {
      result.push(Math.abs(arr[i + 1] - arr[i]));
    }
    // console.log(result);
    // console.log(arr);
    return result;
  };
  sum = arr => {
    let sum = 0;
    arr.forEach(item => {
      sum += item;
    });
    return sum;
  };
  render() {
    // const { loading } = this.state;
    // let saleSum1,
    //   saleSum2 = 0;
    // if (!loading) {
    // let saleArr1 = [];
    // let saleArr2 = [];
    // saleArr1 = [...this.props.salesByPeriod];
    // saleArr2 = [...this.props.salesByPeriod];
    let saleSum1 = this.props.salesByPeriod[14] - this.props.salesByPeriod[7];
    let saleSum2 = this.props.salesByPeriod[7] - this.props.salesByPeriod[0];
    // console.log(this.props.salesByPeriod);

    return (
      <Row justify="center" gutter={24} type="flex">
        <Col {...topColResponsiveProps}>
          <Card>
            <Statistic title="销售额" value={this.props.allSales} />
            <Statistic
              title="周同比"
              value={parseInt(((saleSum2 - saleSum1) / saleSum1) * 100) || 0}
              valueStyle={
                saleSum2 / saleSum1 > 1
                  ? { color: "#cf1322" }
                  : { color: "#3f8600" }
              }
              prefix={
                saleSum2 / saleSum1 > 1 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix="%"
            />
            <Statistic
              title="日同比"
              className="header-day-stats"
              value={
                parseInt(
                  (this.props.salesByPeriod[14] +
                    this.props.salesByPeriod[12] -
                    2 * this.props.salesByPeriod[13]) /
                    (this.props.salesByPeriod[13] -
                      this.props.salesByPeriod[12])
                ) * 100 || 0
              }
              valueStyle={
                (this.props.salesByPeriod[14] - this.props.salesByPeriod[13]) /
                  (this.props.salesByPeriod[13] -
                    this.props.salesByPeriod[12]) >
                1
                  ? { color: "#cf1322" }
                  : { color: "#3f8600" }
              }
              prefix={
                (this.props.salesByPeriod[14] - this.props.salesByPeriod[13]) /
                  (this.props.salesByPeriod[13] -
                    this.props.salesByPeriod[12]) >
                1 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix="%"
            />

            <p className="card-footer">
              今日销售额{" "}
              {`￥${numeral(
                this.props.salesByPeriod[14] - this.props.salesByPeriod[13] || 0
              ).format("0,0")}`}
            </p>
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card>
            <Statistic title="访问量" value={this.props.allVisits} />

            {this.sum(this.diff(this.props.visitsByPeriod)) === 0 ? (
              <div className="header-chart-no-data">
                没有过去14天的访问数据
                <div className="card-line"></div>
              </div>
            ) : (
              <AreaChart
                visitsByPeriod={this.diff(this.props.visitsByPeriod)}
                period={this.props.period}
              />
            )}

            <p className="card-footer">
              今日访问量{" "}
              {`${numeral(
                this.props.visitsByPeriod[14] - this.props.visitsByPeriod[13] ||
                  0
              ).format("0,0")}`}
            </p>
          </Card>
        </Col>

        <Col {...topColResponsiveProps}>
          <Card>
            <Statistic title="订单数" value={this.props.allOrders} />

            {this.sum(this.diff(this.props.ordersByPeriod)) === 0 ? (
              <div className="header-chart-no-data">
                没有过去14天的订单数据
                <div className="card-line"></div>
              </div>
            ) : (
              <BarChart
                ordersByPeriod={this.diff(this.props.ordersByPeriod)}
                period={this.props.period}
              />
            )}

            <p className="card-footer">
              今日订单数{" "}
              {`${numeral(
                this.props.ordersByPeriod[14] - this.props.ordersByPeriod[13] ||
                  0
              ).format("0,0")}`}
            </p>
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card>
            <p style={{ opacity: "0.7" }}>运行状态</p>
            <p style={{ fontSize: "30px", color: "" }}>
              {this.props.allProducts.length > 0 ? "交易中" : "暂无上架"}
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#13C2C2",
                marginTop: "10px"
              }}
            >
              {this.props.alipay.secretKey === " " &&
              this.props.wechatPay.secretKey === " " &&
              this.props.alipay.secretKey === " "
                ? "暂未配置支付信息"
                : this.props.email.mailPassword === " "
                ? "暂未配置邮箱信息"
                : "一切都已配置完成"}
            </p>
            <div className="card-line"></div>
            <p className="card-footer">
              <a
                href="https://www.jianshu.com/p/12d59f51eb1d"
                target="_blank"
                rel="noopener noreferrer"
              >
                了解更多
              </a>
            </p>
          </Card>
        </Col>
      </Row>
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
    allProducts: state.product.allProducts,
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
    email: state.form.email
  };
};
const actionCreator = {};

export default connect(mapStateToProps, actionCreator)(DashboardHeader);
