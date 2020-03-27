import React, { Component } from "react";
import WelcomePage from "./components/wecomePage";
import CollectInfo from "./components/collectInfo";
import "./index.css";
import { handleFetchSetting } from "../../redux/product.redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Install extends Component {
  constructor(props) {
    super(props);
    this.state = { currentStep: "welcome" };
  }
  UNSAFE_componentWillMount() {
    this.props.handleFetchSetting();
  }

  handleCurrent = currentStep => {
    this.setState({ currentStep: currentStep });
  };
  render() {
    const { setting } = this.props;
    // console.log(setting);
    return (
      <div>
        {setting &&
          (setting.isFirst === "yes" ? (
            this.state.currentStep === "welcome" ? (
              <WelcomePage handleCurrent={this.handleCurrent} />
            ) : (
              <CollectInfo handleCurrent={this.handleCurrent} />
            )
          ) : (
            <Redirect to="/login" />
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    setting: state.product.setting
  };
};
const actionCreator = {
  handleFetchSetting
};

export default connect(mapStateToProps, actionCreator)(Install);
