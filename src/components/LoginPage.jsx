import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";

export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <NavBar></NavBar>
        <Hero />
      </Fragment>
    );
  }
}
