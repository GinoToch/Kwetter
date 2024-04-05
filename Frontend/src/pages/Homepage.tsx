import React, { useState } from "react";
import { Button } from "@mantine/core";

const Homepage: React.FC<{}> = ({}) => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/tweets-api/weatherforecast");
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError("Error fetching weather data");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Call Api"}
      </Button>
      {error && <div>{error}</div>}
      {weatherData.length > 0 && (
        <div>
          <h2>Weather Forecast:</h2>
          <ul>
            {weatherData.map((weather: any, index: number) => (
              <li key={index}>
                <strong>Date:</strong> {weather.date}<br />
                <strong>Temperature:</strong> {weather.temperatureC}°C ({weather.temperatureF}°F)<br />
                <strong>Summary:</strong> {weather.summary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Homepage;
