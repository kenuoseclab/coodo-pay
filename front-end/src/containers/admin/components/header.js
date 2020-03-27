import React, { Component } from "react";
import { Layout, Badge, Card, List } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleUserInfo } from "@/redux/login.redux";
import { handleCollapse } from "@/redux/sidebar.redux";
import $axios from "@/$axios";
const { Header } = Layout;
const { Meta } = Card;

class HeaderBar extends Component {
  state = {
    visible: false,
    showMessage: false,
    orders: null,
    messageNumber: null
  };
  UNSAFE_componentWillMount() {
    let date = new Date();
    this.fetch({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  componentDidMount() {
    // let userInfo =
    //   localStorage.getItem("userInfo") &&
    //   JSON.parse(localStorage.getItem("userInfo"));
    // if (userInfo) {
    //   this.props.handleUserInfo(userInfo);
    // } else {
    //   this.props.handleUserInfo({});
    //   this.props.history.push("/login");
    // }
  }
  fetch = (params = {}) => {
    $axios
      .get("/order/all", {
        params: { ...params }
      })
      .then(data => {
        this.setState({
          orders: data.data
        });
        // console.log(this.state.orders);
        let ordersNumber = localStorage.getItem("ordersNumber") || 0;
        let length = this.state.orders.length;
        // if
        this.setState({ messageNumber: length - ordersNumber });
      });
  };
  handleLogout = () => {
    // console.log("hellolog");
    // this.props.handleUserInfo({});
    localStorage.removeItem("jwt");
    // localStorage.removeItem("userInfo");
    // console.log(this.props.history);
    this.props.history.push("/");
  };
  handleMessage = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };
  toggle = () => {
    // console.log("hello");
    this.props.handleCollapse(!this.props.isCollapsed);
  };
  setting = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  handleClearMessage = () => {
    this.setState({ messageNumber: 0 });
    localStorage.setItem("ordersNumber", this.state.orders.length);
  };
  renderMessage = () => {
    // this.handleMessageNumber();
    return this.state.orders.reverse().map(item => {
      return `${item.email} 于 ${item.date} ${item.time} 购买 ${item.productName}${item.levelName}，消费${item.price}元`;
    });
  };
  render() {
    // console.log(this.state.messageNumber, "messageNumber");

    return (
      <Header theme="light">
        {this.state.visible}
        {this.props.isCollapsed ? (
          <MenuUnfoldOutlined onClick={this.toggle} />
        ) : (
          <MenuFoldOutlined onClick={this.toggle} />
        )}

        <LogoutOutlined onClick={this.handleLogout} />
        <div className="header-number" onClick={this.handleMessage}>
          <a href="#" className="header-number-icon">
            <Badge count={this.state.messageNumber}></Badge>
          </a>
          <BellOutlined />
        </div>
        {this.state.showMessage ? (
          <Card
            style={{ width: 300 }}
            actions={[
              <div onClick={this.handleClearMessage}>全部标记已读</div>
            ]}
            className="header-message-box"
          >
            <Meta
              title="本月交易提醒"
              description={
                <div className="header-message-box-content-container">
                  <List
                    size="small"
                    bordered={false}
                    dataSource={this.renderMessage()}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    className="header-message-box-content"
                  />
                </div>
              }
            />
          </Card>
        ) : null}
      </Header>
    );
  }
}
const mapStateToProps = state => {
  return {
    isCollapsed: state.sidebar.isCollapsed,
    ordersByMonth: state.monthData.ordersByMonth
  };
};
const actionCreator = {
  handleCollapse,
  handleUserInfo
};
export default connect(mapStateToProps, actionCreator)(withRouter(HeaderBar));
