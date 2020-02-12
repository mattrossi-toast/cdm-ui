import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { register } from "../services/registrationService";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      passwordConfValue: "",
      passwordsMatch: null,
      emailInvalid: false
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleConfChange = this.handleConfChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.shouldShowError = this.shouldShowError.bind(this);
  }

  render() {
    return (
      <form
        style={{
          color: "black"
        }}
      >
        <h1>Start Your Adventure.</h1>
        <p>Email:</p>
        <TextField
          id="email"
          type="text"
          variant="outlined"
          required={true}
          error={this.state.emailInvalid}
          helperText={this.state.emailInvalid ? "Email Invalid." : ""}
          onChange={this.handleEmailChange}
        />
        <p>Password:</p>
        <TextField
          id="pw"
          type="password"
          variant="outlined"
          onChange={this.handlePWChange}
          error={this.shouldShowError()}
          helperText={this.shouldShowError() ? "Passwords must match." : ""}
        />
        <p>Confirm Password:</p>
        <TextField
          id="passwordConf"
          type="password"
          variant="outlined"
          onChange={this.handleConfChange}
          error={this.shouldShowError()}
          helperText={this.shouldShowError() ? "Passwords must match." : ""}
        />
        <Button
          id="register"
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Register
        </Button>
      </form>
    );
  }

  handleClick() {
    if (
      this.state.passwordValue === this.state.passwordConfValue &&
      this.emailIsValid(this.state.emailValue)
    ) {
      register(
        "https://5kdnwwjgw6.execute-api.us-east-1.amazonaws.com/prod",
        `{
         "email": "${this.state.emailValue}",
         "password": "${this.state.passwordValue}"
        }`
      ).then(response => {
        console.log("data: " + JSON.stringify(response));
      });
    }
  }

  handleEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  handlePWChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  handleConfChange(event) {
    this.setState({ passwordConfValue: event.target.value });
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  shouldShowError() {
    if (this.state.passwordValue === this.state.passwordConfValue) {
      return false;
    } else {
      return true;
    }
  }
}
