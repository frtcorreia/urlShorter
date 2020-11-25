import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import Lottie from "react-lottie";

import ShortenerService from "../../services/shortenerService";

import { parseISO, formatRelative } from "date-fns";

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from "./styles";

import dataLotie from "../../assets/38213-error.json";

export default function StatsPage(props) {
  const [code, setCode] = useState(props.match.params.code);
  const [isLoading, setIsLoading] = useState(false);
  const [hits, setHits] = useState(0);
  const [url, setUrl] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //console.log(code);

  const fetchData = () => {
    try {
      setIsLoading(true);

      const service = new ShortenerService();
      const shortenedURL = service.getStats(code);
      //console.log(shortenedURL);
      shortenedURL
        .then(function (response) {
          console.log(response);
          setHits(response.hits);
          setUrl(response.url);
          const parsedDate = parseISO(response.updatedAt);
          const currentDate = new Date();

          const relativeDate = formatRelative(parsedDate, currentDate);

          shortenedURL.relativeDate = relativeDate;
          setShortenedURL(shortenedURL);
        })
        .catch(function (error) {
          setIsLoading(false);
          setErrorMessage("Ops, this url doesn't exist");
        });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Ops, this url doesn't exist");
    }
  };

  useEffect(() => {
    fetchData();
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
      <Header>Estatisticas:</Header>
      {errorMessage ? (
        <StatsContainer>
          <Lottie options={defaultOptions} height={120} width={120} />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-primary" href="/">
            Short a new WRL
          </a>
        </StatsContainer>
      ) : (
        <StatsContainer className="text-center">
          <p>
            <b>http://localhost:3500/{code}</b>
          </p>
          <p>
            Redirect to: <br /> {url}
          </p>
          <StatsRow>
            <StatsBox>
              <b>{hits}</b>
              <StatsBoxTitle>Visitors</StatsBoxTitle>
            </StatsBox>

            <StatsBox>
              <b>{shortenedURL.relativeDate}</b>
              <StatsBoxTitle>Last Visit on URL</StatsBoxTitle>
            </StatsBox>
          </StatsRow>
          <a href="/" className="btn btn-primary">
            Short new URL
          </a>
        </StatsContainer>
      )}
    </Container>
  );
}
