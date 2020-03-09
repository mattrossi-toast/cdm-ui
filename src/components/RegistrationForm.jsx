import React, { Component, Fragment } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import {
  register,
  checkIfUserExists,
  validatePlayer
} from "../services/registrationService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      passwordConfValue: "",
      passwordsMatch: null,
      emailInvalid: false,
      loadingRegister: false
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleConfChange = this.handleConfChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.shouldShowError = this.shouldShowError.bind(this);
  }

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Montserrat"
      },
      button: {
        margin: theme.spacing(2)
      },
      placeholder: {
        height: 40
      }
    }));
    const classes = useStyles;
    return (
      <Fragment>
        <form
          style={{
            backgroundColor: "white",
            height: "25em",
            width: "25em",
            opacity: "0.5",
            fontFamily: "Montserrat"
          }}
        >
          <h1>Start Your Adventure.</h1>
          <TextField
            id="email"
            type="text"
            variant="outlined"
            required={true}
            label="Email"
            error={this.state.emailInvalid}
            helperText={this.state.emailInvalid ? "Email Invalid." : ""}
            onChange={this.handleEmailChange}
          />
          <p>Password:</p>
          <TextField
            id="pw"
            type="password"
            variant="outlined"
            label="Password"
            onChange={this.handlePWChange}
            error={this.shouldShowError()}
            helperText={this.shouldShowError() ? "Passwords must match." : ""}
          />
          <p>Confirm Password:</p>
          <TextField
            id="passwordConf"
            type="password"
            variant="outlined"
            label="Confirm Password"
            onChange={this.handleConfChange}
            error={this.shouldShowError()}
            helperText={this.shouldShowError() ? "Passwords must match." : ""}
          />
          <br />
          <Button
            id="register"
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Register
          </Button>
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
          <p style={{ color: "red" }}>{this.state.errorText}</p>
        </form>
        <Snackbar
          style={{ opacity: 1 }}
          open={this.state.registerOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ registerOpen: false })}
        >
          <MuiAlert
            style={{ opacity: 1 }}
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => this.setState({ registerOpen: false })}
          >
            Account already exists with this email.
          </MuiAlert>
        </Snackbar>
        <Snackbar
          style={{ opacity: 1 }}
          open={this.state.loginErrorOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ loginErrorOpen: false })}
        >
          <MuiAlert
            style={{ opacity: 1 }}
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => this.setState({ loginErrorOpen: false })}
          >
            Password must be at least 6 characters, contain one digit, one
            uppercase, and one lowercase letter
          </MuiAlert>
        </Snackbar>
        <Snackbar
          style={{ opacity: 1 }}
          open={this.state.registerSuccessOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ registerSuccessOpen: false })}
        >
          <MuiAlert
            style={{ opacity: 1 }}
            elevation={6}
            variant="filled"
            severity="success"
            onClose={() => this.setState({ registerSuccessOpen: false })}
          >
            Successfully Registered!
          </MuiAlert>
        </Snackbar>
      </Fragment>
    );
  }

  async handleClick() {
    console.log("Clicked!");
    this.setState({ errorText: "" });
    this.setState({ loadingRegister: true });
    this.setState({ loginErrorOpen: false });
    if (
      this.state.passwordValue === this.state.passwordConfValue &&
      this.emailIsValid(this.state.emailValue) &&
      this.checkPassword(this.state.passwordValue)
    ) {
      console.log("Password is valid");
      var response = await checkIfUserExists(this.state.emailValue).then(
        response =>
          response.json().then(json => {
            return json;
          })
      );
      if (response["Item"]) {
        if (response["Item"]["password"]) {
          this.setState({ registerOpen: true });
        } else {
          console.log("Validating player...");
          await validatePlayer(`{
            "email": "${this.state.emailValue}",
            "password": "${this.state.passwordValue}"
           }`).then(response => {
            console.log("Response: " + response);
            this.setState({ registerSuccessOpen: true });
          });
        }
      } else {
        await register(
          "https://cbbaj0nowb.execute-api.us-east-1.amazonaws.com/prod/",
          `{
           "email": "${this.state.emailValue}",
           "password": "${this.state.passwordValue}",
           "dm": "true"
          }`
        ).then(response => {});
        this.setState({ registerSuccessOpen: true });
      }
    }
    this.setState({ loadingRegister: false });
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
  checkPassword(password) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(passw)) {
      return true;
    } else {
      this.setState({
        loginErrorOpen: true
      });
      return false;
    }
  }
}
