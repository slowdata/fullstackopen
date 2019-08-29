import React from "react";

const Country = ({ country, weather }) => (
  <>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(l => (
        <li key={l.name}>{l.name}</li>
      ))}
    </ul>
    <img
      src={country.flag}
      alt={`${country.name} flag`}
      style={{ maxWidth: 300 }}
    />
    <h2>Weather in {country.capital}</h2>
    <b>temperature:</b> {weather.current.temp_c} °C
    <br />
    <img
      src={`http:${weather.current.condition.icon}`}
      alt={`${country.name} weather condition icon`}
    />
    <br />
    <b>wind:</b> {weather.current.wind_kph} kph direction{" "}
    {weather.current.wind_dir}
  </>
);

export default Country;
