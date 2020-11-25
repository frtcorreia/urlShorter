import { getDefaultNormalizer } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Lottie from "react-lottie";
import Header from "../../components/Header";

import ShortenerService from "../../services/shortenerService";

import { StatsContainer, StatsRow, StatsBox } from "./styles";

import dataLotie from "../../assets/38463-error.json";

export default function RedirectPage(props) {
  const [code, setCode] = useState(props.match.params.code);
  const [isLoading, setIsloading] = useState(false);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  async function getData() {
    try {
      const service = new ShortenerService();
      const { url } = await service.getLink(code);

      //window.location = url;
    } catch (error) {
      setErrorMessage("Ops, some error happend!!");
    }
  }

  useEffect(() => {
    getData();
  }, [code]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dataLotie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      {errorMessage ? (
        <>
          <Header>Your new url shorter...</Header>
          <StatsContainer className="text-center">
            <Lottie options={defaultOptions} height={250} width={250} />
            <p className="m-3">{errorMessage}</p>
            <a href="/" className="btn btn-primary">
              New Short Url
            </a>
          </StatsContainer>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </Container>
  );
}
