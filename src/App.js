import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/layout/AppNavbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <h1>Everything went smoothly or did it?</h1>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
