import React, { Component, Fragment } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CharacterServices extends Component {
  render() {
    return (
      <Fragment>
        <Container maxWidth="sm">
          <h1>Character Services</h1>
          <Link to="/create-character">Create Character</Link>
        </Container>
      </Fragment>
    );
  }
}
