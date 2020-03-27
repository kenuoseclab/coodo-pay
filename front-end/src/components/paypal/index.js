import React, { Component } from "react";
import { Form, Input, Button, Row, Select, message } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import "./index.css";
import $axios from "@/$axios";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1693087_csjervhanqr.js"
});
class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = values => {
    $axios.post(`/paypal/${this.props.formData._id}`, values).then(() => {
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
      <div className="paypal-container" style={{ position: "relative" }}>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <IconFont type="icon-social-paypal" className="paypal-icon" />
          <p className="paypal-title">添加 Paypal</p>
        </Row>
        <div
          className="alipay-page-message"
          style={{ borderLeft: "4px solid #113984" }}
        >
          <p className="alipay-message-title">注意事项： </p>
          <p>
            Paypal 支付功能暂未开发，
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
          initialValues={this.props.formData ? this.props.formData : null}
          style={{ marginTop: "40px" }}
        >
          <Form.Item label="支付名称" name="paymentName">
            <Input placeholder="请输入支付名称" defaultValue="Paypal" />
          </Form.Item>
          <Form.Item
            label="ClientID"
            name="clientID"
            rules={[
              {
                required: true,
                message: "请输入您申请的ClientID"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入您申请的ClientID"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            name="secretKey"
            label="Paypal 私匙"
            rules={[
              {
                required: true,
                message: "请输入 Paypal 私匙"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入 Paypal 私匙"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="兑换汇率"
            name="exchangeRate"
            rules={[
              {
                required: true,
                message: "请输入兑换汇率"
              }
            ]}
          >
            <Input placeholder="请输入兑换汇率" />
          </Form.Item>

          <Form.Item
            name="mode"
            label="工作模式"
            rules={[
              {
                required: true,
                message: "选择工作模式"
              }
            ]}
          >
            <Select placeholder="选择模式">
              <Select.Option value="生产模式">生产模式</Select.Option>
              <Select.Option value="沙盒模式">沙盒模式</Select.Option>
            </Select>
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

export default Paypal;
