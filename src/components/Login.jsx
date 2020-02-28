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
          <Redirect push to="/dashboard" />
        </div>
      );
    }
    return (
      <form
        style={{
          color: "black"
        }}
      >
        <p>Email:</p>
        <TextField
          id="email"
          type="text"
          variant="outlined"
          required={true}
          onChange={this.onEmailChange}
        />
        <p>Password:</p>
        <TextField
          id="pw"
          type="password"
          variant="outlined"
          onChange={this.onPasswordChange}
        />
        <Button color="inherit" onClick={this.handleClick}>
          Login
        </Button>
      </form>
    );
  }

  onEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  async handleClick() {
    var response = await login(
      "https://vpa9i50fnh.execute-api.us-east-1.amazonaws.com/prod",
      `{
        "email": "${this.state.emailValue}",
        "password": "${this.state.passwordValue}"
       }`
    ).then(response =>
      response.json().then(json => {
        console.log(json.loggedIn);
        return json;
      })
    );
    if (response.loggedIn == "true") {
      UserProfile.setId(response.userId.toString());
      this.setState({ redirect: true });
    }
  }
}
