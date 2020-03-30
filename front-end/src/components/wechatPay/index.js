import React, { Component } from "react";
import { Form, Input, Button, Row, Select, message } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import "./index.css";
import $axios from "@/$axios";
const { Option } = Select;
class WechatPay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = values => {
    $axios.post(`/wechatPay/${this.props.formData._id}`, values).then(() => {
      message.success("保存成功");
    });
  };
  render() {
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 2 },
        sm: { span: 16, offset: 7 }
      }
    };
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 }
      },
      wrapperCol: {
        sm: { span: 10, offset: 0 }
      }
    };
    return (
      <div className="wechat-container" style={{ position: "relative" }}>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <WechatOutlined className="wechat-icon" />
          <p className="wechat-title">添加微信扫码支付</p>
        </Row>
        <div
          className="alipay-page-message"
          style={{ borderLeft: "4px solid #00bb0d" }}
        >
          <p className="alipay-message-title">注意事项： </p>
          <p>
            微信支付功能暂未开发，
            <br />
            <br />
            您可以前往Github star 本项目，鼓励开发者尽早开发
            <br />
            <br />
            <a href="https://" target="_blank" rel="noopener noreferrer">
              点我前往
            </a>
          </p>
        </div>
        <Form
          {...formItemLayout}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          // initialValues={this.props.formData ? this.props.formData : null}
          style={{ marginTop: "40px" }}
        >
          <Form.Item label="支付名称" name="paymentName">
            <Input placeholder="请输入支付名称" defaultValue="微信支付" />
          </Form.Item>
          <Form.Item
            label="公众账号ID"
            name="accountID"
            rules={[
              {
                required: true,
                message: "请输入公众账号ID"
              }
            ]}
          >
            <Input placeholder="请输入公众账号ID" />
          </Form.Item>
          <Form.Item
            label="商户ID"
            name="bussinessId"
            rules={[
              {
                required: true,
                message: "请输入您的商户ID"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入您的商户ID"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            name="secretKey"
            label="密匙"
            rules={[
              {
                required: true,
                message: "请输入密匙"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入密匙"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            name="signMethod"
            label="签名方式"
            rules={[
              {
                required: true,
                message: "选择签名方式"
              }
            ]}
          >
            <Select placeholder="选择签名方式">
              <Option value="MD5">MD5</Option>
              <Option value="SHA256">SHA256</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="问题一"
            name="answer1"
            rules={[
              {
                required: true,
                message: "请输入您就读小学的所在城市"
              }
            ]}
          >
            <Input placeholder="请输入您就读小学的所在城市" />
          </Form.Item>
          <Form.Item
            label="问题二"
            name="answer2"
            rules={[
              {
                required: true,
                message: "请输入您最高学历就读学校的所在城市"
              }
            ]}
          >
            <Input placeholder="请输入您最高学历就读学校的所在城市" />
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit" disabled>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default WechatPay;
