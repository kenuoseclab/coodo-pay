import React, { Component } from "react";
import {
  AlipayCircleOutlined,
  WechatOutlined,
  createFromIconfontCN,
  CloseOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { encrypt } from "../../utils/crypto";
import QRCode from "qrcode.react";
import $axios from "@/$axios";
import {
  Result,
  Spin,
  Col,
  Row,
  Form,
  Input,
  Button,
  Radio,
  message
} from "antd";
// import faker from "faker";
import "./index.css";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_ulwzj52gr7s.js"
});
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class PaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: true,
      formData: null,
      qrUrl: null,
      orderInfo: null,
      questNumber: 0
    };
    this.checkPayment = null;
  }
  onFinish = async values => {
    let orderId = Date.now().toString() + Math.floor(Math.random() * 9999) + 1;
    this.setState({ formData: values });

    let metadata = await $axios.post("/order", {
      ...values,
      price: this.props.chooseLevel.levelPrice.price,
      productId: this.props.productInfo.productId,
      orderId: orderId,
      productName: this.props.productInfo.productName,
      levelName: this.props.chooseLevel.levelName
    });
    // console.log(metadata.data, "qrUrl");
    this.setState({ qrUrl: metadata.data });

    this.checkPayment = setInterval(async () => {
      let metadata = await $axios(`/order/fetch/${orderId}`);
      // console.log(metadata);
      let orderInfo = metadata.data;
      let questNumber = this.state.questNumber;
      questNumber++;
      this.setState({ questNumber: questNumber });
      // console.log(this.state.questNumber, "questNumber");
      // console.log(orderInfo, "orderInfo");
      // await $axios.post(`/alipay/callback/${orderInfo._id}`, orderInfo);
      // console.log(metadata1, "metadata1");
      if (orderInfo.paymentStatus === "已支付") {
        this.setState({ orderInfo: orderInfo });
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
    }, 2000);
  };
  closeDialog = () => {
    this.props.handleDialog(false, null);
  };
  render() {
    if (this.state.orderInfo || this.state.questNumber > 30) {
      clearInterval(this.checkPayment);
    }
    this.state.questNumber > 30 &&
      message.error("我们暂时无法处理您的请求，请稍后重试");
    const { chooseLevel } = this.props;
    // console.log(productInfo);
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 12 },
        sm: { span: 20, offset: 4 }
      }
    };
    const formItemLayout = {
      labelCol: {
        sm: { span: 24 }
      },
      wrapperCol: {
        sm: { span: 24 }
      }
    };
    return (
      <div className="product-payment-container">
        <CloseOutlined
          className="product-payment-close"
          onClick={() => {
            this.closeDialog();
          }}
        />
        <Row justify="center" className="product-payment-title">
          创建订单
        </Row>
        <Row justify="center" className="product-payment-message">
          {`支付完成后，您将获得一个${chooseLevel.levelName}会员的激活码，激活码永久有效，请妥善保管，
          邮箱密码仅用于查询激活码，不用于注册`}
        </Row>
        {this.state.orderInfo ? (
          <Result
            status="success"
            title="购买成功"
            extra={[
              <div className="product-payment-results-detail" key={"orderInfo"}>
                <p>订单号：{this.state.orderInfo.orderId}</p>
                <p>购买日期：{this.state.orderInfo.date}</p>
                <p>
                  产品信息：{this.state.orderInfo.productName}
                  {this.state.orderInfo.levelName}
                </p>
                <p>金额：{this.state.orderInfo.price}元</p>
                <p>会员码：{this.state.orderInfo.code}</p>
              </div>
            ]}
            className="product-payment-results"
          />
        ) : (
          <Row justify="center">
            <Col>
              <Row justify="center" style={{ marginTop: "20px" }}>
                <span className="product-payment-member">
                  购买{chooseLevel.levelName}会员
                </span>
                <span className="product-payment-price">
                  {chooseLevel.levelPrice.price}元
                </span>
              </Row>
              <Row>
                <Col className="product-payment-prefix">
                  <div>查询邮箱</div>
                  <div>查询密码</div>
                  <div>支付方式</div>
                </Col>
                <Col>
                  <Form
                    {...formItemLayout}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <Form.Item
                      // label="查询邮箱"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "请输入查询邮箱"
                        }
                      ]}
                      style={{ width: "200px" }}
                    >
                      <Input placeholder="请输入查询邮箱" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      // label="查询密码"
                      rules={[
                        {
                          required: true,
                          message: "请输入查询密码"
                        }
                      ]}
                      style={{ width: "200px" }}
                    >
                      <Input placeholder="请输入查询密码" />
                    </Form.Item>

                    <Form.Item
                      // label="支付方式"
                      name="payment"
                      rules={[
                        {
                          required: true,
                          message: "请选择支付方式"
                        }
                      ]}
                    >
                      <Radio.Group defaultValue="alipay">
                        <Radio value="alipay">
                          <AlipayCircleOutlined className="product-ailpay-icon" />
                        </Radio>
                        <Radio value="wechatPay" disabled>
                          <WechatOutlined className="product-wechat-icon" />
                        </Radio>
                        <Radio value="paypal" disabled>
                          <IconFont
                            type="icon-paypal"
                            className="product-paypal-icon"
                          />
                        </Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item {...formItemLayoutWithOutLabel}>
                      <Button
                        className="product-payment-next-button"
                        type="primary"
                        htmlType="submit"
                      >
                        下一步
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
            {this.state.formData && (
              <Col>
                {this.state.formData.payment !== "paypal" ? (
                  <div className="product-payment-qrcode-container">
                    {this.state.qrUrl ? (
                      <QRCode
                        value={this.state.qrUrl} //value参数为生成二维码的链接
                        size={150} //二维码的宽高尺寸
                        fgColor="#000000" //二维码的颜色
                        className="product-payment-qrcode"
                      />
                    ) : (
                      <Spin
                        indicator={antIcon}
                        tip="二维码生成中..."
                        className="product-payment-qrcode-spin"
                      />
                    )}

                    <div className="product-payment-qrcode-text">
                      {this.state.formData.payment === "alipay"
                        ? "使用支付宝"
                        : "使用微信"}{" "}
                      扫一扫
                    </div>
                  </div>
                ) : (
                  <div className="product-payment-paypal">
                    <Button
                      className="product-payment-paypal-button"
                      type="primary"
                    >
                      点此前往 Paypal 支付
                    </Button>
                  </div>
                )}
              </Col>
            )}
          </Row>
        )}
      </div>
    );
  }
}

export default PaymentDialog;
