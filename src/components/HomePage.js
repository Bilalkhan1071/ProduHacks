import React from 'react';
import './HomePage.css';

function HomePage({ activityLogs, setActivityLogs }) {
  const handleRemoveClick = (indexToRemove) => {
    setActivityLogs(activityLogs.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="home-page">
      <h2 className="activity-log-title">Daily Activity Log</h2>
      <div className="activity-log-container">
        <div className="activity-log-list">
          {activityLogs.map((activityLog, index) => (
            <div key={index} className="activity-log-item">
              {activityLog}
              <button
                className="delete-activity-log-button"
                onClick={() => handleRemoveClick(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
