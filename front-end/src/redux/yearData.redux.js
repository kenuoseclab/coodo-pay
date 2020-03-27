import $axios from "@/$axios";
const initState = {
  salesByYear: null,
  visitsByYear: null,
  ordersByYear: null
};
export function yearData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_YEAR":
      return {
        ...state,
        salesByYear: action.payload
      };
    case "HANDLE_VISITS_BY_YEAR":
      return {
        ...state,
        visitsByYear: action.payload
      };
    case "HANDLE_ORDERS_BY_YEAR":
      return {
        ...state,
        ordersByYear: action.payload
      };
    default:
      return state;
  }
}
export function handleSalesByYear(salesByYear) {
  return { type: "HANDLE_SALES_BY_YEAR", payload: salesByYear };
}
export function handleVisitsByYear(visitsByYear) {
  return { type: "HANDLE_VISITS_BY_YEAR", payload: visitsByYear };
}
export function handleOrdersByYear(ordersByYear) {
  return { type: "HANDLE_ORDERS_BY_YEAR", payload: ordersByYear };
}

export function handleFetchByYear(catergory) {
  // console.log(catergory);
  return async dispatch => {
    let salesByYear = [];
    let visitsByYear = [];
    let ordersByYear = [];
    let date = new Date();
    for (let i = 1; i <= 12; i++) {
      let metadata = await $axios({
        method: "get",
        url: `/salesData?year=${date.getFullYear()}&&month=${i}`
      });
      let sales = 0;
      metadata.data.forEach(item => {
        sales += parseFloat(item.sales);
      });
      let visits = 0;
      metadata.data.forEach(item => {
        visits += parseFloat(item.visits);
      });
      let orders = 0;
      metadata.data.forEach(item => {
        orders += parseFloat(item.orders);
      });
      // console.log(amount);

      salesByYear.push(parseInt(sales));

      visitsByYear.push(parseInt(visits));

      ordersByYear.push(parseInt(orders));
    }
    // console.log(salesByYear);

    dispatch(handleSalesByYear(salesByYear));

    dispatch(handleVisitsByYear(visitsByYear));

    dispatch(handleOrdersByYear(ordersByYear));
  };
}
