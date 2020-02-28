import React, { Component, Fragment } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CampaignServices extends Component {
  render() {
    return (
      <Fragment>
        <Container maxWidth="sm">
          <h1>Campaign Services</h1>
          <Link to="/create-campaign">Create Campaign</Link> <br />
          <Link to="/modify-campaign">Modify Campaigns</Link>
        </Container>
      </Fragment>
    );
  }
}
