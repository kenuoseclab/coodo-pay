import $axios from "@/$axios";
const initState = {
  productInfo: null,
  allProducts: null,
  setting: null
};
export const product = (state = initState, action) => {
  switch (action.type) {
    case "HANLDE_PRODUCT_INFO":
      return {
        ...state,
        productInfo: action.payload
      };
    case "HANLDE_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload
      };
    case "HANLDE_SETTING":
      return {
        ...state,
        setting: action.payload
      };
    default:
      return state;
  }
};

export const handleProductInfo = data => {
  return {
    type: "HANLDE_PRODUCT_INFO",
    payload: data
  };
};
export const handleAllProducts = data => {
  return {
    type: "HANLDE_ALL_PRODUCTS",
    payload: data
  };
};
export const handleSetting = data => {
  return {
    type: "HANLDE_SETTING",
    payload: data
  };
};
export const handleFetchProductInfo = productId => {
  // console.log(id, "redux");
  return async dispatch => {
    // console.log(productId, "redux");
    let metadata = await $axios.get(`/product/${productId}`);
    // console.log(metadata)
    let productInfo = metadata.data;

    // console.log(metadata, productInfo, "redux");
    dispatch(handleProductInfo(productInfo));
  };
};
export const handleFetchAllProduct = () => {
  // console.log(id, "redux");
  return async dispatch => {
    // console.log(productId, "redux");
    let metadata = await $axios.get(`/product/`);
    // console.log(metadata)
    let allProducts = metadata.data || [];

    // console.log(metadata, "redux");
    dispatch(handleAllProducts(allProducts));
  };
};
export const handleFetchSetting = () => {
  // console.log(id, "redux");
  return async dispatch => {
    // console.log(productId, "redux");
    let metadata = await $axios.get(`/setting/`);
    // console.log(metadata);
    let setting = metadata.data || null;

    // console.log(metadata, "redux");
    dispatch(handleSetting(setting));
  };
};
