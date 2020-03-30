import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import "./index.css";
import { connect } from "react-redux";
import $axios from "@/$axios";
import { handleFetchForm } from "@/redux/form.redux";
class MailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = values => {
    $axios
      .post(`/email/${this.props.email._id}`, values)
      .then(() => {
        message.success("保存成功");
        this.props.handleFetchForm();
      })
      .catch(() => {
        message.error("验证失败");
      });
  };
  render() {
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 2 },
        sm: { span: 16, offset: 4 }
      }
    };
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 8, offset: 0 }
      }
    };
    return (
      <div className="mail-page-container">
        <div
          className="order-page-header"
          style={{
            backgroundColor: "white",
            height: "100px",
            padding: "30px 20px"
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>邮箱设置</div>
          <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
            当用户完成下单，会通过邮件的方式向用户发送订单信息，在这里填写您用于发送订单的邮箱
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "20px 20px 0 20px",
            padding: "20px"
          }}
          className="mail-page-setting"
        >
          <div className="mail-page-message">
            <p className="mail-message-title">注意事项： </p>
            <p>
              目前发送邮件功能仅支持使用QQ邮箱发送，
              <br />
              <br />
              QQ邮箱授权码获取方式可以参考如下链接
              <br />
              <br />
              <a
                href="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
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
            // initialValues={this.props.email ? this.props.email : null}
            style={{ marginTop: "40px" }}
          >
            <Form.Item
              label="QQ邮箱地址"
              name="mailAddress"
              rules={[
                {
                  required: true,
                  message: "请输入QQ邮箱地址"
                }
              ]}
            >
              <Input placeholder="请输入QQ邮箱地址" />
            </Form.Item>
            <Form.Item
              label="QQ邮箱授权码"
              name="mailPassword"
              rules={[
                {
                  required: true,
                  message: "请输入QQ邮箱授权码"
                }
              ]}
            >
              <Input placeholder="请输入QQ邮箱授权码" />
            </Form.Item>
            <Form.Item
              label="发件人昵称"
              name="sendName"
              rules={[
                {
                  required: true,
                  message: "请输入发件人昵称"
                }
              ]}
            >
              <Input placeholder="请输入发件人昵称" />
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.form.email
  };
};
const actionCreator = {
  handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(MailPage);
