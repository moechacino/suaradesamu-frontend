import { Router, Route } from "preact-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./view/admin/login";
import Dashboard from "./view/admin/dashboard";
import "./app.css";
import InputCandidate from "./view/admin/inputCandidate";
import InputVoter from "./view/admin/InputVoter";
import AuthRoute from "./components/AuthRoutes";
import Transactions from "./view/transactions";

export function App() {
  return (
    <div style="background-color: #ECF8F7; height: 100% ; margin:0; min-height: 100vh; ">
      <Router>
        <Route path="/" component={Transactions} />
        <Route path="/admin" component={Login} />

        <AuthRoute path="/admin/dashboard" component={Dashboard} />

        <AuthRoute
          path="/admin/dashboard/input-candidate"
          component={InputCandidate}
        />

        <AuthRoute path="/admin/dashboard/input-voter" component={InputVoter} />
      </Router>
    </div>
  );
}
