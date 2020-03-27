import React, { Component } from "react";
import { Button, Result, Descriptions } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class AddStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = { allProducts: this.props.allProducts };
  }
  UNSAFE_componentWillMount() {
    // this.props.handleFetchAllProduct();
  }

  render() {
    // console.log(this.props.allProducts.length);
    const information = (
      <div className="information">
        <Descriptions column={1}>
          <Descriptions.Item label="产品名称">
            {this.props.formData.productName}
          </Descriptions.Item>
          <Descriptions.Item label="产品描述">
            {this.props.formData.productInfo}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
    const extra = (
      <div>
        <Link to="/productList">
          <Button type="primary" style={{ marginRight: "30px" }}>
            返回产品列表
          </Button>
        </Link>
        <Link
          to={`/product/${
            this.props.allProducts[this.props.allProducts.length - 1].productId
          }`}
        >
          <Button>前往产品页</Button>
        </Link>
      </div>
    );
    return (
      <Result
        status="success"
        title="添加成功"
        subTitle=""
        extra={extra}
        className="result"
        style={{ marginTop: "20px" }}
      >
        {information}
      </Result>
    );
  }
}
const mapStateToProps = state => {
  return {
    formData: state.form.formData,
    allProducts: state.product.allProducts
  };
};
const actionCreator = {
  // handleFetchAllProduct
};
export default connect(mapStateToProps, actionCreator)(AddStepThree);
