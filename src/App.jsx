import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";


const embUrl = process.env.REACT_APP_Embed_URL;
const accessTokenManual = process.env.REACT_APP_ACCESS_TOKEN;
const reportId = process.env.REACT_APP_REPORT_ID;

// Simulated token fetch function
const fetchAccessToken = async () => {
  // Simulate token fetching delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accessTokenManual); 
      // get the access token (1hr duration -> Go to the report in Power BI -> F12 -> 'copy(powerBIAccessToken)')
    }, 2000); // Simulating a delay for fetching token

  });
};



export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLandingPageData(JsonData);

    // Fetch access token when the component is mounted
    const getToken = async () => {
      setLoading(true); // Show loading animation
      const token = await fetchAccessToken();
      console.log('Access Token:', token);
      setAccessToken(token);
      setLoading(false); // Hide loading animation once token is fetched
    };

    getToken();
  }, []);

  return (
    <div>
      <Navigation />
      
      {loading ? (
        <div className="loading">Loading...</div> // Loading animation
      ) : (
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: reportId,
            embedUrl: embUrl,
            //https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-report-in-group
            accessToken: accessToken, // Use the access token retrieved
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
            },
          }}
          eventHandlers={new Map([
            ["loaded", function () { console.log("Report loaded"); }],
            ["rendered", function () { console.log("Report rendered"); }],
            ["error", function (event) { console.log(event.detail); }],
            ["visualClicked", () => console.log("visual clicked")],
            ["pageChanged", (event) => console.log(event)],
          ])}
          cssClassName={"reportClass"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
        
      )}
    </div>
  );
};

export default App;
