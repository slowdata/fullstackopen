import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

const App = () => {
  const [country, setCountry] = useState({});
  const [countryText, setCountryText] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all/")
      .then(response => setCountryList(c => c.concat(response.data)));
  }, []);

  const handleCountry = e => {
    setCountryText(e.target.value);
    const countries = countryList.filter(c =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountriesFiltered(countries);
  };

  const handleShow = country => console.log(country) || setCountry(country);

  const showList = countries => {
    if (countries.length === 1) {
      console.log(countries[0]);

      setCountry(countries[0]);
    } else if (countries.length > 1 && countries.length <= 10) {
      return countries.map(c => (
        <div key={c.name}>
          {c.name}
          <button onClick={() => handleShow(c)}>show</button>
        </div>
      ));
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      find countries <input value={countryText} onChange={handleCountry} />
      {showList(countriesFiltered)}
      {Object.keys(country).length > 0 && <Country country={country} />}
    </div>
  );
};

export default App;
