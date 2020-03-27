import $axios from "@/$axios";
const initState = {
  salesByWeek: null,
  visitsByWeek: null,
  ordersByWeek: null
};
export function weekData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_WEEK":
      return {
        ...state,
        salesByWeek: action.payload
      };
    case "HANDLE_VISITS_BY_WEEK":
      return {
        ...state,
        visitsByWeek: action.payload
      };
    case "HANDLE_ORDERS_BY_WEEK":
      return {
        ...state,
        ordersByWeek: action.payload
      };
    default:
      return state;
  }
}

export function handleSalesByWeek(salesByWeek) {
  return { type: "HANDLE_SALES_BY_WEEK", payload: salesByWeek };
}
export function handleVisitsByWeek(visitsByWeek) {
  return { type: "HANDLE_VISITS_BY_WEEK", payload: visitsByWeek };
}
export function handleOrdersByWeek(ordersByWeek) {
  return { type: "HANDLE_ORDERS_BY_WEEK", payload: ordersByWeek };
}

export function handleFetchByWeek(catergory) {
  // console.log(catergory);
  return async dispatch => {
    let salesByWeek = [];
    let visitsByWeek = [];
    let ordersByWeek = [];
    // let maxDay = moment().daysInWeek();
    let date = new Date();
    // console.log(date.getFullYear());
    let metadata = await $axios({
      method: "get",
      url: `/salesData?year=${date.getFullYear()}&&month=${date.getMonth() +
        1}&&day=${date.getDate()}`
    });
    // console.log(metadata, "metadata");
    let id = metadata.data[0] ? metadata.data[0].number : 0;
    for (let i = id - ((date.getDay() + 6) % 7); i <= id; i++) {
      let metadata = await $axios({
        method: "get",
        url: `/salesData?number=${i}`
      });
      let sales = metadata.data[0] !== undefined ? metadata.data[0].sales : 0;
      let visits = metadata.data[0] !== undefined ? metadata.data[0].visits : 0;
      let orders = metadata.data[0] !== undefined ? metadata.data[0].orders : 0;
      // console.log(metadata);

      salesByWeek.push(parseInt(sales));

      visitsByWeek.push(parseInt(visits));

      ordersByWeek.push(parseInt(orders));
    }
    // console.log(salesByWeek);

    dispatch(handleSalesByWeek(salesByWeek));

    dispatch(handleVisitsByWeek(visitsByWeek));

    dispatch(handleOrdersByWeek(ordersByWeek));
  };
}
