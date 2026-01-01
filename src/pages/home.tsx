import React, { useState } from "react";
import Button from "../components/button";
import { useToast } from "../contexts/useToast";
import axios from "axios";
import "../styles/home.scss";
import Navbar from "../components/navbar";

const Home = () => {
  const [rawText, setRawText] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const extractUrls = () => {
    const urlPattern = /(https?:\/\/)?(x\.com|twitter\.com)\/\S+/g;
    const matches = rawText.match(urlPattern) || [];

    const normalizedUrls = matches.map((url) => {
      if (!url.startsWith("http")) {
        return `https://${url}`;
      }
      return url;
    });

    const uniqueUrls = [...new Set(normalizedUrls)];

    setExtractedUrls(uniqueUrls);
  };

  const handleReplyToTweets = async () => {
    extractUrls();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3002/api/reply",
        {
          tweetUrls: extractedUrls,
          customInstructions,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        const { msg } = res.data;
        addToast(`${msg}`, "success");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to process tweets. Please try again.";
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="form-container">
        <div className="header">
          <h1>Configure your bot</h1>
          <span className="desc">
            Set up automated replies to specific tweets within your desired
            timeframe
          </span>
        </div>

        <section>
          <label htmlFor="">Tweet URLs</label>
          <textarea
            className="url-input"
            placeholder="Paste your text with tweet URLs here..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={8}
          />
          <span className="desc">
            URLs will be automatically cleaned and processed
          </span>
        </section>

        <section>
          <label htmlFor="custom-instructions" className="instructions-label">
            Custom Instructions
          </label>
          <textarea
            id="custom-instructions"
            className="url-input"
            placeholder="Enter any custom instructions for the replies..."
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            rows={4}
          />
          <span className="desc">
            Optional: Provide specific guidelines for reply generation
          </span>
        </section>

        <section>
          <label htmlFor="custom-instructions" className="instructions-label">
            Maximum Time
          </label>
          <textarea
            id="custom-instructions"
            className="url-input"
            placeholder="E.g 1 hour, 2 hours, 30 minutes"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            rows={1}
          />
          <span className="desc">
            Specify the timeframe within which replies should be sent
          </span>
        </section>

        <Button onClick={handleReplyToTweets} disabled={isLoading}>
          {isLoading ? "Processing..." : "Start Bot"}
        </Button>
      </div>
    </div>
  );
};

export default Home;
