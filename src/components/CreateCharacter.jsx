import React, { Component, Fragment } from "react";
import Navbar from "./NavBar";
import createCharacter from "../services/characterService";
import { TextField, Button } from "@material-ui/core";
import CharacterAttribute from "./CharacterAttribute";
import SimpleSelect from "./CampaignIdSelect";
import ClassSelect from "./ClassSelect";
import BackgroundSelect from "./BackgroundSelect";
import RaceSelect from "./RaceSelect";
import AlignmentSelect from "./AlignmentSelect";
import Modal from "./SetInventoryModal";
import SpellPanel from "./SetSpellsPanel";
import insertInventory from "../services/inventoryService";
import UserProfile from "./UserProfile";
import SpellsButton from "./SpellsButton";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { insertCharacterSpell } from "../services/spellService";
import CampaignCharacterSelect from "./CampaignCharacterSelect";
import { getCampaignPlayers } from "../services/campaignService";

export default class CreateCharacter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCampaignIdChange = this.handleCampaignIdChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleRaceChange = this.handleRaceChange.bind(this);
    this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
    this.handleStrengthChange = this.handleStrengthChange.bind(this);
    this.handleIntelligenceChange = this.handleIntelligenceChange.bind(this);
    this.handleDexterityChange = this.handleDexterityChange.bind(this);
    this.handleWisdomChange = this.handleWisdomChange.bind(this);
    this.handleConstitutionChange = this.handleConstitutionChange.bind(this);
    this.handleCharismaChange = this.handleCharismaChange.bind(this);
    this.handleIdealsChange = this.handleIdealsChange.bind(this);
    this.handleBondsChange = this.handleBondsChange.bind(this);
    this.handleFlawsChange = this.handleFlawsChange.bind(this);
    this.handleFeaturesChange = this.handleFeaturesChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.setSpell = this.setSpell.bind(this);
    this.handleSpellsChange = this.handleSpellsChange.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);

    this.state = {
      items: [],
      campaignId: "",
      class: "",
      background: "",
      level: "",
      race: "",
      alignment: "",
      strength: "",
      intelligence: "",
      dexterity: "",
      wisdom: "",
      constiution: "",
      charisma: "",
      ideals: "",
      flaws: "",
      playerId: ""
    };
  }
  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      button: {
        margin: theme.spacing(2)
      },
      placeholder: {
        height: 40
      }
    }));
    const classes = useStyles;
    const attributes = {
      ideals: "Ideals",
      bonds: "Bonds",
      flaws: "Flaws",
      features: "Features"
    };
    const hasSpells = {
      barbarian: false,
      bard: true,
      cleric: true,
      druid: true,
      fighter: false,
      monk: false,
      paladin: true,
      ranger: true,
      rogue: false,
      sorcerer: true,
      warlock: true,
      wizard: true
    };
    const entries = Object.entries(attributes);
    const items = [];
    for (const entry of entries) {
      items.push(
        <CharacterAttribute
          onChange={this.handleChange}
          value={entry[0]}
          friendlyValue={entry[1]}
        />
      );
    }
    if (this.props.location.pathname == "/create-character") {
      var campaignCharacterSelect = (
        <CampaignCharacterSelect
          handleChange={this.handlePlayerChange}
          campaignId={this.state.campaignId}
          items={this.state.items}
        />
      );
    }
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <h2 style={{ fontFamily: "Montserrat" }}>
          {" "}
          {this.props.location.pathname == "/create-character"
            ? "Create Character"
            : "Create NPC"}
        </h2>
        <SimpleSelect handleChange={this.handleCampaignIdChange} />
        {campaignCharacterSelect}
        <ClassSelect handleChange={this.handleClassChange} />
        <BackgroundSelect handleChange={this.handleBackgroundChange} />
        <TextField label="Name" onChange={this.handleNameChange} />
        <TextField
          label="Level"
          type="number"
          min="0"
          max="20"
          onChange={this.handleLevelChange}
        />
        <RaceSelect handleChange={this.handleRaceChange} />
        <AlignmentSelect handleChange={this.handleAlignmentChange} />
        <TextField
          label="Strength"
          type="number"
          min="0"
          max="20"
          onChange={this.handleStrengthChange}
        />
        <TextField
          label="Intelligence"
          type="number"
          min="0"
          max="20"
          onChange={this.handleIntelligenceChange}
        />
        <TextField
          label="Dexterity"
          type="number"
          min="0"
          max="20"
          onChange={this.handleDexterityChange}
        />
        <TextField
          label="Wisdom"
          type="number"
          min="0"
          max="20"
          onChange={this.handleWisdomChange}
        />
        <TextField
          label="Constitution"
          type="number"
          min="0"
          max="20"
          onChange={this.handleConstitutionChange}
        />
        <TextField
          label="Charisma"
          type="number"
          min="0"
          max="20"
          onChange={this.handleCharismaChange}
        />
        <Modal
          show={this.state.showModal}
          onClose={this.toggleModal}
          handleChange={this.handleInventoryChange}
          value=""
        />
        <Button onClick={this.setInventory}>
          {this.state.showModal ? "Submit" : "Show Inventory"}
        </Button>
        <SpellPanel
          show={this.state.showSpellPanel}
          onClose={this.toggleSpellPanel}
          handleChange={this.handleSpellsChange}
          class={this.state.class.toLowerCase()}
        />
        <SpellsButton
          onClick={this.setSpell}
          show={
            this.state.class ? hasSpells[this.state.class.toLowerCase()] : false
          }
          showModal={this.state.showSpellsPanel}
        ></SpellsButton>
        <TextField
          label="Ideals"
          onChange={this.handleIdealsChange}
          value={this.state.ideals}
        ></TextField>
        <TextField
          label="Flaws"
          value={this.state.flaws}
          onChange={this.handleFlawsChange}
        ></TextField>

        <Button onClick={this.handleClick}>Create Character</Button>
        <div className={classes.placeholder}>
          <Fade
            in={this.state.loading}
            style={{
              transitionDelay: this.state.loading ? "800ms" : "0ms"
            }}
            unmountOnExit
          >
            <LinearProgress />
          </Fade>
        </div>
      </Fragment>
    );
  }
  //Hide spells button if class cannot cast spells
  handleInventoryChange(event) {
    const inventory = [];
    inventory.push(event);
    this.setState({ inventory: inventory });
  }

  async handleCampaignIdChange(event) {
    console.log(event);
    this.setState({ campaignId: event });
    this.getCampaignPlayers(event);
  }
  handleClassChange(event) {
    this.setState({ showSpellPanel: false });
    this.setState({ class: event });
  }
  handleBackgroundChange(event) {
    this.setState({ background: event });
  }
  handleLevelChange(event) {
    this.setState({ level: event.target.value });
  }
  handleRaceChange(event) {
    this.setState({ race: event });
  }
  handleAlignmentChange(event) {
    this.setState({ alignment: event });
  }
  handleStrengthChange(event) {
    this.setState({ strength: event.target.value });
  }
  handleIntelligenceChange(event) {
    this.setState({ intelligence: event.target.value });
  }
  handleDexterityChange(event) {
    this.setState({ dexterity: event.target.value });
  }
  handleWisdomChange(event) {
    this.setState({ wisdom: event.target.value });
  }
  handleConstitutionChange(event) {
    this.setState({ constitution: event.target.value });
  }
  handleCharismaChange(event) {
    this.setState({ charisma: event.target.value });
  }
  handleIdealsChange(event) {
    this.setState({ ideals: event.target.value });
  }
  handleBondsChange(event) {
    this.setState({ bonds: event.target.value });
  }
  handleFlawsChange(event) {
    this.setState({ flaws: event.target.value });
  }
  handleFeaturesChange(event) {
    this.setState({ features: event.target.value });
  }

  handleChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSpellsChange(event) {
    const spells = [];
    spells.push(event);
    this.setState({ spells: spells });
  }
  setInventory() {
    this.setState({ showModal: true });
  }

  setSpell() {
    this.setState({ showSpellPanel: true });
  }

  handlePlayerChange(event) {
    console.log(event);
    this.setState({ playerId: event });
  }

  async handleClick() {
    this.setState({ loading: true });
    if (!this.state.playerId) {
      this.setState({ playerId: "none" });
    }
    var response = await createCharacter(
      "https://s252apte2g.execute-api.us-east-1.amazonaws.com/prod",
      JSON.stringify(this.state)
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    console.log("User ID" + response["userId"]);
    await this.insertSpellChanges(response["userId"]);
    await this.insertInventoryChanges(response["userId"]);
    this.setState({ loading: false });
  }
  componentDidMount() {
    console.log(this.props.location.pathname);
    if (this.props.location.state) {
      console.log("yeet!");
      this.getCampaignPlayers(
        this.props.location.state.character["campaignId"]["S"]
      );
    }
  }

  async insertInventoryChanges(userId) {
    if (this.state.inventory) {
      const inventory = this.state.inventory[0];
      inventory.forEach(async item => {
        var response = await insertInventory(
          "https://7l00an9o98.execute-api.us-east-1.amazonaws.com/prod",
          `{
          "itemId": "${item}",
          "userId": "${userId}"
        }`
        ).then(response =>
          response.json().then(json => {
            return json;
          })
        );
      });
    }
  }

  async insertSpellChanges(userId) {
    if (this.state.spells) {
      const spells = this.state.spells[0];
      spells.forEach(async item => {
        var response = await insertCharacterSpell(
          "https://p5nwqhxdk3.execute-api.us-east-1.amazonaws.com/prod/",
          `{
          "spellId": "${item}",
          "userId": "${userId}"
        }`
        ).then(response =>
          response.json().then(json => {
            return json;
          })
        );
      });
    }
  }
  async getCampaignPlayers(campaignId) {
    console.log("Rollin!");
    this.setState({ items: [] });
    if (campaignId) {
      console.log(campaignId);
      const campaignPlayers = await getCampaignPlayers(
        "https://z1mdu6sjja.execute-api.us-east-1.amazonaws.com/prod/" +
          campaignId
      ).then(response =>
        response.json().then(json => {
          return json;
        })
      );
      this.setState({ items: campaignPlayers["Items"] });
    }
  }
}
