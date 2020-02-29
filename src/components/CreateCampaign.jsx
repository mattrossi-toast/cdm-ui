import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import createCampaign from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField, Button } from "@material-ui/core";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCampaignNameChange = this.handleCampaignNameChange.bind(this);
  }
  render() {
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <p>Campaign Name:</p>
        <TextField onChange={this.handleCampaignNameChange}></TextField>
        <Button onClick={this.handleClick}>Create Campaign</Button>
      </Fragment>
    );
  }

  async handleClick() {
    var response = await createCampaign(
      "https://y2etqw8sah.execute-api.us-east-1.amazonaws.com/prod/",
      `{
        "campaignName": "${this.state.campaignName}",
        "userId": "${UserProfile.getId()}"
       }`
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }
  handleCampaignNameChange(event) {
    this.setState({ campaignName: event.target.value });
  }
}
