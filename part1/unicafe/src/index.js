import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value ? value : 0} {text === "positive" && " %"}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total }) => {
  const avg = (good + bad * -1) / total;
  const prct = (good / total) * 100;

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={avg} />
        <Statistic text="positive" value={prct} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  return (
    <>
      <Header title="Give Feedback" />
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>
      <Header title="Statistics" />
      {!total ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
