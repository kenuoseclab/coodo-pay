import React, { Component } from "react";
import { Table, Button, Input, DatePicker } from "antd";
import $axios from "@/$axios";
import axios from "axios";
import moment from "moment";
// import "./index.css";
const dateFormat = "YYYY-MM-DD";
const { Search } = Input;
class TableSearch extends Component {
  state = {
    data: [],
    pagination: {
      pageSize: 10,
      current: 1
    },
    loading: false,
    selectedRowKeys: [],
    columns: [
      {
        title: "订单号",
        dataIndex: "orderId",
        key: "orderId",
        width: 180
      },
      {
        title: "产品名称",
        key: "productName",
        dataIndex: "productName",
        width: 100
      },
      {
        title: "产品等级",
        key: "levelName",
        dataIndex: "levelName",
        width: 100
      },
      {
        title: "支付状态",
        key: "paymentStatus",
        dataIndex: "paymentStatus",
        width: 100
      },
      {
        title: "会员码",
        key: "code",
        dataIndex: "code",
        width: 200
      },
      {
        title: "激活状态",
        key: "activation",
        dataIndex: "activation",
        width: 100
      },
      {
        title: "创建日期",
        dataIndex: "date",
        key: "date",
        width: 100
      },

      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        width: 100
      },
      {
        title: "支付方式",
        dataIndex: "payment",
        key: "payment",
        width: 100
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        width: 200
      },
      {
        title: "IP地址",
        dataIndex: "ip",
        key: "ip",
        width: 200
      }
    ]
  };

  componentWillMount() {
    this.fetch();
  }

  componentWillUnmount() {
    // componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
    this.setState = () => {
      return;
    };
  }
  // 切换分页

  fetch = (params = {}) => {
    this.setState({ loading: true });
    $axios
      .get("/order/all", {
        params: { ...params }
      })
      .then(data => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.data.length;
        this.setState({
          loading: false,
          data: data.data,
          pagination
        });
      });
  };

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  handleSearch = value => {
    axios
      .all([
        $axios(`/order/all?orderId=${value}`),
        $axios(`/order/all?email=${value}`)
      ])
      .then(responseArr => {
        //this will be executed only when all requests are complete
        const pagination = { ...this.state.pagination };
        let data = [];
        responseArr.forEach(item => {
          data.push(...item.data);
        });
        pagination.total = data.length;
        this.setState({
          loading: false,
          data: data,
          pagination
        });
      });
  };
  handleReset = () => {
    // this.props.form.resetFields();
    this.fetch();
    let inputBox = document.querySelector(".ant-input");
    inputBox.value = "";
    // console.log(inputBox);
  };
  onDateChange = (date, dateString) => {
    // console.log(date._d.getDate(), dateString);
    this.fetch({
      year: date._d.getFullYear(),
      month: date._d.getMonth() + 1,
      day: date._d.getDate()
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };
    const date = new Date();
    return (
      <div className="shadow-radius">
        <div
          className="order-page-header"
          style={{
            backgroundColor: "white",
            height: "100px",
            padding: "30px 20px"
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>订单管理</div>
          <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
            在这里查找，管理以往所有的订单和会员码
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            height: "80px",
            margin: "20px 20px 0 20px"
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              float: "left",
              lineHeight: "80px",
              fontSize: "18px"
            }}
          >
            搜索订单
          </div>
          <Search
            placeholder="搜索订单号、Email"
            enterButton="搜索"
            style={{
              width: 300,
              margin: "25px 10px 25px 10px",
              float: "left",
              height: "20px",
              fontSize: "25px"
            }}
            onSearch={value => {
              this.handleSearch(value);
            }}
            // allowClear={true}
          />
          <DatePicker
            defaultValue={moment(`${date.toLocaleDateString()}`, dateFormat)}
            format={dateFormat}
            onChange={this.onDateChange}
            style={{
              width: 200,
              margin: "25px 20px",
              float: "left"
            }}
          />
          <Button
            // type="primary"
            onClick={this.handleReset}
            style={{
              // width: 40,
              margin: "25px 10px",
              float: "left",
              color: "#40A9FF !important"
            }}
          >
            重置
          </Button>
        </div>
        <div
          className="order-page-body"
          style={{ backgroundColor: "white", margin: "0px 20px" }}
        >
          <Table
            // bordered={false}
            columns={this.state.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            // pagination={paginationProps}
            rowKey={record => record}
            rowSelection={rowSelection}
            style={{ userSelect: "text" }}
            scroll={{ x: 800 }}
          />
        </div>
      </div>
    );
  }
}

export default TableSearch;
