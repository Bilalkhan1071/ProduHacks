import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PatientsList from './components/PatientsList';
import PatientDetails from './components/PatientDetails';
import HelpLog from './components/HelpLog';

function App() {
  const [patients, setPatients] = React.useState(() => {
    const storedPatients = localStorage.getItem('patients');
    return storedPatients ? JSON.parse(storedPatients) : [];
  });

  const [activityLogs, setActivityLogs] = React.useState(() => {
    const storedActivityLogs = localStorage.getItem('activityLogs');
    return storedActivityLogs ? JSON.parse(storedActivityLogs) : [];
  });

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  const removePatient = (patientID) => {
    setPatients(patients.filter((patient) => patient.patientID !== patientID));
  };

  const addActivityLog = (log) => {
    setActivityLogs([...activityLogs, log]);
  };


  React.useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  React.useEffect(() => {
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage activityLogs={activityLogs} setActivityLogs={setActivityLogs} />}
            />
            <Route
              path="/patients"
              element={<PatientsList patients={patients} addPatient={addPatient} removePatient={removePatient} addActivityLog={addActivityLog} setActivityLogs={setActivityLogs}/>}
            />
            <Route
              path="/patient/:patientID"
              element={<PatientDetails patients={patients} addActivityLog={addActivityLog} setActivityLogs={setActivityLogs}/>}
            />
            <Route path="/help-log" element={<HelpLog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
