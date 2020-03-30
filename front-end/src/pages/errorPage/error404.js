import React from "react";
import { Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import "./error.scss";

const Error404 = props => {
  const goback = () => {
    props.history.push("/productList");
  };
  return (
    <Row gutter={24} className="wrap-404">
      <Col offset={4} sm={8} className="img-box" xs={10} />
      <Col offset={1} sm={10} className="content-error" xs={20}>
        <h1>404</h1>
        <p className="desc">抱歉，你访问的页面不存在</p>
        <div>
          <Button onClick={goback} type="primary">
            返回首页
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(Error404);
