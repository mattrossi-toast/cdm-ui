import React, { Component, Fragment } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
export default class CharacterAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <Fragment>
        <p>{this.props.friendlyValue}:</p>
        <TextField onChange={this.handleChange}></TextField>
      </Fragment>
    );
  }

  handleChange(event) {
    this.props.onChange(this.props.value, event.target.value);
  }
}
