import React from "react";
import { Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import "./error.scss";

const Error500 = props => {
  const goback = () => {
    props.history.push("/productList");
  };
  return (
    <Row gutter={24} className="wrap-500">
      <Col offset={4} sm={8} className="img-box" xs={15} />
      <Col offset={1} sm={10} className="content-error" xs={20}>
        <h1>500</h1>
        <p className="desc">抱歉，服务器错误</p>
        <div>
          <Button onClick={goback} type="primary">
            返回首页
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(Error500);
