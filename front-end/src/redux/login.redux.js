const initState = {
  userInfo: null
};
export const login = (state = initState, action) => {
  switch (action.type) {
    case "HANDLE_USER_INFO":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
export const handleUserInfo = data => {
  return {
    type: "HANDLE_USER_INFO",
    payload: data
  };
};
