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

export default class BaseCampaignSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    var items = [];
    const entries = Object.entries(this.props.items);

    for (const entry of entries) {
      console.log("Entry: " + JSON.stringify(entry[1]));
      items.push(
        <MenuItem value={entry[1]["uuid"]["S"]}>
          {entry[1]["campaignName"]["S"]}
        </MenuItem>
      );
    }

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
          defaultValue={this.props.value}
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
