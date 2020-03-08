import React, { Component, Fragment } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CharacterServices extends Component {
  render() {
    const containerStyle = {
      fontFamily: "Montserrat"
    };
    return (
      <Fragment>
        <Container style={containerStyle} maxWidth="sm">
          <h1>Character Services</h1>
          <Link to="/create-character">Create Character</Link>
          <Link to="/create-npc">Create Non-Player Character</Link>
          <Link to="/view-characters">View Characters</Link>
        </Container>
      </Fragment>
    );
  }
}
