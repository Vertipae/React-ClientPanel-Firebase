import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    // In app.js <Route exact path="/client/add" component={AddClient} />
    <Link to="/client/add" className="btn btn-success btn-block">
      <i className="fas fa-plus" /> New
    </Link>
  );
}
