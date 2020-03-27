import React, { Component } from "react";
import {
  Steps,
  Button,
  message,
  Row,
  Form,
  Input,
  Checkbox,
  Result
} from "antd";
import { Link } from "react-router-dom";
import $axios from "@/$axios";
const { Step } = Steps;
const formItemLayoutWithOutLabel1 = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
    sm: { span: 16, offset: 11 }
  }
};
const formItemLayoutWithOutLabel2 = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
    sm: { span: 16, offset: 5 }
  }
};
const formItemLayout1 = {
  labelCol: {
    sm: { span: 6, offset: 0 }
  },
  wrapperCol: {
    sm: { span: 16, offset: 0 }
  }
};
const formItemLayout2 = {
  labelCol: {
    sm: { span: 0, offset: 1 }
  },
  wrapperCol: {
    sm: { span: 20, offset: 2 }
  }
};
class CollectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      formData: null
    };
  }
  onFinish = values => {
    // console.log(
    //   this.state.formData,
    //   { ...this.state.formData, ...values },
    //   "this.state.formData"
    // );
    if (values.password === values.passwordAgain) {
      this.setState({ formData: { ...this.state.formData, ...values } });
      if (this.state.current === 1) {
        $axios
          .post("/user", this.state.formData)
          .then(() => {
            this.next();
          })
          .catch(() => {
            message.error("出现错误，请稍后再试");
          });
      } else {
        this.next();
      }
    } else {
      message.warning("两次输入密码不一致");
    }
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const steps = [
      {
        title: "完善个人信息",
        content: (
          <Form
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            initialValues={this.state.formData ? this.state.formData : null}
            style={{ marginTop: "40px" }}
            defaultValue={this.state.formData}
            {...formItemLayout1}
          >
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "请输入邮箱"
                }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码"
                }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              label="再次输入"
              name="passwordAgain"
              rules={[
                {
                  required: true,
                  message: "请再次输入密码"
                }
              ]}
            >
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>

            <Form.Item {...formItemLayoutWithOutLabel1}>
              <Button type="primary" htmlType="submit">
                下一步
              </Button>
            </Form.Item>
          </Form>
        )
      },
      {
        title: "设置安全问题",
        content: (
          <Form
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            initialValues={this.state.formData ? this.state.formData : null}
            style={{ marginTop: "40px" }}
            {...formItemLayout2}
          >
            <Form.Item
              name="safeCheck"
              label="安全问题对于保护您的账户非常重要，请认真填写"
              rules={[
                {
                  required: true,
                  message: "请确认您已知晓安全问题的重要性"
                }
              ]}
            >
              <Checkbox.Group>
                <Checkbox value="我知道了" style={{ lineHeight: "32px" }}>
                  我知道了
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="您就读小学的所在城市"
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
              label="您最高学历就读学校的所在城市"
              name="answer2"
              rules={[
                {
                  required: true,
                  message: "您最高学历就读学校的所在城市"
                }
              ]}
            >
              <Input placeholder="您最高学历就读学校的所在城市" />
            </Form.Item>

            <Form.Item {...formItemLayoutWithOutLabel2}>
              <Button
                type="primary"
                htmlType="submit"
                className="collect-finish"
              >
                完成注册
              </Button>
            </Form.Item>
            <Button
              onClick={() => {
                this.prev();
              }}
              className="collect-prev"
            >
              上一步
            </Button>
          </Form>
        )
      },
      {
        title: "完成注册",
        content: (
          <Result
            status="success"
            title="注册成功"
            subTitle=""
            extra={
              <div>
                <Link to="/">
                  <Button type="primary" size="large">
                    前往登录
                  </Button>
                </Link>
              </div>
            }
            className="result"
            style={{ marginTop: "20px" }}
          ></Result>
        )
      }
    ];
    const { current } = this.state;
    return (
      <div>
        <img src="/assets/tech.svg" alt="" className="welcome-bg" />
        <Row justify="center" className="collect-steps-container">
          <Steps current={current} className="collect-steps">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content" className="collect-steps-box">
            {steps[current].content}
          </div>
        </Row>
      </div>
    );
  }
}

export default CollectInfo;
