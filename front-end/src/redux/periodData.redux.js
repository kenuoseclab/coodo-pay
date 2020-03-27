import $axios from "@/$axios";
const initState = {
  salesByPeriod: null,
  visitsByPeriod: null,
  ordersByPeriod: null,
  allSales: null,
  allVisits: null,
  allOrders: null,
  period: null
};
export function periodData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_PERIOD":
      return {
        ...state,
        salesByPeriod: action.payload
      };
    case "HANDLE_VISITS_BY_PERIOD":
      return {
        ...state,
        visitsByPeriod: action.payload
      };
    case "HANDLE_ORDERS_BY_PERIOD":
      return {
        ...state,
        ordersByPeriod: action.payload
      };
    case "HANDLE_ALL_SALES":
      return {
        ...state,
        allSales: action.payload
      };
    case "HANDLE_ALL_VISITS":
      return {
        ...state,
        allVisits: action.payload
      };
    case "HANDLE_ALL_ORDERS":
      return {
        ...state,
        allOrders: action.payload
      };
    case "HANDLE_PERIOD":
      return {
        ...state,
        period: action.payload
      };
    default:
      return state;
  }
}

export function handleSalesByPeriod(salesByPeriod) {
  return { type: "HANDLE_SALES_BY_PERIOD", payload: salesByPeriod };
}
export function handleVisitsByPeriod(visitsByPeriod) {
  return { type: "HANDLE_VISITS_BY_PERIOD", payload: visitsByPeriod };
}
export function handleOrdersByPeriod(ordersByPeriod) {
  return { type: "HANDLE_ORDERS_BY_PERIOD", payload: ordersByPeriod };
}
export function handleAllSales(data) {
  return { type: "HANDLE_ALL_SALES", payload: data };
}
export function handleAllVisits(data) {
  return { type: "HANDLE_ALL_VISITS", payload: data };
}
export function handleAllOrders(data) {
  return { type: "HANDLE_ALL_ORDERS", payload: data };
}
export function handlePeriod(period) {
  return { type: "HANDLE_PERIOD", payload: period };
}
export function handleFetchByPeriod(catergory) {
  // console.log(catergory);
  return async dispatch => {
    let salesByPeriod = [];
    let visitsByPeriod = [];
    let ordersByPeriod = [];
    let period = [];
    // let maxDay = moment().daysInPeriod();
    let date = new Date();
    // console.log(date.getFullYear());

    // console.log(localStorage.getItem("jwt"));
    let metadata = await $axios(
      `/stats?year=${date.getFullYear()}&&month=${date.getMonth() +
        1}&&day=${date.getDate()}`
    );
    // console.log(metadata, "metadata");
    let id = metadata.data[0] !== undefined ? metadata.data[0].number : 14;
    for (let i = id - 14; i <= id; i++) {
      $axios.defaults.headers.common["X-token"] = localStorage.getItem("jwt");
      let metadata = await $axios(`/stats?number=${i}`);
      let totalSales =
        metadata.data[0] !== undefined ? metadata.data[0].totalSales : [0];
      let totalVisits =
        metadata.data[0] !== undefined ? metadata.data[0].totalVisits : [0];
      let totalOrders =
        metadata.data[0] !== undefined ? metadata.data[0].totalOrders : [0];
      let date =
        metadata.data[0] !== undefined
          ? `${metadata.data[0].month}-${metadata.data[0].day}`
          : "00-00";
      // console.log(metadata);

      period.push(date);

      salesByPeriod.push(parseInt(totalSales));

      visitsByPeriod.push(parseInt(totalVisits));

      ordersByPeriod.push(parseInt(totalOrders));
    }
    dispatch(handlePeriod(period.splice(1, 14)));
    // console.log(salesByPeriod);

    dispatch(handleSalesByPeriod(salesByPeriod));

    dispatch(handleVisitsByPeriod(visitsByPeriod));

    dispatch(handleOrdersByPeriod(ordersByPeriod));
    dispatch(handleAllSales(salesByPeriod[14] || "00"));

    dispatch(handleAllVisits(visitsByPeriod[14] || "00"));

    dispatch(handleAllOrders(ordersByPeriod[14] || "00"));
  };
}
