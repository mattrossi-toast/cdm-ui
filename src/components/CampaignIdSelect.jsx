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

export default class CampaignIdSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
  render() {
    return (
      <BaseSelect
        handleChange={this.props.handleChange}
        items={this.state.items}
        label="Campaign"
      ></BaseSelect>
    );
  }

  async componentDidMount() {
    console.log(UserProfile.getId());
    var campaigns = await getUserCampaigns(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/c4e0077c-3f5f-48ed-a423-bb58d6de47db"
    ).then(response =>
      response.json().then(json => {
        console.log(json);
        return json;
      })
    );

    var names = [];
    const entries = Object.entries(campaigns.Items);
    for (const campaign of entries) {
      names.push(campaign[1]["campaignName"]["S"]);
    }
    this.setState({ items: names });
  }
}
