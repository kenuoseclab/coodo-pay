import React, { Component } from "react";
import { Form, Input, Button, Row, message } from "antd";
import { AlipayCircleOutlined } from "@ant-design/icons";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchForm } from "@/redux/form.redux";
import $axios from "@/$axios";
class Alipay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = values => {
    $axios
      .post(`/alipay/${this.props.formData._id}`, values)
      .then(() => {
        message.success("保存成功");
        this.props.handleFetchForm();
      })
      .catch(() => {
        message.error("验证失败");
      });
  };
  render() {
    // console.log(this.props.formData);
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
      <div className="alipay-container" style={{ position: "relative" }}>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <AlipayCircleOutlined className="alipay-icon" />
          <p className="alipay-title">添加支付宝当面付</p>
        </Row>
        <div className="alipay-page-message">
          <p className="alipay-message-title">注意事项： </p>
          <p>
            支付宝当面付需要到支付宝开发者平台提交申请，
            <br />
            <br />
            审核通过了才能使用，具体介绍可以参考如下链接
            <br />
            <br />
            <a
              href="https://51.ruyo.net/12354.html"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <Input placeholder="请输入支付名称" defaultValue="支付宝" />
          </Form.Item>
          <Form.Item
            label="应用ID"
            name="appId"
            rules={[
              {
                required: true,
                message: "请输入您申请的应用ID"
              }
            ]}
          >
            <Input placeholder="请输入您申请的应用ID" />
          </Form.Item>
          <Form.Item
            name="publicKey"
            label="支付宝公匙"
            rules={[
              {
                required: true,
                message: "请输入支付宝公匙"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入支付宝公匙（注意不是应用公匙）"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            name="secretKey"
            label="应用私匙"
            rules={[
              {
                required: true,
                message: "请输入RSA2(SHA256)私匙"
              }
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请输入RSA2(SHA256)私匙"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="服务器域名"
            name="notifyUrl"
            rules={[
              {
                required: true,
                message: "请输入您的服务器域名"
              }
            ]}
          >
            <Input placeholder="请输入您的服务器域名，请带上http或https" />
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
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const actionCreator = {
  handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(Alipay);
