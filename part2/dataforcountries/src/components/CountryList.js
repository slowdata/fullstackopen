import React from "react";

const CountryList = ({ list, onClick }) =>
  list.map(c => (
    <div key={c.name}>
      {c.name}
      <button onClick={() => onClick(c)}>show</button>
    </div>
  ));

export default CountryList;
