import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = selected => () => {
    const newVotes = [...votes];
    newVotes[selected] = votes[selected] ? votes[selected] + 1 : 1;
    setVotes(newVotes);
  };

  const getMax = () => {
    const max = Math.max.apply(null, votes);
    return max;
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      has {votes[selected] ? votes[selected] : 0} votes
      <br />
      <button onClick={handleVote(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      {Object.keys(votes).length > 0 && (
        <>
          <Header text="Anecdote with most votes" />
          {anecdotes[votes.indexOf(getMax())]}
          <br />
          has {getMax()} votes
        </>
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
