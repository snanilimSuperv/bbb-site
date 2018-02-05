import Home from "./components/Home";
import Header from "./components/Header";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/header",
    component: Header
  }
];

export default routes;