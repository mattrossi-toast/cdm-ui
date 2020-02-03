import React from "react";
import HeroImage from "../images/hero.jpg";
import RegistrationForm from "./RegistrationForm";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: "url(" + HeroImage + ")",
        height: "1000px"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          height: "25em",
          width: "25em",
          opacity: "0.5"
        }}
      >
        <RegistrationForm />
      </div>
    </div>
  );
}
