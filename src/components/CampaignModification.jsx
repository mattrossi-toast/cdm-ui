import React, { Component, Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField } from "@material-ui/core";
import { register } from "../services/registrationService";

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

export default class CampaignModification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <Fragment>
        <p>{this.props.campaign["campaignName"]["S"]}</p>
        <TextField label="Email" onChange={this.handleChange}></TextField>
        <Button onClick={() => this.handleClick(this.props.campaign)}>
          {" "}
          Invite Player{" "}
        </Button>
      </Fragment>
    );
  }

  async componentDidMount() {
    var campaigns = await getUserCampaigns(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/c4e0077c-3f5f-48ed-a423-bb58d6de47db"
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );

    var names = [];
    const entries = Object.entries(campaigns.userDMCampaigns.Items);
    for (const campaign of entries) {
      names.push(campaign[1]["campaignName"]["S"]);
    }
    this.setState({ items: names });
  }

  async handleClick(event) {
    if (this.emailIsValid(this.state.email)) {
      const user = await register(
        "https://w7trdff2cc.execute-api.us-east-1.amazonaws.com/prod/",
        `{
         "email": "${this.state.email}",
         "dm": "false"
        }`
      ).then(response =>
        response.json().then(json => {
          return json;
        })
      );

      const uuid = user["uuid"];
      const email = user["email"];

      register(
        " https://e4c4akb7r1.execute-api.us-east-1.amazonaws.com/prod",
        `{
         "email": "${this.state.email}",
         "userId": "${uuid}",
         "campaignId": "${event.uuid.S}",
         "campaignName": "${event.campaignName.S}",
         "dmId": "${UserProfile.getId()}"
        }`
      ).then(response => {});
    }
  }

  async handleChange(event) {
    this.setState({ email: event.target.value });
  }
  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
