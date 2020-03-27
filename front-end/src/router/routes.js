import Dashboard from "../pages/dashboard";
import ProductPage from "../pages/productPage";
import AddProduct from "../pages/addProduct";
import OrderPage from "../pages/orderPage";
import PaymentPage from "../pages/paymentPage";
import MailPage from "../pages/mailPage";
import ThemePage from "../pages/themePage";
import AccountPage from "../pages/accountPage";
import Error404 from "../pages/errorPage/error404";
import Error500 from "../pages/errorPage/error500";

export const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/productList", component: ProductPage },
  { path: "/productAdd", component: AddProduct },
  { path: "/order", component: OrderPage },
  { path: "/payment", component: PaymentPage },
  { path: "/mail", component: MailPage },
  { path: "/theme", component: ThemePage },
  { path: "/account", component: AccountPage },
  { path: "/error/404", component: Error404 },
  { path: "/error/500", component: Error500 }
];
