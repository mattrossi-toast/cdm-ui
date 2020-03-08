import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CampaignModification from "./CampaignModification";
import { getDMCharacters } from "../services/characterService";
import CharacterView from "./CharacterView";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class ViewCharacters extends Component {
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
    if (this.state.characters) {
      const characters = this.state.characters;
      for (const character of characters) {
        console.log(character);
        items.push(<CharacterView character={character}></CharacterView>);
      }
    }

    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Character Name</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Race</TableCell>
                <TableCell align="right">Class</TableCell>
                <TableCell align="right">Player</TableCell>
              </TableRow>
            </TableHead>
            <TableBody> {items}</TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }

  async componentDidMount() {
    var userId = UserProfile.getId();

    if (!userId) {
      this.setState({ redirect: true });
    }
    var characters = await getDMCharacters().then(response =>
      response.json().then(json => {
        return json;
      })
    );
    var items = characters.Items;
    this.setState({ characters: items });
    console.log(items);
  }
}
