import React from "react";

const Person = ({ person, deleteFunction }) => {
  return (
    <tr>
      <td>{person.name} </td>
      <td>{person.number}</td>
      <td>
        <button onClick={deleteFunction}>Delete</button>
      </td>
    </tr>
  );
};

const Persons = ({ persons, searchString, deleteButton }) => {
  if (persons.length === 0) {
    return null;
  }

  const filteredPersons =
    searchString === ""
      ? persons
      : persons.filter(p =>
          p.name.toLowerCase().includes(searchString.toLowerCase())
        );

  const rows = () =>
    filteredPersons.map(person => (
      <Person
        person={person}
        key={person.id}
        deleteFunction={() => deleteButton(person)}
      />
    ));

  return (
    <table>
      <tbody>{rows()}</tbody>
    </table>
  );
};

export default Persons;
