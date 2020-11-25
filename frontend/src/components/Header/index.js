import React from "react";
import { HeaderContainer, Logo } from "./styles";

import LogoIcon from "../../assets/logo.png";

export default function Header(props) {
  return (
    <HeaderContainer>
      <Logo src={LogoIcon} alt="Shorter Url Logo" />
      <p>{props.children}</p>
      <h1>Url Shorter</h1>
    </HeaderContainer>
  );
}
