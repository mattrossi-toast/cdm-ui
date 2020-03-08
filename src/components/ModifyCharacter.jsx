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
import { insertCharacterSpell } from "../services/spellService";
import CampaignCharacterSelect from "./CampaignCharacterSelect";
import { getCampaignPlayers } from "../services/campaignService";
import { getCharacterInventory } from "../services/characterService";
import { Redirect } from "react-router-dom";

export default class ModifyCharacter extends Component {
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
    if (this.props.location.state) {
      this.state = {
        items: [],
        campaignId: this.props.location.state.character["campaignId"]["S"],
        class: this.props.location.state.character["class"]["S"],
        background: this.props.location.state.character["background"]["S"],
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
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <h2>Modify Character</h2>
        <SimpleSelect
          value={
            this.props.location.state.character["campaignId"]["S"]
              ? this.props.location.state.character["campaignId"]["S"]
              : ""
          }
          handleChange={this.handleCampaignIdChange}
        />
        <CampaignCharacterSelect
          value={
            this.props.location.state.character
              ? this.props.location.state.character
              : ""
          }
          handleChange={this.handlePlayerChange}
          campaignId={this.state.campaignId}
          items={this.state.items}
        />
        <ClassSelect
          value={this.state.class}
          handleChange={this.handleClassChange}
        />
        <BackgroundSelect
          handleChange={this.handleBackgroundChange}
          value={this.state.background}
        />
        <TextField
          label="Name"
          onChange={this.handleNameChange}
          value={this.state.name}
        />
        <TextField
          label="Level"
          type="number"
          value={this.state.level}
          onChange={this.handleLevelChange}
        />
        <RaceSelect
          handleChange={this.handleRaceChange}
          value={this.state.race}
        />
        <AlignmentSelect
          handleChange={this.handleAlignmentChange}
          value={this.state.alignment}
        />
        <TextField
          label="Strength"
          type="number"
          value={this.state.strength}
          onChange={this.handleStrengthChange}
        />
        <TextField
          label="Intelligence"
          type="number"
          value={this.state.intelligence}
          onChange={this.handleIntelligenceChange}
        />
        <TextField
          label="Dexterity"
          type="number"
          value={this.state.dexterity}
          onChange={this.handleDexterityChange}
        />
        <TextField
          label="Wisdom"
          type="number"
          value={this.state.wisdom}
          onChange={this.handleWisdomChange}
        />
        <TextField
          label="Constitution"
          type="number"
          value={this.state.constitution}
          onChange={this.handleConstitutionChange}
        />
        <TextField
          label="Charisma"
          type="number"
          onChange={this.handleCharismaChange}
          value={this.state.charisma}
        />
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
        <Modal
          show={this.state.showModal}
          onClose={this.toggleModal}
          handleChange={this.handleInventoryChange}
          value={this.state.characterInventory}
        />
        <Button onClick={this.setInventory}>
          {this.state.showModal ? "Close" : "Show Inventory"}
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
        <Button onClick={this.handleClick}>Modify Character</Button>
      </Fragment>
    );
  }

  handleInventoryChange(event) {
    const inventory = [];
    console.log("inventory changed!");
    inventory.push(event);
    this.setState({ inventory: inventory });
    console.log("Inventory: " + inventory);
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

  handleFlawsChange(event) {
    this.setState({ flaws: event.target.value });
  }
  handleIdealsChange(event) {
    this.setState({ ideals: event.target.value });
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
    this.setState({ showModal: !this.state.showModal });
  }

  setSpell() {
    this.setState({ showSpellPanel: true });
  }

  handlePlayerChange(event) {
    console.log("Event: " + event);

    this.setState({ playerId: event });
  }

  async handleClick() {
    var response = await createCharacter(
      "https://f0j4l488d0.execute-api.us-east-1.amazonaws.com/prod/",
      JSON.stringify(this.state)
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    console.log("Complete");
    await this.insertInventoryChanges(this.state.uuid);
  }
  async insertInventoryChanges(userId) {
    if (this.state.inventory) {
      const inventory = this.state.inventory[0];
      const prevInventory = this.state.inventoryUUIDs;
      prevInventory.forEach(async item => {
        //var response = await delete
      }); //need to get inventory uuid here too
      console.log(prevInventory);
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
  async componentDidMount() {
    console.log("Mounting...");
    if (this.props.location.state) {
      this.getCampaignPlayers(
        this.props.location.state.character["campaignId"]["S"]
      );
      var characterInventory = await getCharacterInventory(
        this.state.uuid
      ).then(response =>
        response.json().then(json => {
          return json;
        })
      );
      console.log("Character Inventory: " + JSON.stringify(characterInventory));
      var inventoryItems = [];
      var inventoryUUIDs = [];
      characterInventory["Items"].forEach(item => {
        inventoryItems.push(item["itemId"]["S"]);
        inventoryUUIDs.push(item["inventoryItemId"]["S"]);
      });
      console.log("Item IDs " + inventoryItems);
      this.setState({ characterInventory: inventoryItems });
      this.setState({ inventoryUUIDs: inventoryUUIDs });
    } else {
      this.setState({ redirect: true });
    }
  }

  async getCampaignPlayers(campaignId) {
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
