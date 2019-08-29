import React, { useState, useEffect } from "react";
import axios from "axios";

import { apixuUri } from "./config";

import Country from "./components/Country";
import CountryList from "./components/CountryList";

const App = () => {
  const [country, setCountry] = useState({});
  const [countryText, setCountryText] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [showList, setShowList] = useState(0);

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all/")
      .then(response => setCountryList(c => c.concat(response.data)));
  }, []);

  const getWeather = city => {
    axios
      .get(`${apixuUri}${city}`)
      .then(response => setWeather(response.data) || setShowList(1))
      .catch(error => console.error(error.message));
  };

  const handleCountry = e => {
    setCountryText(e.target.value);
    const countries = countryList.filter(c =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (countries.length === 1) {
      getWeather(countries[0].capital);
      setCountry(countries[0]);
    } else if (countries.length > 1 && countries.length <= 10) {
      setShowList(2);
      setWeather({});
    } else if (countries.length > 10) {
      setShowList(3);
      setWeather({});
    } else {
      setShowList(0);
      setWeather({});
    }
    setCountriesFiltered(countries);
  };

  const handleShow = country => {
    getWeather(country.capital);
    setCountry(country);
  };

  return (
    <div>
      <h1>Countries</h1>
      find countries <input value={countryText} onChange={handleCountry} />
      {showList > 1 ? (
        showList === 2 ? (
          <CountryList list={countriesFiltered} onClick={handleShow} />
        ) : (
          <div>Too many matches, specify another filter</div>
        )
      ) : (
        showList === 1 && <Country country={country} weather={weather} />
      )}
    </div>
  );
};

export default App;
