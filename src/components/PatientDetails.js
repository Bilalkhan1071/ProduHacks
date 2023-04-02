import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './PatientDetails.css';

function PatientDetails({ patients, addActivityLog }) {
    const { patientID } = useParams();
    const [medicines, setMedicines] = useState(() => {
        const storedMedicines = localStorage.getItem(`medicines-${patientID}`);
        return storedMedicines ? JSON.parse(storedMedicines) : [];
    });
    const [newMedicine, setNewMedicine] = useState('');
    const [showReminderForm, setShowReminderForm] = useState(false);

    const patient = patients.find((patient) => patient.patientID === patientID);

    if (!patient) {
        return <div>Patient not found.</div>;
    }

    const addMedicine = () => {
        if (newMedicine.trim().length > 0) {
            const updatedMedicines = [...medicines, newMedicine.trim()];
            setMedicines(updatedMedicines);
            setNewMedicine('');
            localStorage.setItem(`medicines-${patientID}`, JSON.stringify(updatedMedicines));
        }
    };

    const removeMedicine = (index) => {
        const updatedMedicines = medicines.filter((_, i) => i !== index);
        setMedicines(updatedMedicines);
        localStorage.setItem(`medicines-${patientID}`, JSON.stringify(updatedMedicines));
    };



    const handleSendReminder = () => {
        setShowReminderForm(true);
    };

    const handleReminderSubmit = (event) => {
        event.preventDefault();
        setShowReminderForm(false);
        alert('Reminder Sent');
        const reminder = event.target.elements.reminder.value;
        const message = `Reminder sent for ${patient.name}: ${reminder}`;
        addActivityLog(message);
    };

    const handleReminderCancel = () => {
        setShowReminderForm(false);
    };

    return (
        <div className="patient-details-container">
            <div className="patient-details">
                <div className="patient-details-left">
                    {/* Left part */}
                    <table className="patient-details-table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{patient.name}</td>
                            </tr>
                            <tr>
                                <th>Patient ID</th>
                                <td>{patient.patientID}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td>{patient.age} years</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{patient.country}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="patient-details-send-reminder">
                        <button onClick={handleSendReminder}>Send Reminder</button>
                    </div>
                </div>
                <div className="patient-details-right">
                    { }
                    <h3>Medicines</h3>
                    <ul>
                        {medicines.map((medicine, index) => (
                            <li key={index} className="medicine-item">
                                {medicine}
                                <button
                                    className="delete-medicine-button"
                                    onClick={() => removeMedicine(index)}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Enter medicine name"
                        value={newMedicine}
                        onChange={(e) => setNewMedicine(e.target.value)}
                    />
                    <button onClick={addMedicine}>Add Medicine</button>
                </div>
            </div>
            {showReminderForm && (
                <div className="reminder-form-container">
                    <form className="reminder-form" onSubmit={handleReminderSubmit}>
                        <h2>Send Reminder</h2>
                        <div className="patient-details-reminder-info">
                            <div className="patient-details-reminder-name">{patient.name}</div>
                            <div className="patient-details-reminder-id">{patient.patientID}</div>
                        </div>
                        <div className="patient-details-reminder-input">
                            <label htmlFor="reminder">Reminder:</label>
                            <input type="text" id="reminder" name="reminder" />
                        </div>
                        <div className="patient-details-reminder-buttons">
                            <button type="submit">Send</button>
                            <button type="button" onClick={handleReminderCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PatientDetails;
