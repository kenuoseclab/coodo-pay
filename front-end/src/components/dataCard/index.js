import React, { Component } from "react";
import { Col, Row } from "antd";

import numeral from "numeral";
import "./index.css";
import BasicChart from "../basicChart";
import { chartData } from "@/utils/fetchChartData";
// import { getRankingList } from "../../utils/rankingListUtil";

class DataCard extends Component {
  render() {
    // console.log(this.props.currentRange, "currentRange");
    const rankingListData =
      this.props.currentRange === "year"
        ? this.props.rankingListData.year
        : this.props.currentRange === "month"
        ? this.props.rankingListData.month
        : this.props.rankingListData.week;
    return (
      <>
        <Row type="flex">
          <Col xl={16} lg={12} md={12} sm={24} xs={24}>
            <div className={"salesBar"}>
              {this.props.currentRange === "year" ? (
                <BasicChart
                  chartData={chartData(
                    this.props.catergory,
                    this.props.currentRange,
                    this.props.dataByYear
                  )}
                  height={"300px"}
                  currentRange={this.props.currentRange}
                />
              ) : this.props.currentRange === "month" ? (
                <BasicChart
                  chartData={chartData(
                    this.props.catergory,
                    this.props.currentRange,
                    this.props.dataByMonth
                  )}
                  height={"300px"}
                  currentRange={this.props.currentRange}
                />
              ) : this.props.currentRange === "week" ? (
                <BasicChart
                  chartData={chartData(
                    this.props.catergory,
                    this.props.currentRange,
                    this.props.dataByWeek
                  )}
                  height={"300px"}
                  currentRange={this.props.currentRange}
                />
              ) : null}
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={"salesRank"}>
              <h4 className={"rankingTitle"}>
                {this.props.catergory === "sales"
                  ? "销售额排行"
                  : this.props.catergory === "visits"
                  ? "访问量排行"
                  : "订单数排行"}
              </h4>
              <ul className={"rankingList"}>
                {rankingListData.map((item, i) => (
                  <li key={i}>
                    <span
                      className={`rankingItemNumber ${i < 3 ? "active" : ""}`}
                    >
                      {i + 1}
                    </span>
                    <span className={"rankingItemTitle"} title={item.title}>
                      {item.title}
                    </span>
                    <span className={"rankingItemValue"}>
                      {numeral(item.total).format("0,0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default DataCard;
