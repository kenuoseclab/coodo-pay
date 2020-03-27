import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { handleUserInfo } from "@/redux/login.redux";
import {
  IdcardOutlined,
  DashboardOutlined,
  ShopOutlined,
  PayCircleOutlined,
  AccountBookOutlined,
  MailOutlined,
  SkinOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuSelected: this.props.history.location.pathname };
  }
  render() {
    const { isCollapsed } = this.props;
    const menuSelected = this.props.history.location.pathname;
    const menuOpened = `/${menuSelected.split("/")[1]}`;
    // console.log(menuSelected, menuOpened, "menuOpened");
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        width="218px"
        style={{
          height: "100%",
          boxShadow: "0px 0px 6px rgba(0,0,0,0.09)",
          zIndex: "10"
        }}
        theme="light"
      >
        <div className="logo" style={{ width: "100%", height: "92px" }}>
          <img
            src="../assets/logo.svg"
            alt=""
            style={{
              width: "40px",
              margin: "30px 10px 20px 24px",
              float: "left"
            }}
          />

          {isCollapsed ? null : (
            <span
              style={{
                fontSize: "23px",
                color: "rgba(72,72,72,1)",
                float: "left",
                marginTop: "40px",
                fontWeight: "500"
              }}
            >
              Coodo Pay
            </span>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={[menuOpened]}
          defaultSelectedKeys={[menuSelected]}
          selectedKeys={[menuSelected]}
        >
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">
              <DashboardOutlined />
              <span className="nav-text" style={{ marginLeft: "7px" }}>
                仪表盘
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/productList">
            <Link to="/productList">
              <AccountBookOutlined />
              <span className="nav-text">产品管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/order">
            <Link to="/order">
              <ShopOutlined />
              <span className="nav-text">订单管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/payment">
            <Link to="/payment">
              <PayCircleOutlined />
              <span className="nav-text">支付设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mail">
            <Link to="/mail">
              <MailOutlined />
              <span className="nav-text">邮箱设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/theme">
            <Link to="/theme">
              <SkinOutlined />
              <span className="nav-text">主题设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/account">
            <Link to="/account">
              <IdcardOutlined />
              <span className="nav-text">账户中心</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
const mapStateToProps = state => {
  return {
    isCollapsed: state.sidebar.isCollapsed
  };
};
const actionCreator = {
  handleUserInfo
};
export default connect(mapStateToProps, actionCreator)(withRouter(Sidebar));
