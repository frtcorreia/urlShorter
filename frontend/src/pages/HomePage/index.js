import React, { useState, useRef } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { ContentContainer, Form } from "./styles";
import ShortnerService from "../../services/shortenerService";

import Header from "../../components/Header";

export default function HomePage() {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!url) {
      setIsLoading(false);
      setErrorMessage("Write an URL please");
    } else {
      try {
        const service = new ShortnerService();
        const result = await service.generate({ url });

        setIsLoading(false);
        setCode(result.code);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("An error occurred while generating your url");
      }
    }
  }

  function copyToClipboard() {
    const element = inputRef.current;
    element.select();
    document.execCommand("copy");
  }

  return (
    <Container>
      <Header />
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ display: "flex", width: "100%" }}>
            <InputGroup>
              <FormControl
                placeholder="Your URL"
                defaultValue=""
                onChange={(e) => setUrl(e.target.value)}
              />
            </InputGroup>
            <InputGroup.Append>
              <Button style={{ width: 100 }} variant="primary" type="submit">
                Short URL
              </Button>
            </InputGroup.Append>
          </div>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            code && (
              <>
                <div className="mb-3" style={{ display: "flex" }}>
                  <InputGroup>
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://localhost:3500/${code}`}
                      ref={inputRef}
                    />
                  </InputGroup>
                  <InputGroup.Append>
                    <Button
                      style={{ width: 100 }}
                      variant="outline-secondary"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </Button>
                  </InputGroup.Append>
                </div>
                <p>
                  To follow the statistics of the link see:{" "}
                  <a target="_blank" href={`/${code}/stats`}>
                    LINK
                  </a>
                </p>
              </>
            )
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </ContentContainer>
    </Container>
  );
}
