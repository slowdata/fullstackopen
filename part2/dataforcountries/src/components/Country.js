import React from "react";

const Country = ({ country }) =>
  console.log(">", country) || (
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
    </>
  );

export default Country;
