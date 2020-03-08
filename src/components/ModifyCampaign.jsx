import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CampaignModification from "./CampaignModification";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: "",
      campaigns: [],
      redirect: false
    };
  }
  render() {
    if (this.state.redirect) {
      return (
        <div>
          <Redirect push to="/" />
        </div>
      );
    }
    const items = [];
    if (this.state.campaigns) {
      const campaigns = this.state.campaigns;
      for (const campaign of campaigns) {
        items.push(
          <CampaignModification campaign={campaign}></CampaignModification>
        );
      }
    }

    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        {items}
      </Fragment>
    );
  }

  async componentDidMount() {
    var userId = UserProfile.getId();

    if (!userId) {
      this.setState({ redirect: true });
    }
    var campaigns = await getUserCampaigns(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/" +
        UserProfile.getId()
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    var items = campaigns.Items;
    this.setState({ campaigns: items });
  }
}
