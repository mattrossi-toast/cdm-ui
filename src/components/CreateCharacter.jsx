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
export default class CreateCharacter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCampainIdChange = this.handleCampainIdChange.bind(this);
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

    this.state = {
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
      bonds: "",
      flaws: "",
      features: ""
    };
  }
  render() {
    const attributes = {
      ideals: "Ideals",
      bonds: "Bonds",
      flaws: "Flaws",
      //  inventory: "Inventory", //should open items menu
      //  attacks: "Attacks", // should open attacks menu
      //  spells: "Spells", // should open spells menu
      features: "Features"
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
    } // Need different input types for data types
    return (
      <Fragment>
        <Navbar isLoggedIn={true}></Navbar>
        <h2> Create a Character</h2>
        <SimpleSelect handleChange={this.handleCampainIdChange} />
        <ClassSelect handleChange={this.handleClassChange} />
        <BackgroundSelect handleChange={this.handleBackgroundChange} />
        <TextField label="Name" onChange={this.handleNameChange} />
        <TextField
          label="Level"
          type="number"
          onChange={this.handleLevelChange}
        />
        <RaceSelect handleChange={this.handleRaceChange} />
        <AlignmentSelect handleChange={this.handleAlignmentChange} />
        <TextField
          label="Strength"
          type="number"
          onChange={this.handleStrengthChange}
        />
        <TextField
          label="Intelligence"
          type="number"
          onChange={this.handleIntelligenceChange}
        />
        <TextField
          label="Dexterity"
          type="number"
          onChange={this.handleDexterityChange}
        />
        <TextField
          label="Wisdom"
          type="number"
          onChange={this.handleWisdomChange}
        />
        <TextField
          label="Constitution"
          type="number"
          onChange={this.handleConstitutionChange}
        />
        <TextField
          label="Charisma"
          type="number"
          onChange={this.handleCharismaChange}
        />
        <Modal show={this.state.showModal} onClose={this.toggleModal} />
        <Button onClick={this.setInventory}> Set Inventory </Button>
        {items}

        <Button onClick={this.handleClick}>Create Character</Button>
      </Fragment>
    );
  }

  handleCampainIdChange(event) {
    console.log("HEY" + event);
    this.setState({ campaignId: event });
    console.log("Ya" + JSON.stringify(this.state));
  }
  handleClassChange(event) {
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

  setInventory() {
    this.setState({ showModal: true });
  }
  async handleClick() {
    console.log(this.state);
    var response = await createCharacter(
      "https://s252apte2g.execute-api.us-east-1.amazonaws.com/prod",
      JSON.stringify(this.state)
    ).then(response =>
      response.json().then(json => {
        console.log(json);
        return json;
      })
    );
  }
}
