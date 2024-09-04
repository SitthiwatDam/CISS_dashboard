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
      resolve('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTZlN2I4MmQtYmZiZi00Y2UwLTg3YzItNzc5ODFlOGFiNmI5LyIsImlhdCI6MTcyNTQ1ODEyMywibmJmIjoxNzI1NDU4MTIzLCJleHAiOjE3MjU0NjMzNDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFzTjdzUlpFOXRHZ3pQRWd6b1A0eGpvNUpBTWxIVGo1YmtnWEZRSWcxN2hLRGM0K3dsQXpDVUVSVWZXWmViRnVRIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGFtcm9uZ3ByZWVjaGFyIiwiZ2l2ZW5fbmFtZSI6IlNpdHRoaXdhdCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIwMDE6ZmIxOjU2OjUxMmE6Yzg4NjpjY2M6YTYzMzo1NWY4IiwibmFtZSI6IlNpdHRoaXdhdCBEYW1yb25ncHJlZWNoYXIiLCJvaWQiOiJhZTI5YmJhOS0xNTg5LTQzYTktOTBhYy1jMjE5OGJmZGMyNGEiLCJwdWlkIjoiMTAwMzIwMDNDMzAzNTE0OSIsInJoIjoiMC5BVlFBTGJqbmxyLV80RXlId25lWUhvcTJ1UWtBQUFBQUFBQUF3QUFBQUFBQUFBQlVBR00uIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiTGVCQlc2czNlcWQtbENGcWNRd1M2U1pibkY0Q3JRMENGUmVtS19wQlMxZyIsInRpZCI6Ijk2ZTdiODJkLWJmYmYtNGNlMC04N2MyLTc3OTgxZThhYjZiOSIsInVuaXF1ZV9uYW1lIjoic3QxMjM5OTRAYWl0LmFzaWEiLCJ1cG4iOiJzdDEyMzk5NEBhaXQuYXNpYSIsInV0aSI6Im5ZQ2pPTE1MM2stYnJzbk5FNFFkQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDYifQ.RZvNxG3jJOPMs0nluLH_BYkJBI8u4owVkyVGNcA3hYYByDcrktzuWbQNuNzpaZEA6J3KJEZpdWjn66j0fvGnJjlxIUMc5jCluS8QCvK8mlSaNXoE80yuXWkIIDTzAhkfZUXbtHBzgn20utIOeKHYKNtQCJxgP1NtBi7Cn8Ak281YGDN6y4Lc-uX_9PU9LByS_nqUTSVhnOsywlAaet7W7ypjHKQnoe5yQmFp70uJq1f_UdUuUjuh7Ujh1z3Bpe9lbjTith3AZYveAnvCznlqNZ7GFZ5AWjYQz_W500j3SrCmf7Moa9z5V669Xsnm-tpz_PUIUk29nVxrW88zvAnLSg'); 
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
