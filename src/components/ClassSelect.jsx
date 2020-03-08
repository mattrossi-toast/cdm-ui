import React, { Component } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import SelectInput from "@material-ui/core/Select/SelectInput";
import BaseSelect from "./BaseSelect";

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export default class ClassSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        barbarian: "Barbarian",
        bard: "Bard",
        cleric: "Cleric",
        druid: "Druid",
        fighter: "Fighter",
        monk: "Monk",
        paladin: "Paladin",
        ranger: "Ranger",
        rogue: "Rogue",
        sorcerer: "Sorcerer",
        warlock: "Warlock",
        wizard: "Wizard"
      }
    };
  }
  render() {
    return (
      <BaseSelect
        handleChange={this.props.handleChange}
        items={this.state.items}
        label="Class"
        value={this.props.value}
      ></BaseSelect>
    );
  }
}
