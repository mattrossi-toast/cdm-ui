import React from "react";
import ReactDOM from "react-dom";

import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateCampaign from "./components/CreateCampaign";
import ModifyCampaign from "./components/ModifyCampaign";
import CreateCharacter from "./components/CreateCharacter";
import ViewCharacters from "./components/ViewCharacters";
import ModifyCharacter from "./components/ModifyCharacter"
import ViewCharacter from "./components/ViewCharacter"
import './fonts/Montserrat-Black.ttf'

ReactDOM.render(
  <Router>
    <Route path="/" exact component={LoginPage}></Route>
    <Route path="/dashboard" exact component={Dashboard}></Route>
    <Route path="/create-campaign" exact component={CreateCampaign}></Route>
    <Route path="/modify-campaign" exact component={ModifyCampaign}></Route>
    <Route path="/create-character" exact component={CreateCharacter}></Route>
    <Route path="/create-npc" exact component={CreateCharacter}></Route>
    <Route path="/view-characters" exact component={ViewCharacters}></Route>
    <Route path="/edit-character" exact component={ModifyCharacter}></Route>
    <Route path="/view-character" exact component={ViewCharacter}></Route>
  </Router>,
  document.getElementById("root")
);
