import React, { Component } from "react";
// import { GridContent } from "@ant-design/pro-layout";
import { Menu } from "antd";
import { connect } from "react-redux";
import Alipay from "../../components/alipay";
import WechatPay from "../../components/wechatPay";
import Paypal from "../../components/paypal";
// import NotificationView from "./components/notification";
// import SecurityView from "./components/security";
import "./index.css";

const { Item } = Menu;

class PaymentPage extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      alipay: "支付宝",
      wechatPay: "微信支付",
      paypal: "Paypal"
      // binding: "Account Binding",
      // notification: "New Message Notification"
    };
    this.state = {
      mode: "inline",
      menuMap,
      selectKey: "alipay"
    };
  }
  UNSAFE_componentWillMount() {}

  componentDidMount() {
    // dispatch({
    //   type: "accountSettings/fetchCurrent"
    // });
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = key => {
    this.setState({
      selectKey: key
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = "inline";
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }

      this.setState({
        mode
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case "alipay":
        return <Alipay formData={this.props.alipay} />;

      case "wechatPay":
        return <WechatPay formData={this.props.wechatPay} />;

      case "paypal":
        return <Paypal formData={this.props.paypal} />;

      default:
        break;
    }

    return null;
  };

  render() {
    // const { currentUser } = this.props;

    // if (!currentUser.userid) {
    //   return "";
    // }

    const { mode, selectKey } = this.state;
    return (
      <div className={"main"}>
        <div className={"leftMenu"}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => this.selectKey(key)}
            className="payment-page"
            style={{
              marginTop: "10px"
            }}
          >
            {this.getMenu()}
          </Menu>
        </div>
        <div className={"right"}>{this.renderChildren()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal
  };
};
const actionCreator = {
  // handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(PaymentPage);
