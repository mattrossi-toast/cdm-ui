import React, { Component, Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField } from "@material-ui/core";
import { register } from "../services/registrationService";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export default class CharacterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      email: "",
      redirectToCharacter: false
    };
    /* this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);*/
  }
  render() {
    if (this.state.redirectToCharacter) {
      return (
        <Redirect
          push
          to={{
            pathname: "/view-character",
            state: { character: this.props.character }
          }}
        />
      );
    }
    return (
      <TableRow
        onClick={() => {
          this.setState({ redirectToCharacter: true });
        }}
      >
        <TableCell>{this.props.character["name"]["S"]}</TableCell>
        <TableCell align="right">
          {this.props.character["level"]["S"]}
        </TableCell>
        <TableCell align="right">{this.props.character["race"]["S"]}</TableCell>
        <TableCell align="right">
          {this.props.character["class"]["S"]}
        </TableCell>
        <TableCell align="right">
          {this.props.character["playerEmail"]
            ? this.props.character["playerEmail"]["S"]
            : "N/A"}
        </TableCell>
      </TableRow>
    );
  }
}
