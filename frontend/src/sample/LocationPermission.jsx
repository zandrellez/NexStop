import React, { useState } from 'react';
import './LocationsInputs.css';

const LocationPermission = () => {
  // Views: 'permission', 'home', 'trip_forms'
  const [view, setView] = useState('permission');

  const handleAllow = () => {
    setView('home');
  };

  const handleGoToForms = () => {
    setView('trip_forms');
  };

  const handleDeny = () => {
    setView('deny_message');
  };

  const handleBackToPermission = () => {
  setView('permission');
  };

  return (
    <div className="app-container">
      {view !== 'trip_forms' && <div className="map-bg" />}

      {/* --- VIEW 1: Permission Screen --- */}
      {view === 'permission' && (
        <div className="overlay" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div className="location-pin-container">
            <img src="src/assets/pin-icon.png" alt="Pin" className="pin-icon" />
            <h2 style={{ color: '#000', fontWeight: 'bold' }}>Enable Location</h2>
          </div>
          <div className="button-group">
            <button className="primary-btn" onClick={handleAllow}> Allow</button>
            <button className="secondary-btn" onClick={handleDeny}> Don't allow</button>
          </div>
        </div>
      )}

      {/* --- VIEW: Deny Message Overlay --- */}
{view === 'deny_message' && (
  <>
    {/* Keep permission background */}
    <div className="overlay" style={{ background: 'rgba(255,255,255,0.2)' }}>
      <div className="location-pin-container">
        <img src="src/assets/pin-icon.png" alt="Pin" className="pin-icon" />
        <h2 style={{ color: '#000', fontWeight: 'bold' }}>Enable Location</h2>
      </div>
      <div className="button-group">
        <button className="primary-btn">Allow</button>
        <button className="secondary-btn">Don't allow</button>
      </div>
    </div>

    {/* Deny message box */}
    <div
      className="deny-message-box"
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '20px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        zIndex: 10,
        textAlign: 'center',
        width: '80%',
        maxWidth: '300px'
      }}
    >
      <p style={{ marginBottom: '20px', fontWeight: '600', color: '#333' }}>
        Enable location to continue.
      </p>
      <button className="primary-btn" onClick={handleBackToPermission}>
        OK
      </button>
    </div>
  </>
)}

      {/* --- VIEW 2: Location Home Screen --- */}
      {view === 'home' && (
        <div className="overlay">
          <div className="action-card top-card">
            {/* Navigates to TripForms on Click */}
            <div className="location-option" onClick={handleGoToForms} role="button" style={{ cursor: 'pointer' }}>
              <div className="dot-filled" />
              <span style={{ fontWeight: '600' }}>Use my location</span>
            </div>
            <hr className="divider" />
            <div className="location-option" onClick={handleGoToForms} role="button" style={{ cursor: 'pointer' }}>
              <div className="dot-outline" />
              <span style={{ fontWeight: '600' }}>Choose location</span>
            </div>
          </div>
          
          <div className="map-marker-center">
            <div className="pulse-ring"></div>
            <div className="center-dot"></div>
          </div>
        </div>
      )}

      {/* --- VIEW 3: Trip Forms Screen --- */}
      {view === 'trip_forms' && (
        <div className="overlay" style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ textAlign: 'left', margin: '20px 0', color: '#666', fontSize: '1rem' }}>Trip Information</h3>
          
          <div className="location-banner">
            <div style={{ background: '#E8DBFF', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: '#5D3E9F', fontSize: '1.2rem' }}> </span>
            </div>
            <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Location</span>
          </div>

          <div className="form-content" style={{ marginTop: '30px', flex: 1 }}>
            {/* Urgency */}
            <div className="form-group">
              <label>How urgent is your trip?</label>
              <select className="custom-select">
                <option value="">Select</option>
                <option value="not_urgent">Not urgent</option>
                <option value="somehow_urgent">Somehow urgent</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Weather */}
            <div className="form-group">
              <label>Current Weather</label>
              <select className="custom-select">
                <option value="">Select</option>
                <option value="clear">Clear</option>
                <option value="gloomy">Gloomy</option>
                <option value="rainy">Rainy</option>
              </select>
            </div>

            {/* Budget */}
            <div className="form-group">
              <label>Budget Preference</label>
              <select className="custom-select">
                <option value="">Select</option>
                <option value="low-cost">Low-cost</option>
                <option value="balanced">Balanced</option>
                <option value="comfort">Comfort</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button className="primary-btn" style={{ marginBottom: '20px' }} onClick={() => setView('home')}>
              Wait
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPermission;