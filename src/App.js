import "./App.css";
import React, { Component } from "react";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
