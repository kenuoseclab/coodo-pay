import React, { Component } from "react";
import { Card, List, message } from "antd";
import "./index.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import $axios from "@/$axios";
import { CheckOutlined } from "@ant-design/icons";

class ThemePage extends Component {
  constructor(props) {
    super(props);
    this.state = { showMask: false, demo: null };
  }
  handleApply = theme => {
    $axios
      .post(`/setting/${this.props.setting._id}`, {
        ...this.props.setting,
        themeOption: theme
      })
      .then(() => {
        message.success("应用成功，快去产品页查看效果吧");
      })
      .catch(() => {
        message.error("应用失败，请稍后重试");
      });
  };
  render() {
    // console.log(this.props.setting._id);
    const cardList = (
      <List
        rowKey="id"
        // loading={loading}
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1
        }}
        dataSource={[
          {
            id: "default",
            title: "默认主题",
            cover: "/assets/default.svg",
            href: "",
            subDescription: "没有你，良辰美景更与何人说！"
          },
          {
            id: "tech",
            title: "科技主题",
            cover: "/assets/tech.svg",
            href: "",
            subDescription: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆"
          }
        ]}
        renderItem={(item, index) => (
          <List.Item>
            <Card
              className={"theme-card"}
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.cover}
                  className="theme-card-cover"
                />
              }
              actions={[
                <div
                  key="apply"
                  onClick={() => {
                    this.handleApply(item.id);
                  }}
                >
                  <CheckOutlined />
                  &nbsp; 应用主题
                </div>
              ]}
            >
              <Card.Meta title={item.title} description={item.subDescription} />
            </Card>
          </List.Item>
        )}
      />
    );

    return (
      <div className={"coverCardList"} style={{ margin: "20px" }}>
        <div className={"cardList"} style={{ margin: "20px 0px" }}>
          {cardList}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // allProducts: state.product.allProducts,
    setting: state.product.setting
  };
};
const actionCreator = {
  // handleFetchAllProduct
};
export default connect(mapStateToProps, actionCreator)(withRouter(ThemePage));
