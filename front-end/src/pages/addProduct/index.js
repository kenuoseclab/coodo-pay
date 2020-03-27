import React, { Component } from "react";
import { Card, Steps, Row } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AddSteps from "@/components/addSteps";
import $axios from "@/$axios";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchAllProduct } from "../../redux/product.redux";
import { parseFormData } from "../../utils/productUtil";
const { Step } = Steps;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0, mode: "add", id: null };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  UNSAFE_componentWillMount() {
    let url = document.location.toString();

    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    // console.log(id - 0);
    if (!isNaN(parseInt(id))) {
      this.setState({
        mode: "edit"
      });
      this.setState({ id: this.props.allProducts[id - 1]._id });
    }
  }
  next() {
    // console.log(this.state.current);
    // console.log(this.state.current, "this.state.current1");
    // const current = this.state.current + 1;
    // console.log(current, "current");

    // console.log(this.state.current, "this.state.current2");
    if (this.state.mode === "add") {
      const current = this.state.current + 1;
      if (current === 1) {
        this.setState({ current: current });
      } else {
        $axios
          .post(
            "/product",
            parseFormData(
              this.props.formData,
              this.props.allProducts.length !== 0
                ? this.props.allProducts[this.props.allProducts.length - 1]
                    .productId + 1
                : 1
            )
          )
          .then(async results => {
            // console.log(results);
            await this.props.handleFetchAllProduct();
            this.setState({ current: current });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      // console.log(parseFormData(this.props.formData));
      const current = this.state.current + 1;
      if (current === 1) {
        this.setState({ current: current });
      } else {
        $axios
          .post(
            `/product/${this.state.id}`,
            parseFormData(this.props.formData, this.state.id)
          )
          .then(async results => {
            // console.log(results);
            await this.props.handleFetchAllProduct();
            this.setState({ current: current });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;

    return (
      <div className="product-add-page">
        <Link to="/productList">
          <span className="product-add-return">
            <ArrowLeftOutlined />
            &nbsp; 返回产品列表
          </span>
        </Link>

        <div className="product-add-header">
          <p style={{ fontSize: "20px", fontWeight: "500", marginTop: "30px" }}>
            {this.state.mode === "add" ? " 添加产品" : "编辑产品"}
          </p>
          <p style={{ lineHeight: "50px", fontSize: "15px" }}>
            将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
          </p>
          <div className={"extraImg"}>
            <img
              alt="这是一个标题"
              src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
            />
          </div>
        </div>
        <Card bordered={false} style={{ margin: "20px" }}>
          <Row justify="center">
            <Steps current={current}>
              <Step key="1" title="填写产品信息"></Step>
              <Step key="2" title="确认产品信息"></Step>
              <Step key="3" title="完成"></Step>
            </Steps>
          </Row>
          <AddSteps
            currentStep={this.state.current}
            next={this.next}
            prev={this.prev}
          />
        </Card>
      </div>
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
  handleFetchAllProduct
};
export default connect(mapStateToProps, actionCreator)(AddProduct);
