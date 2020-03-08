import React, { Component } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getUserCampaigns } from "../services/campaignService";
import UserProfile from "./UserProfile";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { Select } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    Select: {
      margin: theme.spacing(1),
      width: 1200
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export default class BaseCharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    var items = [];
    var selected = {};
    console.log("Items: " + this.props.items);
    if (this.props.items) {
      const entries = Object.entries(this.props.items);
      for (const entry of entries) {
        if (entry[1]["email"]["S"]) {
          items.push(
            <MenuItem value={entry[1]["userId"]["S"]}>
              {entry[1]["email"]["S"]}
            </MenuItem>
          );
          if (this.props.value) {
            if (entry[1]["userId"]["S"] === this.props.value["playerId"]["S"]) {
              selected = entry[1];
            }
          } else {
            selected = "";
          }
        }
      }
    }
    items.push(<MenuItem value="none"> No Player </MenuItem>);
    console.log(selected);
    return (
      <FormControl onSubmit={this.handleSubmit} className={useStyles}>
        <InputLabel id="demo-simple-select-label">
          {this.props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: "150px" }}
          onChange={this.handleChange}
          defaultValue={
            this.props.value ? this.props.value["playerId"]["S"] : ""
          }
        >
          {items}
        </Select>
      </FormControl>
    );
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }
}
