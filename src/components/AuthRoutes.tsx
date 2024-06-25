import Cookies from "js-cookie";
import { route, Route } from "preact-router";
import Login from "../view/admin/login";

export default function AuthRoute(props: any) {
  if (Cookies.get("token") === undefined) {
    alert("You are not authorized");
    route("/admin");
    return <Route path="/admin" component={Login} />;
  } else {
    return <Route {...props} />;
  }
}
