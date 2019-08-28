import React from "react";

import Part from "./Part";

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
    <b>
      total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
    </b>
  </>
);

export default Content;
