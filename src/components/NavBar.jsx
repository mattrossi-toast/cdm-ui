import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/Icon";
import Logo from "../images/logo.png";
import Login from "./Login";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  render() {
    const classes = useStyles;
    if (this.state.redirect) {
      return (
        <div>
          <Redirect push to="/dashboard" />
        </div>
      );
    }
    return (
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to right, #506F7C, #388086)",
          width: "100%",
          position: "sticky"
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img
              src={Logo}
              alt="Critical DM Logo"
              style={{ height: "70px", width: "100px" }}
              edge="start"
              onClick={this.handleRedirect}
            />
          </Typography>
          {this.props.isLoggedIn ? <span /> : <Login />}
        </Toolbar>
      </AppBar>
    );
  }

  handleRedirect() {
    this.setState({ redirect: true });
  }
}
