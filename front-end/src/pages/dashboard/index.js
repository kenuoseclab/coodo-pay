import React, { Component } from "react";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardChart from "@/components/dashboardChart";
import PageLoading from "../../components/pageLoading";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: this.props.salesByYear !== null ? false : true };
  }

  render() {
    const { loading } = this.state;
    // console.log(this.props.ordersByMonth, "ordersByMonth");
    return (
      <>
        {loading ? (
          <PageLoading />
        ) : (
          <div className="dahboard-container" style={{ padding: "20px" }}>
            <DashboardHeader />
            <DashboardChart />
          </div>
        )}
      </>
    );
  }
}

export default Dashboard;
