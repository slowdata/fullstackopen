import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all/")
      .then(response => setCountryList(c => c.concat(response.data)));
  }, []);

  const handleCountry = e => {
    setCountry(e.target.value);
    const countries = countryList.filter(c =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountriesFiltered(countries);
  };

  const showList = countries => {
    console.log(countries, countries.length);

    if (countries.length === 1) {
      const [country] = countries;
      return (
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
          <img src={country.flag} alt={`${country.name} flag`} />
        </>
      );
    } else if (countries.length > 1 && countries.length <= 10) {
      return countries.map(c => <div key={c.name}>{c.name}</div>);
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      find countries <input value={country} onChange={handleCountry} />
      {showList(countriesFiltered)}
    </div>
  );
};

export default App;
