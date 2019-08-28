import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import Axios from "axios";

const Header = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [fPersons, setFPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/persons").then(response => {
      setFPersons(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleName = e => {
    setNewName(e.target.value);
  };
  const handleNumber = e => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    };

    if (!nameExists(person.name)) {
      setFPersons(fPersons.concat(person));
      setPersons(persons.concat(person));
    } else {
      alert(`${person.name} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const nameExists = name => persons.find(person => person.name === name);

  const handleFilter = e => {
    setFilter(e.target.value);
    const filterPersons = persons.filter(person =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFPersons(filterPersons);
  };

  return (
    <div>
      <Header title="Phonebook" />
      <Filter filter={filter} onChange={handleFilter} />

      <Header title="add a new" />

      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handleSubmit}
        onChangeName={handleName}
        onChangeNumber={handleNumber}
      />

      <Header title="Numbers" />

      <Persons persons={fPersons} />
    </div>
  );
};

export default App;
