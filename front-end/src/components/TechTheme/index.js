import React, { Component } from "react";
import "./index.css";
import { CheckOutlined } from "@ant-design/icons";
import Contact from "../contact";
import Query from "../queryDialog";
import { CloseOutlined } from "@ant-design/icons";
class TechTheme extends Component {
  constructor(props) {
    super(props);
    this.state = { showContact: false, showQuery: false };
  }
  handleContact = bool => {
    this.setState({ showContact: bool });
  };
  handleQuery = bool => {
    this.setState({ showQuery: bool });
  };
  render() {
    const { productInfo } = this.props;
    const renderLevelDesc = desc => {
      return desc.map((item, index) => {
        return (
          <li key={index}>
            <span>{item}</span>
            <CheckOutlined style={{ float: "right", lineHeight: "30px" }} />
          </li>
        );
      });
    };
    const renderProductInfo = product => {
      let arr = [];
      for (let i = 0; i < product.memberLevel; i++) {
        arr.push({
          levelName: product.levelName[i],
          levelPrice: product.levelPrice[i],
          levelDesc: product.levelDesc[i],
          levelLimit: product.levelLimit[i],
          levelNote: product.levelNote[i]
        });
      }
      return arr.map((item, index) => {
        return (
          <div
            className={`tech-level-container level-theme${index}`}
            key={index}
          >
            {item.levelLimit ? (
              <div className="tech-remain">
                <span className="tech-remain-amount">{item.levelLimit}</span>
                <span className="tech-remain-text">
                  剩余
                  <br />
                  名额
                </span>
                <img
                  className="tech-remain-bg"
                  src="/assets/remain.svg"
                  alt=""
                />
              </div>
            ) : null}
            {item.note ? (
              <div className="tech-remain">
                <span>{item.note}</span>
              </div>
            ) : null}
            <ul>
              <li className="tech-theme-level-name">{item.levelName}</li>
              <li className="tech-theme-level-price">
                <span style={{ fontSize: "25px", opacity: "0.6" }}>￥</span>
                <span style={{ fontSize: "50px" }}>
                  {item.levelPrice.price}
                </span>
                <span style={{ fontSize: "20px" }}>
                  /{item.levelPrice.unit}
                </span>
              </li>
              <li className="tech-theme-level-note">{item.levelNote}</li>
              <li className="tech-theme-level-desc">
                <ul>{renderLevelDesc(item.levelDesc)}</ul>
              </li>
              <li
                className="tech-theme-level-payment"
                onClick={() => {
                  this.props.handleDialog(true, item);
                }}
              >
                立即支付
              </li>
            </ul>
          </div>
        );
      });
    };
    return (
      <div className="tech-theme-container">
        {this.state.showContact || this.state.showQuery ? (
          <CloseOutlined
            className="contact-close"
            onClick={() => {
              this.handleContact(false);
              this.handleQuery(false);
            }}
          />
        ) : null}

        {this.state.showContact ? <Contact productInfo={productInfo} /> : null}
        {this.state.showQuery ? <Query /> : null}
        <div
          style={
            this.state.showContact
              ? {
                  position: "fixed",
                  width: "calc(100% - 17px)"
                }
              : {}
          }
        >
          <div
            className="contact-container-mask"
            style={
              this.state.showContact || this.state.showQuery
                ? {}
                : { display: "none" }
            }
          ></div>
          <img src="/assets/tech.svg" alt="" className="tech-bg" />
          <div className="tech-header">
            <span className="tech-header-name">{productInfo.productName}</span>
            <span className="tech-header-info">{productInfo.productInfo}</span>

            <span
              className="tech-header-contact"
              onClick={() => {
                this.handleContact(true);
              }}
            >
              联系我们
            </span>

            <span
              className="tech-header-query"
              onClick={() => {
                this.handleQuery(true);
              }}
            >
              查询订单
            </span>
          </div>
          <p className="tech-choose-title">选择您需要的会员方案</p>
          <div className="tech-body">{renderProductInfo(productInfo)}</div>
          <div className="tech-footer">
            Supported by
            <a
              href="https://github.com/troyeguo/coodo-pay"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Coodo Pay
            </a>
            , Copyright © 2020
            <a
              href="https://github.com/troyeguo"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              App by Troye
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TechTheme;
