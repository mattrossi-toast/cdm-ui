import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: "",
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
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
      </Fragment>
    );
  }

  componentDidMount() {
    var userId = UserProfile.getId();
    console.log(userId);
    if (!userId) {
      this.setState({ redirect: true });
    }
    var campaigns = getUserCampaigns(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/" +
        UserProfile.getId()
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    var items = campaigns.Items;
    //console.log(campaigns);
  }
}
