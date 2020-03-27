import React, { Component } from "react";
import {
  handleFetchProductInfo,
  handleFetchSetting
} from "../../redux/product.redux";
import { connect } from "react-redux";
import PaymentDialog from "../../components/paymentDialog";

import DefaultTheme from "../../components/defaultTheme";
import TechTheme from "../../components/TechTheme";
import "./index.css";

// import faker from "faker";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      chooseLevel: null,
      formData: null,
      qrUrl: null,
      orderInfo: null
    };
    this.checkPayment = null;
  }
  UNSAFE_componentWillMount() {
    let url = document.location.toString();

    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    // console.log(id, "id");
    this.props.handleFetchProductInfo(id);
    this.props.handleFetchSetting();
  }
  handleDialog = (bool, chooseLevel) => {
    this.setState({ formData: null });
    this.setState({ showDialog: bool });
    this.setState({ chooseLevel: chooseLevel });
  };

  render() {
    this.state.orderInfo && clearInterval(this.checkPayment);
    const { productInfo, setting } = this.props;
    const { chooseLevel } = this.state;
    // console.log(setting);

    
    return (
      <div className="product-theme-container">
        {this.state.showDialog ? (
          <PaymentDialog
            productInfo={productInfo}
            chooseLevel={chooseLevel}
            handleDialog={this.handleDialog}
            showDialog={this.state.showDialog}
          />
        ) : null}
        {setting &&
          productInfo &&
          (setting.themeOption === "default" ? (
            <DefaultTheme
              productInfo={productInfo}
              handleDialog={this.handleDialog}
            />
          ) : (
            <TechTheme
              productInfo={productInfo}
              handleDialog={this.handleDialog}
            />
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    productInfo: state.product.productInfo,
    setting: state.product.setting
  };
};
const actionCreator = {
  handleFetchProductInfo,
  handleFetchSetting
};

export default connect(mapStateToProps, actionCreator)(Product);
