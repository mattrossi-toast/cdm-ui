import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HeroImage from "../images/hero.jpg";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: "url(" + HeroImage + ")",
        height: "1000px"
      }}
    ></div>
  );
}
