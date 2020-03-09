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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default class ViewCharacters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: "",
      campaigns: [],
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
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
        <br></br>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={this.handleChange}>My Characters</Button>
          <Button
            onClick={() =>
              this.setState({ characters: this.state.allCharacters })
            }
          >
            All Characters
          </Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Character Name</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Race</TableCell>
                <TableCell align="right">Class</TableCell>
                <TableCell align="right">Player</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody> {items}</TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
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
    console.log("Characters: " + JSON.stringify(characters));
    var items = characters[0].Items;

    this.setState({ characters: items });
    this.setState({ allCharacters: items });
    console.log(items);
  }
  handleChange() {
    const characters = [];
    if (this.state.characters) {
      this.state.characters.forEach(item => {
        console.log(UserProfile.getId());
        if (item["playerId"]["S"] == UserProfile.getId()) {
          characters.push(item);
        }
      });
    }
    this.setState({ characters: characters });
  }
}
