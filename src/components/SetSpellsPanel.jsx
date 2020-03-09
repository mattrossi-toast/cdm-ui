import React from "react";
import PropTypes from "prop-types";
import getSpells from "../services/spellService";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel
} from "@material-ui/core";

export default class SetSpellsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    if (!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    const spells = [];
    if (this.state.spells) {
      const entries = Object.entries(this.state.spells);
      console.log("Spells Value: " + JSON.stringify(this.props.value));
      for (const entry of entries) {
        console.log("Spell Entry: " + JSON.stringify(entry));
        if (
          this.props.value &&
          this.props.value.includes(entry[1]["spellId"]["S"])
        ) {
          this.state.options.push(entry[1]["spellId"]["S"]);
        }
        if (entry[1]["class"]["S"] === this.props.class) {
          spells.push(
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleChange}
                  defaultChecked={
                    this.props.value &&
                    this.props.value.includes(entry[1]["spellId"]["S"])
                  }
                  value={entry[1]["spellId"]["S"]}
                />
              }
              label={
                entry[1]["name"]["S"] + ": " + entry[1]["description"]["S"]
              }
            />
          );
        }
      }
    }
    return (
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}>
          <FormLabel component="legend">Spells</FormLabel>
          <FormGroup>{spells}</FormGroup>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    var items = await getSpells(
      "https://mx0qmr0p0m.execute-api.us-east-1.amazonaws.com/prod"
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );

    var spells = [];
    const entries = Object.entries(items.Items);
    for (const item of entries) {
      spells.push(item[1]);
    }
    this.setState({ spells: spells });
  }
  handleChange(event) {
    const options = this.props.value
      ? this.removeDuplicates(this.props.value)
      : [];
    let index;
    if (event.target.checked) {
      if (this.props.value) {
        this.props.value.push(event.target.value);
      }
      options.push(event.target.value);
    } else {
      index = options.indexOf(event.target.value);
      options.splice(index, 1);
      if (this.props.value) {
        index = this.props.value.indexOf(event.target.value);
        this.props.value.splice(index, 1);
      }
      console.log("Item unchecked: " + options);
    }
    console.log("Options: " + options);
    this.setState({ options: options });
    this.props.handleChange(this.removeDuplicates(options));
  }
  removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
  }
}
