import React, { Component } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, List, Typography, Modal, message } from "antd";
import "./index.css";
// import { fakeList } from "@/mock/productPage";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import $axios from "@/$axios";
import { handleFetchAllProduct } from "../../redux/product.redux";
const { confirm } = Modal;
const { Paragraph } = Typography;
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 500);
  }
  showConfirm = index => {
    let { allProducts } = this.props;
    // console.log(this.props.allProducts, index, "products1");
    let { handleFetchAllProduct } = this.props;
    confirm({
      title: "是否删除此产品",
      icon: <ExclamationCircleOutlined />,
      content: "删除之后，产品的购买链接将会失效，之前所有的销售数据仍会保留",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        return $axios
          .delete(`/product/${allProducts[index - 1]._id}`)
          .then(results => {
            message.success("删除成功");
            handleFetchAllProduct();
          })
          .catch(err => console.log(err));
      },
      onCancel() {}
    });
  };
  handleAddProduct = () => {
    if (
      this.props.alipay.secretKey === " " &&
      this.props.wechatPay.secretKey === " " &&
      this.props.alipay.secretKey === " "
    ) {
      message.warning("暂未配置支付信息");
    } else if (this.props.email.mailPassword === " ") {
      message.warning("暂未配置邮箱信息");
    } else {
      this.props.history.push("/productAdd");
    }
  };
  render() {
    let { loading } = this.state;
    // console.log(this.props.allProducts[0]._id, "products");
    const content = (
      <div className={"pageHeaderContent"} style={{ padding: "20px" }}>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#595959"
          }}
        >
          产品列表
        </div>
        <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
          在这里添加和编辑您希望出售的产品
        </p>
      </div>
    );

    const nullData = {};
    // console.log(fakeList(9));
    return (
      <div className="product-page-container">
        <div className="product-page-header">{content}</div>

        <div className={"cardList"} style={{ padding: "20px" }}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1
            }}
            dataSource={[nullData, ...this.props.allProducts]}
            renderItem={(item, index) => {
              if (item && item._id) {
                return (
                  <List.Item key={item._id}>
                    <Card
                      hoverable
                      className={"card"}
                      actions={[
                        <Link to={`/productAdd/${index}`} key="edit">
                          编辑
                        </Link>,
                        <a
                          key="delete"
                          onClick={() => {
                            this.showConfirm(index);
                          }}
                        >
                          删除
                        </a>,
                        <Link
                          to={`/product/${
                            this.props.allProducts[index - 1].productId
                          }`}
                          key="check"
                          target="_blank"
                        >
                          查看
                        </Link>
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <img
                            href="/#"
                            alt=""
                            className={"cardAvatar"}
                            src={item.avatar || "/assets/logo.svg"}
                          />
                        }
                        title={<a href="/#">{item.productName}</a>}
                        description={
                          <Paragraph
                            className={"item"}
                            ellipsis={{
                              rows: 3
                            }}
                          >
                            {item.productInfo}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  <Button
                    type="dashed"
                    className={"newButton"}
                    style={{ fontSize: "15px", height: "200px" }}
                    onClick={this.handleAddProduct}
                  >
                    <PlusOutlined /> 新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts,
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
    email: state.form.email
  };
};
const actionCreator = {
  handleFetchAllProduct
};
export default connect(mapStateToProps, actionCreator)(withRouter(ProductPage));
