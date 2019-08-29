import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personServices from "./services/persons";

const Header = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [fPersons, setFPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then(persons => {
      setFPersons(persons);
      setPersons(persons);
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
      personServices.createPerson(person).then(returnPerson => {
        setFPersons(fPersons.concat(returnPerson));
        setPersons(persons.concat(returnPerson));
      });
    } else {
      const result = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        const id = nameExists(person.name).id;
        personServices.updatePerson(id, person).then(returnPerson => {
          const newPersons = persons.map(p => (p.id !== id ? p : returnPerson));
          setFPersons(newPersons);
          setPersons(newPersons);
        });
      }
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

  const handleDelete = person => {
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personServices.deletePerson(person.id).then(status => {
        if (status === 200) {
          setPersons(persons.filter(p => p.id !== person.id));
          setFPersons(persons.filter(p => p.id !== person.id));
        }
      });
    }
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

      <Persons persons={fPersons} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
