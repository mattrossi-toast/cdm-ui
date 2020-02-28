import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import CampaignServices from "./CampaignServices";
import CharacterServices from "./CharacterServices";
export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <CampaignServices />
        <CharacterServices />
      </Fragment>
    );
  }
}
