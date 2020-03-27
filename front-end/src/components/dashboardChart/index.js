import React, { Component } from "react";
import { Card, Tabs } from "antd";
import "./index.css";
import { connect } from "react-redux";
import { getRankingList } from "@/utils/rankingListUtil";
import DataCard from "../dataCard";
// const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class DashboardChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rangePickerValue: getTimeDistance("year"),
      currentRange: "year"
    };
  }
  selectDate = type => {
    // console.log(type, "type");
    this.setState({ currentRange: type });
  };

  render() {
    // console.log(this.state.currentRange, "state");
    // console.log(this.props.salesByYear, "hello");
    // console.log(this.props.salesByMonth, "hello");
    // console.log(this.props.salesByWeek, "week");
    // let rankingListData =
    //   this.state.currentRange === "year" && this.props.salesByYear
    //     ? getRankingList(this.props.salesByYear, this.state.currentRange)
    //     : this.state.currentRange === "month" && this.props.salesByMonth
    //     ? getRankingList(this.props.salesByMonth, this.state.currentRange)
    //     : this.state.currentRange === "week" && this.props.salesByWeek
    //     ? getRankingList(this.props.salesByWeek, this.state.currentRange)
    //     : [];

    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 0
        }}
      >
        <div className={"salesCard"}>
          <Tabs
            tabBarExtraContent={
              <div className={"salesExtraWrap"}>
                <div className={"salesExtra"}>
                  <a
                    className={
                      this.state.currentRange === "week" ? "currentDate" : ""
                    }
                    style={{ fontSize: "15px" }}
                    onClick={() => this.selectDate("week")}
                    
                  >
                    本周
                  </a>
                  <a
                    className={
                      this.state.currentRange === "month" ? "currentDate" : ""
                    }
                    style={{ fontSize: "15px" }}
                    onClick={() => this.selectDate("month")}
                  >
                    本月
                  </a>
                  <a
                    className={
                      this.state.currentRange === "year" ? "currentDate" : ""
                    }
                    style={{ fontSize: "15px" }}
                    onClick={() => this.selectDate("year")}
                  >
                    本年
                  </a>
                </div>
              </div>
            }
            size="large"
            tabBarStyle={{
              marginBottom: 24
            }}
            style={{ height: "400px !important" }}
          >
            <TabPane tab="销售额" key="sales">
              <DataCard
                dataByYear={this.props.salesByYear}
                dataByMonth={this.props.salesByMonth}
                dataByWeek={this.props.salesByWeek}
                catergory="sales"
                currentRange={this.state.currentRange}
                rankingListData={{
                  year: getRankingList(
                    this.props.salesByYear,
                    this.state.currentRange
                  ),
                  month: getRankingList(
                    this.props.salesByMonth,
                    this.state.currentRange
                  ),
                  week: getRankingList(
                    this.props.salesByWeek,
                    this.state.currentRange
                  )
                }}
              />
            </TabPane>
            <TabPane tab="访问量" key="visits">
              <DataCard
                dataByYear={this.props.visitsByYear}
                dataByMonth={this.props.visitsByMonth}
                dataByWeek={this.props.visitsByWeek}
                catergory="visits"
                currentRange={this.state.currentRange}
                rankingListData={{
                  year: getRankingList(
                    this.props.visitsByYear,
                    this.state.currentRange
                  ),
                  month: getRankingList(
                    this.props.visitsByMonth,
                    this.state.currentRange
                  ),
                  week: getRankingList(
                    this.props.visitsByWeek,
                    this.state.currentRange
                  )
                }}
              />
            </TabPane>
            <TabPane tab="订单数" key="orders">
              <DataCard
                dataByYear={this.props.ordersByYear}
                dataByMonth={this.props.ordersByMonth}
                dataByWeek={this.props.ordersByWeek}
                catergory="orders"
                currentRange={this.state.currentRange}
                rankingListData={{
                  year: getRankingList(
                    this.props.ordersByYear,
                    this.state.currentRange
                  ),
                  month: getRankingList(
                    this.props.ordersByMonth,
                    this.state.currentRange
                  ),
                  week: getRankingList(
                    this.props.ordersByWeek,
                    this.state.currentRange
                  )
                }}
              />
            </TabPane>
          </Tabs>
        </div>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    salesByYear: state.yearData.salesByYear,
    visitsByYear: state.yearData.visitsByYear,
    ordersByYear: state.yearData.ordersByYear,
    salesByMonth: state.monthData.salesByMonth,
    visitsByMonth: state.monthData.visitsByMonth,
    ordersByMonth: state.monthData.ordersByMonth,
    salesByWeek: state.weekData.salesByWeek,
    visitsByWeek: state.weekData.visitsByWeek,
    ordersByWeek: state.weekData.ordersByWeek
  };
};
const actionCreator = {};

export default connect(mapStateToProps, actionCreator)(DashboardChart);
