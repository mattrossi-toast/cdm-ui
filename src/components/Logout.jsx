import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import login from "../services/loginService";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import { Redirect, Switch, Route } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  render() {
    if (this.state.redirect) {
      return (
        <div>
          <Redirect push to="/" />
        </div>
      );
    }
    return (
      <Button color="inherit" onClick={this.handleClick}>
        Logout
      </Button>
    );
  }

  onEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  async handleClick() {
    UserProfile.setId("");
    this.setState({ redirect: true });
  }
}
