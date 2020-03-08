import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import { Button } from "@material-ui/core";
export default class SpellsButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Fragment>
        <Button onClick={this.props.onClick} show={false}>
          {this.props.showModal ? "Submit" : "Show Spells"}
        </Button>
      </Fragment>
    );
  }
}
