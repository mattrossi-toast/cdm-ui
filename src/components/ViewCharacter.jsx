import React, { Component, Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "./NavBar";
import {
  getCharacterInventory,
  deleteCharacterInventory,
  getCharacterSpells,
  deleteCharacterSpell
} from "../services/characterService";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "Montserrat"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontFamily: "Montserrat"
  }
}));

const paperStyle = {
  fontFamily: "Montserrat",
  textAlign: "center"
};

export default class ViewCharacter extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state) {
      this.state = {
        campaignId: this.props.location.state.character["campaignId"]["S"],
        class: this.props.location.state.character["class"]["S"],
        background: this.props.location.state.character["background"]
          ? this.props.location.state.character["background"]["S"]
          : "",
        level: this.props.location.state.character["level"]["S"],
        race: this.props.location.state.character["race"]["S"],
        alignment: this.props.location.state.character["alignment"]["S"],
        strength: this.props.location.state.character["strength"]["S"],
        intelligence: this.props.location.state.character["intelligence"]["S"],
        dexterity: this.props.location.state.character["dexterity"]["S"],
        wisdom: this.props.location.state.character["wisdom"]["S"],
        constitution: this.props.location.state.character["constitution"]["S"],
        charisma: this.props.location.state.character["charisma"]["S"],
        ideals: this.props.location.state.character["ideals"]["S"],
        flaws: this.props.location.state.character["flaws"]["S"],
        playerId: this.props.location.state.character["playerId"]["S"],
        uuid: this.props.location.state.character["uuid"]["S"],
        name: this.props.location.state.character["name"]["S"]
      };
    } else {
      this.state = {
        redirect: true
      };
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/dashboard" />;
    }
    const classes = useStyles;
    var proficiencyBonus = this.calculateProficiencyBonus();
    var inventoryItems = [];
    console.log(proficiencyBonus);
    console.log("Character: " + this.state.character);
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <br />
        <Grid container spacing={3} style={paperStyle}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Proficiency Bonus <br /> <h2>{proficiencyBonus}</h2>
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper}>
              Armor Class <br />{" "}
              <h2>{this.calculateArmorClass(this.state.dexterity)}</h2>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              Initiative: <br /> <h2>{this.calculateInitiative()}</h2>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {" "}
              Name: <br /> <h2>{this.state.name}</h2>
            </Paper>
          </Grid>
          <Grid justify="center" alignItems="center" item xs={3}>
            <Paper justify="center" className={classes.paper}>
              Strength: <br /> <h2>{this.state.strength}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              {" "}
              Max Health <br /> <h2>{this.calculateMaxHealth()}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              {" "}
              Class: <br /> <h2>{this.state.class} </h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              {" "}
              Level: <br /> <h2>{this.state.level}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              {" "}
              Dexterity: <br /> <h2>{this.state.dexterity}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}> Inventory</Paper>
            <Grid container spacing={3}>
              {inventoryItems}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {" "}
              Race: <br /> <h2>{this.state.race}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Constitution: <br /> <h2>{this.state.constitution}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {" "}
              Background: <br /> <h2>{this.state.background}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Intelligence: <br /> <h2>{this.state.intelligence}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {" "}
              Alignment: <br /> <h2>{this.state.alignment}</h2>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Wisdom: <br /> <h2>{this.state.wisdom}</h2>
            </Paper>
          </Grid>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Charisma: <br /> <h2>{this.state.charisma}</h2>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  calculateProficiencyBonus() {
    const level = parseInt(this.state.level);
    console.log(level + 7);
    return Math.floor((level + 7) / 4);
  }

  calculateModifier(attribute) {
    return Math.floor((parseInt(attribute) - 10) / 2);
  }
  calculateArmorClass() {
    return 10 + parseInt(this.calculateModifier(this.state.dexterity));
  }

  calculateInitiative() {
    return this.calculateModifier(this.state.dexterity);
  }

  calculateMaxHealth() {
    return parseInt(this.state.level) * 8 + parseInt(this.state.constitution);
  }
  async componentDidMount() {
    var characterInventory = await getCharacterInventory(this.state.uuid).then(
      response =>
        response.json().then(json => {
          return json;
        })
    );
    const entries = Object.entries(characterInventory);
    characterInventory["Items"].forEach(async item => {
      console.log("Item " + JSON.stringify(item));
    });
  }
}
