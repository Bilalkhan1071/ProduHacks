import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddPatientForm from './AddPatientForm';
import './PatientsList.css';

function PatientsList({ patients, addPatient, removePatient, addActivityLog, setActivityLogs }) {
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleRemoveClick = (patientID) => {
    if (window.confirm('Are you sure you want to remove this patient?')) {
      removePatient(patientID);
    }
  };

  return (
    <div>
      <div className="patients-list">
        <div className="patients-list-header">
          <h2>Patients List</h2>
          <button
            className="add-patient-button"
            onClick={() => setShowAddPatientForm(true)}
          >
            Add Patient
          </button>
        </div>
        <div className="list-container">
          <div className="column-titles">
            <div>Name</div>
            <div>Patient ID</div>
            <div>Age</div>
            <div>Country</div>
          </div>
          {patients.length === 0 ? (
            <div className="empty-row"></div>
          ) : (
            patients.map((patient) => (
              <div key={patient.patientID} className="patient-item">
                <div>
                  <Link to={`/patient/${patient.patientID}`}>{patient.name}</Link>
                </div>
                <div>{patient.patientID}</div>
                <div>{patient.age} years</div>
                <div>{patient.country}</div>
                <div>
                  <button
                    className="delete-patient-button"
                    onClick={() => handleRemoveClick(patient.patientID)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showAddPatientForm && (
        <AddPatientForm
          onClose={() => setShowAddPatientForm(false)}
          onSubmit={addPatient}
          addActivityLog = {addActivityLog}
        />
      )}
    </div>
  );
}

export default PatientsList;
