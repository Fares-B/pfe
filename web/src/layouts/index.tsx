import Private from "./Private";
import Public from "./Public";
import { HashRouter as Router } from "react-router-dom";

export default function Layout() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ height: "100vh" }}>
      <Router>
        {token ? <Private token={token} /> : <Public />}
      </Router>
    </div>
  );
}
