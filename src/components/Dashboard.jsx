import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import CampaignServices from "./CampaignServices";
import Grid from "@material-ui/core/Grid";
import CharacterServices from "./CharacterServices";
import { Paper } from "@material-ui/core";
export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <CampaignServices />
              <br />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <CharacterServices />
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
