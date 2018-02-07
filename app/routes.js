import Home from "./components/Home";
import Header from "./components/Header";

const routes = [
  {
    path: "/",
    exact: true,
    matches: args => checkAuth(args),
    component: Home
  },
  {
    path: "/header",
    component: Header
  }
];

export default routes;