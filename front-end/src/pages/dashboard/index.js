import React, { Component } from "react";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardChart from "@/components/dashboardChart";
import PageLoading from "../../components/pageLoading";
import { connect } from "react-redux";
import { handleFetchByWeek } from "@/redux/weekData.redux";
import { handleFetchByMonth } from "@/redux/monthData.redux";
import { handleFetchByYear } from "@/redux/yearData.redux";
import { handleFetchByPeriod } from "@/redux/periodData.redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !(
        this.props.salesByPeriod &&
        this.props.visitsByPeriod &&
        this.props.ordersByPeriod &&
        this.props.allSales &&
        this.props.allVisits &&
        this.props.allOrders &&
        this.props.salesByYear &&
        this.props.visitsByYear &&
        this.props.ordersByYear &&
        this.props.salesByMonth &&
        this.props.visitsByMonth &&
        this.props.ordersByMonth &&
        this.props.salesByWeek &&
        this.props.visitsByWeek &&
        this.props.ordersByWeek &&
        this.props.period
      )
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      loading: !(
        nextProps.salesByPeriod &&
        nextProps.visitsByPeriod &&
        nextProps.ordersByPeriod &&
        nextProps.allSales &&
        nextProps.allVisits &&
        nextProps.allOrders &&
        nextProps.salesByYear &&
        nextProps.visitsByYear &&
        nextProps.ordersByYear &&
        nextProps.salesByMonth &&
        nextProps.visitsByMonth &&
        nextProps.ordersByMonth &&
        nextProps.salesByWeek &&
        nextProps.visitsByWeek &&
        nextProps.ordersByWeek &&
        nextProps.period
      )
    });
  }
  render() {
    const { loading } = this.state;
    // console.log(this.props, "ordersByMonth");
    return (
      <div>
        {loading ? (
          <PageLoading />
        ) : (
          <div className="dahboard-container" style={{ padding: "20px" }}>
            <DashboardHeader />
            <DashboardChart />
          </div>
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
    ordersByWeek: state.weekData.ordersByWeek
  };
};
const actionCreator = {
  handleFetchByPeriod,
  handleFetchByYear,
  handleFetchByMonth,
  handleFetchByWeek
};

export default connect(mapStateToProps, actionCreator)(Dashboard);
