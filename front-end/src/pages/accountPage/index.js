import React, { Component } from "react";
import { Menu, Form, Input, Button, Descriptions, message, Modal } from "antd";
import { connect } from "react-redux";
// import "./index.css";
import { withRouter } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import $axios from "@/$axios";
const { Item } = Menu;
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
    sm: { span: 16, offset: 8 }
  }
};
const formItemLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 12, offset: 0 }
  }
};
class accountPage extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      info: "账户信息",
      changeMail: "更改邮箱",
      changePassword: "更改密码"
      // notification: "New Message Notification"
    };
    this.state = {
      mode: "inline",
      menuMap,
      selectKey: "info",
      loading: false
    };
  }
  info = () => {
    Modal.info({
      title: "检查到新版本",
      content: (
        <div>
          <p>快去 Github 更新吧！</p>
        </div>
      ),
      onOk: () => {
        this.setState({ loading: false });
      }
    });
  };

  onFinish = values => {
    // console.log(values);
    $axios.post(`/user/${this.props.user._id}`, values).then(() => {
      message.success("保存成功");
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  checkUpdate = async () => {
    this.setState({ loading: true });
    await $axios
      .get("https//coodopay.herokuapp.com/api/setting")
      .then(result => {
        if (result.data.version > this.props.setting.version) {
          this.info();
        } else {
          message.success("暂无版本更新");
          this.setState({ loading: false });
        }
      })
      .catch(() => {
        message.error("检查更新失败");
      });
  };
  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = key => {
    this.setState({
      selectKey: key
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = "inline";
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }

      this.setState({
        mode
      });
    });
  };
  renderAccountInfo = () => {
    // console.log(this.props.user);
    return (
      <Descriptions title="账户信息">
        <Descriptions.Item label="邮箱">
          {this.props.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="注册日期">
          {this.props.user.date}
        </Descriptions.Item>
        <Descriptions.Item label="当前版本">
          {this.props.setting.version}
        </Descriptions.Item>
        <Descriptions.Item label="检查更新">
          <Button
            type="primary"
            onClick={this.checkUpdate}
            loading={this.state.loading}
          >
            检查更新
          </Button>
          <a
            href="https://github.com/troyeguo/coodo-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;&nbsp;&nbsp;更新地址
          </a>
        </Descriptions.Item>
      </Descriptions>
    );
  };
  renderChangeEmail = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        initialValues={this.props.formData ? this.props.formData : null}
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          label="新邮箱"
          name="email"
          rules={[
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
    );
  };
  renderChangePassword = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        initialValues={this.props.formData ? this.props.formData : null}
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱"
            }
          ]}
          defaultValue={this.props.user.email}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入新密码"
            }
          ]}
        >
          <Input.Password placeholder="请输入新密码" />
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
    );
  };
  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case "info":
        return this.renderAccountInfo();

      case "changeMail":
        return this.renderChangeEmail();

      case "changePassword":
        return this.renderChangePassword();

      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    return (
      <div className={"main"} style={{ height: "100%" }}>
        <div className={"leftMenu"}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => this.selectKey(key)}
            className="payment-page"
            style={{
              marginTop: "10px"
            }}
          >
            {this.getMenu()}
          </Menu>
        </div>
        <div className={"right"}>{this.renderChildren()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.form.user,
    setting: state.product.setting
  };
};
const actionCreator = {
  // handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(withRouter(accountPage));
