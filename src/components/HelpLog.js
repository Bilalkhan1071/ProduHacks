import React from 'react';
import './HelpLog.css';

function HelpLog() {
  const helpRequests = [
    {
      id: 1,
      message: 'Jerry sent a message',
    },
    {
      id: 2,
      message: 'Bill requested help',
    },
    {
      id: 3,
      message: 'Jane requested help',
    },
    {
      id: 4,
      message: 'Samantha sent a message',
    },
    {
      id: 5,
      message: 'Bilal requested help',
    },
    {
      id: 6,
      message: 'Ethan requested new perscription',
    },
    {
      id: 7,
      message: 'Martino requested new perscription',
    },
    {
      id: 8,
      message: 'Arshia sent a message',
    },
  ];

  return (
    <div className="help-log-container">
      <h2>Help Log</h2>
      <div className="help-log-box">
        {helpRequests.map((request) => (
          <div key={request.id} className="help-request">
            {request.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpLog;
