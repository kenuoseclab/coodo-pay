import $axios from "@/$axios";
import axios from "axios";
const initState = {
  formData: null,
  alipay: null,
  wechatPay: null,
  paypal: null,
  email: null,
  user: null
};
export const form = (state = initState, action) => {
  switch (action.type) {
    case "HANDLE_FORM_DATA":
      return { ...state, formData: action.payload };
    case "HANDLE_ALIPAY":
      return { ...state, alipay: action.payload };
    case "HANDLE_WECHAT_PAY":
      return { ...state, wechatPay: action.payload };
    case "HANDLE_PAYPAL":
      return { ...state, paypal: action.payload };
    case "HANDLE_EMAIL":
      return { ...state, email: action.payload };
    case "HANDLE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const handleForm = data => {
  return {
    type: "HANDLE_FORM_DATA",
    payload: data
  };
};
export const handleAlipay = data => {
  return {
    type: "HANDLE_ALIPAY",
    payload: data
  };
};
export const handleWechatPay = data => {
  return {
    type: "HANDLE_WECHAT_PAY",
    payload: data
  };
};
export const handlePaypal = data => {
  return {
    type: "HANDLE_PAYPAL",
    payload: data
  };
};
export const handleEmail = data => {
  return {
    type: "HANDLE_EMAIL",
    payload: data
  };
};
export const handleUser = data => {
  return {
    type: "HANDLE_USER",
    payload: data
  };
};
export const handleFetchForm = () => {
  return dispatch => {
    axios
      .all([
        $axios(`/alipay`),
        $axios(`/wechatPay`),
        $axios(`/paypal`),
        $axios(`/email`),
        $axios(`/user`)
      ])
      .then(responseArr => {
        //this will be executed only when all requests are complete
        dispatch(handleAlipay(responseArr[0].data));
        dispatch(handleWechatPay(responseArr[1].data));
        dispatch(handlePaypal(responseArr[2].data));
        dispatch(handleEmail(responseArr[3].data));
        dispatch(handleUser(responseArr[4].data));
      });
  };
};
