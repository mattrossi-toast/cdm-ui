import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import login from "../services/loginService";
import Dashboard from "./Dashboard";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
    const useStyles = makeStyles(theme => ({
      root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      button: {
        margin: theme.spacing(2)
      },
      placeholder: {
        height: 40
      }
    }));
    const classes = useStyles;
    if (this.state.redirect) {
      return (
        <div>
          <Redirect push to="/dashboard" />
        </div>
      );
    }
    return (
      <Fragment>
        <form
          style={{
            color: "black"
          }}
        >
          <TextField
            id="email"
            type="text"
            variant="outlined"
            required={true}
            label="Email"
            onChange={this.onEmailChange}
          />

          <TextField
            id="pw"
            type="password"
            variant="outlined"
            label="Password"
            onChange={this.onPasswordChange}
          />
          <Button color="inherit" onClick={this.handleClick}>
            Login
          </Button>
          <p style={{ color: "red" }}>{this.state.errorText}</p>
        </form>
        <div className={classes.placeholder}>
          <Fade
            in={this.state.loadingRegister}
            style={{
              transitionDelay: this.state.loadingRegister ? "800ms" : "0ms"
            }}
            unmountOnExit
          >
            <LinearProgress />
          </Fade>
        </div>
      </Fragment>
    );
  }

  onEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  async handleClick() {
    this.setState({ errorText: "" });
    this.setState({ loadingRegister: true });
    var response = await login(
      "https://vpa9i50fnh.execute-api.us-east-1.amazonaws.com/prod",
      `{
        "email": "${this.state.emailValue}",
        "password": "${this.state.passwordValue}"
       }`
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    if (response.LoggedIn == "true") {
      UserProfile.setId(response.UserId.toString());
      this.setState({ redirect: true });
    } else {
      this.setState({ errorText: "Email or Password Invalid." });
    }
    this.setState({ loadingRegister: false });
  }
}
