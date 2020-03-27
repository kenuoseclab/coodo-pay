import React, { Component } from "react";
import { Descriptions, Row, Button } from "antd";
import { parseFormData } from "../../../utils/productUtil";
class AddStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { formData } = this.props;
    // console.log(formData, "two");
    const renderContact = contact => {
      // console.log(descArr);
      return contact.split("\n").map((item, index) => {
        return <div key={index}>{item}</div>;
      });
    };
    const renderLevelTable = (levels, data) => {
      const {
        levelName,
        levelPrice,
        levelDesc,
        levelLimit,
        levelNote
      } = parseFormData(data,null);

      // console.log(levelNote, "levelNote");
      let arr = [];
      for (let i = 1; i <= levels; i++) {
        arr.push(i);
      }
      const renderLevelDesc = descArr => {
        // console.log(descArr);
        return descArr.map((item, index) => {
          return <div key={index}>{item}</div>;
        });
      };

      // console.log(arr, "arr");
      return arr.map(item => {
        return (
          <Descriptions.Item label={`等级${item}方案`} span={3} key={item}>
            等级{item}名称: {levelName[item - 1]}
            <br />
            等级{item}价格:{" "}
            {`${levelPrice[item - 1].price}元/${levelPrice[item - 1].unit}`}
            <br />
            等级{item}特权描述:
            <br />
            {renderLevelDesc(levelDesc[item - 1])}
            <br />
            等级{item}限购数量: {levelLimit[item - 1]}
            <br />
            等级{item}备注: {levelNote[item - 1]}
            <br />
          </Descriptions.Item>
        );
      });
    };
    return (
      <div className="add-step-two" style={{ padding: "50px 150px" }}>
        <Descriptions
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="产品名称">
            {formData.productName}
          </Descriptions.Item>
          <Descriptions.Item label="产品介绍" span={2}>
            {formData.productInfo}
          </Descriptions.Item>
          {renderLevelTable(formData.memberLevel, formData)}
          <Descriptions.Item label="发货方式">自动发货</Descriptions.Item>
          <Descriptions.Item label="是否在售">在售</Descriptions.Item>
          <Descriptions.Item label="发送邮件">发送邮件</Descriptions.Item>
          <Descriptions.Item label={`联系方式`} span={3}>
            {renderContact(formData.contact)}
          </Descriptions.Item>
        </Descriptions>
        <Row justify="center" style={{ marginTop: "40px" }}>
          <Button
            onClick={this.props.handlePrev}
            style={{ marginRight: "30px" }}
          >
            上一步
          </Button>
          <Button type="primary" onClick={this.props.handleNext}>
            提交
          </Button>
        </Row>
      </div>
    );
  }
}

export default AddStepTwo;
