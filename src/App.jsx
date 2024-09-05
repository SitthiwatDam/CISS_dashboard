import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

// Simulated token fetch function
const fetchAccessToken = async () => {
  // Simulate token fetching delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTZlN2I4MmQtYmZiZi00Y2UwLTg3YzItNzc5ODFlOGFiNmI5LyIsImlhdCI6MTcyNTUyNDA4OSwibmJmIjoxNzI1NTI0MDg5LCJleHAiOjE3MjU1Mjg1OTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFQZWNZSGJSQ2F4dUZnWW92MGlrSUZ5MW1vWk5MSjk3dGdIUnRiNVJmaTZPUGM5Wms0R2pEY2RURFN3N05oVGpvIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGFtcm9uZ3ByZWVjaGFyIiwiZ2l2ZW5fbmFtZSI6IlNpdHRoaXdhdCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIwMy4xNTkuNC4xOCIsIm5hbWUiOiJTaXR0aGl3YXQgRGFtcm9uZ3ByZWVjaGFyIiwib2lkIjoiYWUyOWJiYTktMTU4OS00M2E5LTkwYWMtYzIxOThiZmRjMjRhIiwicHVpZCI6IjEwMDMyMDAzQzMwMzUxNDkiLCJyaCI6IjAuQVZRQUxiam5sci1fNEV5SHduZVlIb3EydVFrQUFBQUFBQUFBd0FBQUFBQUFBQUJVQUdNLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IkxlQkJXNnMzZXFkLWxDRnFjUXdTNlNaYm5GNENyUTBDRlJlbUtfcEJTMWciLCJ0aWQiOiI5NmU3YjgyZC1iZmJmLTRjZTAtODdjMi03Nzk4MWU4YWI2YjkiLCJ1bmlxdWVfbmFtZSI6InN0MTIzOTk0QGFpdC5hc2lhIiwidXBuIjoic3QxMjM5OTRAYWl0LmFzaWEiLCJ1dGkiOiJpT1d6bXRwNnVrNmc1ZkFaV1BvVUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMTQgMSJ9.HDxVDg9rjsYcca-vlcHun4S7VT8nKCigyA9g8Ja--iz5Gig0LST68DGYm5cJB28IsN_Ie92l4-_0TVuoL8vQ_Hc4NIw-KOsoO-adi19DW8_w3-IW4uTM45h962ORFh-56DN7xgbF-kHtdRbOJ8BActJZu1rA1UPl0GkZHc0ts3DBtWliKZ5cuDaLsxIDnNPXaTxEkB6NFwmtCV5Kwy1tjIgE7o3gBZGhwdLZCytyfXvNTzGzNM1PxjaYO95-oG1tjZ8BTT1bf-2C1cM22AcU59zUe6BcLHbBHmYq-ljSmgpKKfQb0-GQG7yssSRNfhIg-qymCTH19smnS81pwGroFA'); 
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
            id: "95bc8033-d8d9-4fc6-9014-df77ee28ef42",
            embedUrl: //https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-report-in-group
              "https://app.powerbi.com/reportEmbed?reportId=95bc8033-d8d9-4fc6-9014-df77ee28ef42&groupId=f552a57a-1ad5-4074-b4dc-f3e345c3cee8&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
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
