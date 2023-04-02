import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddPatientForm.css';

function AddPatientForm({ onClose, onSubmit, addActivityLog }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPatient = {
      name,
      age,
      country,
      patientID: uuidv4() // generate a unique patient ID
    };
    const message = `Added ${newPatient.name} to Patients Lists`;
    addActivityLog(message);
    onSubmit(newPatient);
    setName('');
    setAge('');
    setCountry('');
    onClose();
  };

  return (
    <div className="add-patient-form-container">
      <form onSubmit={handleSubmit} className="add-patient-form">
        <h2>Add Patient</h2>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Add Patient</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddPatientForm;
