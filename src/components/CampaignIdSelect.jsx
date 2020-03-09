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
import BaseCampaignSelect from "./BaseCampaignSelect";

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
      <BaseCampaignSelect
        handleChange={this.props.handleChange}
        items={this.state.items}
        value={this.props.value}
        label="Campaign"
      ></BaseCampaignSelect>
    );
  }

  async componentDidMount() {
    var campaigns = await getUserCampaigns(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/" +
        UserProfile.getId()
    ).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    var allCampaigns = [];
    console.log("campaigns: " + JSON.stringify(campaigns));
    for (const campaign of campaigns.userPlayerCampaigns.Items) {
      console.log(campaign);
      allCampaigns.push({
        uuid: campaign.campaignId,
        campaignName: campaign.campaignName
      });
    }
    for (const campaign of campaigns.userDMCampaigns.Items) {
      console.log("DM Campaign " + JSON.stringify(campaign));
      allCampaigns.push({
        uuid: campaign.uuid,
        campaignName: campaign.campaignName
      });
    }
    this.setState({ items: allCampaigns });
    this.setState({ campaignsWhereUserIsDM: campaigns.userDMCampaigns });
  }
}
