import React, { Component } from "react";
import HeroImage from "../images/hero.jpg";
import RegistrationForm from "./RegistrationForm";

export default class Hero extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(" + HeroImage + ")",
          height: "1000px"
        }}
      >
        <div>
          <RegistrationForm />
        </div>
      </div>
    );
  }
}
