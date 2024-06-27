import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', age: '' });
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const response = await axios.get(apiUrl);
    setPersons(response.data);
  };

  const createPerson = async () => {
    await axios.post(apiUrl, newPerson);
    setNewPerson({ name: '', age: '' });
    fetchPersons();
  };

  const updatePerson = async (id) => {
    await axios.put(`${apiUrl}/${id}`, editPerson);
    setEditPerson(null);
    fetchPersons();
  };

  const deletePerson = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchPersons();
  };

  return (
    <div>
      <h1>Person List</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newPerson.age}
          onChange={(e) => setNewPerson({ ...newPerson, age: e.target.value })}
        />
        <button onClick={createPerson}>Add Person</button>
      </div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {editPerson && editPerson.id === person.id ? (
              <>
                <input
                  type="text"
                  value={editPerson.name}
                  onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
                />
                <input
                  type="number"
                  value={editPerson.age}
                  onChange={(e) => setEditPerson({ ...editPerson, age: e.target.value })}
                />
                <button onClick={() => updatePerson(person.id)}>Save</button>
                <button onClick={() => setEditPerson(null)}>Cancel</button>
              </>
            ) : (
              <>
                {person.name} ({person.age})
                <button onClick={() => setEditPerson(person)}>Edit</button>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
