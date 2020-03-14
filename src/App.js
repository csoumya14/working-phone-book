import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Persons from './components/Person';
import Filter from './components/personFilter';
import Form from './components/Form';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    console.log('effect');
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
    });
  }, []);
  console.log('render', persons.length, 'persons');

  const resetNotification = () => {
    setMessage(null);
    setMessageType(null);
  };

  const showSuccessNotification = message => {
    setMessage(message);
    setMessageType('success');

    setTimeout(() => resetNotification(), 5000);
  };

  const showErrorNotification = message => {
    setMessage(message);
    setMessageType('error');

    setTimeout(() => resetNotification(), 3000);
  };

  const deleteButton = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      console.log(person.name);
      const personToRemove = persons.find(p => p.id === person.id);
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          showSuccessNotification(`Removed ${person.name}`);
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id));
          showErrorNotification(
            `Information of ${personToRemove.name} has already been removed from server`,
          );
        });
    }
  };
  const changeNumber = person => {
    const numberToChange = persons.find(n => n.id === person.id);
    const changedNumber = { ...numberToChange, number: newNumber };

    personService.update(person.id, changedNumber).then(returnedPerson => {
      setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)));
      setNewName('');
      setNewNumber('');
    });
  };

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log('persons', persons);
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (existingPerson) {
      console.log('In addName - in if  branch - persons', persons);
      //window.alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        changeNumber(existingPerson);
        showSuccessNotification(`The number of ${existingPerson.name} has been changed.`);
      }
    } else {
      console.log('In addName - in else branch - persons', persons);
      personService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        console.log('In addName - in else branch - persons', persons);
        setNewName('');
        setNewNumber('');
        showSuccessNotification(`Successfully added ${returnedPerson.name}`);
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchStringChange = event => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter handleSearchStringChange={handleSearchStringChange} />
      <h2>add a new</h2>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchString={searchString} deleteButton={deleteButton} />
    </div>
  );
};

export default App;
