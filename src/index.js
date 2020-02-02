import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

ReactDOM.render(
  <React.Fragment>
    <NavBar></NavBar>
    <Hero />
  </React.Fragment>,
  document.getElementById("root")
);
