import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { handleUserInfo } from "../../redux/login.redux";
import "./index.css";
import $axios from "@/$axios";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isForget: false };
  }
  onFinish = values => {
    // console.log("Success:", values);
    if (this.state.isForget) {
      // console.log(true);
      $axios
        .post("/user/forget", values)
        .then(() => {
          message.success("修改成功，请使用新密码登录");
        })
        .catch(err => {
          message.error("安全问题验证失败");
        });
    } else {
      $axios
        .post("/user/login", values)
        .then(res => {
          // console.log(res.data);
          localStorage.setItem("jwt", res.data);
          this.props.history.push("/productList");
        })
        .catch(err => {
          message.error("登录失败");
        });
    }
  };

  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  handleForget = bool => {
    this.setState({ isForget: bool });
  };
  componentWillUnmount() {
    // componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
    this.setState = () => {
      return;
    };
  }

  render() {
    return (
      <div className="login-container">
        <img src="assets/login.svg" alt="" className="login-image" />
        <Row className="login-title" justify="center">
          <div style={{ width: "400px" }}>
            <img
              src="../assets/logo.svg"
              alt=""
              className="login-logo"
              style={{ width: "50px", marginTop: "70px", marginLeft: "70px" }}
            />

            <span className="login-logo-text">Coodo Pay</span>
          </div>
        </Row>

        <Row span={12} justify="center" className="login-subtitle">
          一个基于 React 和 Koa2 开发的在线支付系统
        </Row>
        <Row justify="center" span={8}>
          <div className="login-form">
            <Form
              className="login-form"
              initialValues={{
                remember: true
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              {this.state.isForget ? (
                <div>
                  <FormItem
                    name="answer1"
                    rules={[
                      { required: true, message: "请输入您就读小学的所在城市" }
                    ]}
                    style={{ marginBottom: "20px" }}
                  >
                    <Input
                      placeholder="请输入您就读小学的所在城市"
                      className="login-input"
                    />
                  </FormItem>
                  <FormItem
                    name="answer2"
                    rules={[
                      {
                        required: true,
                        message: "请输入您最高学历就读学校的所在城市！"
                      }
                    ]}
                  >
                    <Input
                      placeholder="请输入您最高学历就读学校的所在城市！"
                      className="login-input"
                    />
                  </FormItem>
                  <FormItem
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "请输入新密码"
                      }
                    ]}
                  >
                    <Input.Password
                      placeholder="请输入新密码"
                      className="login-input"
                      prefix={<LockOutlined />}
                    />
                  </FormItem>
                </div>
              ) : (
                <div>
                  <FormItem
                    name="email"
                    rules={[{ required: true, message: "请输入邮箱！" }]}
                  >
                    <Input
                      placeholder="邮箱"
                      className="login-input"
                      prefix={<UserOutlined />}
                      value="coodo@102410.xyz"
                    />
                  </FormItem>
                  <FormItem
                    name="password"
                    rules={[{ required: true, message: "请输入密码！" }]}
                    style={{ marginBottom: "20px" }}
                  >
                    <Input.Password
                      placeholder="密码"
                      prefix={<LockOutlined />}
                      className="login-input"
                      value="123456"
                    />
                  </FormItem>
                  <Row justify="space-between">
                    <Col style={{ height: "50px" }}>
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col
                      style={{
                        height: "30px",
                        lineHeight: "35px",
                        color: "#40a9ff",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.handleForget(true);
                      }}
                    >
                      忘记密码
                    </Col>
                  </Row>
                </div>
              )}

              <FormItem>
                <Button type="primary" htmlType="submit" block size="large">
                  {this.state.isForget ? "提交" : "登录"}
                </Button>
                {this.state.isForget ? (
                  <Button
                    size="large"
                    style={{ marginTop: "20px" }}
                    onClick={() => {
                      this.handleForget(false);
                    }}
                  >
                    返回
                  </Button>
                ) : null}
              </FormItem>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const actionCreator = {
  handleUserInfo
};
export default connect(mapStateToProps, actionCreator)(Login);
