import React from "react";

const Filter = ({ filter, onChange }) => (
  <>
    filter shown with: <input type="text" value={filter} onChange={onChange} />
  </>
);

export default Filter;
