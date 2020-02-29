import React from "react";
import PropTypes from "prop-types";
import getSpells from "../services/spellService";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel
} from "@material-ui/core";

class SetSpellsPanel extends React.Component {
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
    /*const weapons = [];
    if (this.state.weapons) {
      const entries = Object.entries(this.state.weapons);
      console.log(entries);
      for (const entry of entries) {
        weapons.push(
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.handleChange}
                value={entry[1]["uuid"]["S"]}
              />
            }
            label={entry[1]["name"]["S"]}
          />
        );
      }
    }
    const armor = [];
    if (this.state.armor) {
      const entries = Object.entries(this.state.armor);
      console.log(entries);
      for (const entry of entries) {
        armor.push(
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.handleChange}
                value={entry[1]["uuid"]["S"]}
              />
            }
            label={entry[1]["name"]["S"]}
          />
        );
      }
    }*/
    return (
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}>
          <FormLabel component="legend">Weapons</FormLabel>
          <FormGroup>{weapons}</FormGroup>
          <FormLabel component="legend">Armor</FormLabel>
          <FormGroup>{armor}</FormGroup>
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
    console.log(items);
    /*var weapons = [];
    var armor = [];
    const entries = Object.entries(items.Items);
    for (const item of entries) {
      if (item[1]["type"]["S"] === "weapon") {
        weapons.push(item[1]);
      } else {
        armor.push(item[1]);
      }
    }
    this.setState({ weapons: weapons });
    this.setState({ armor: armor });*/
  }
  handleChange(event) {
    const options = this.state.options;
    let index;
    if (event.target.checked) {
      options.push(event.target.value);
    } else {
      index = options.indexOf(event.target.value);
      options.splice(index, 1);
    }
    this.setState({ options: options });
    this.props.handleChange(this.state.options);
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
