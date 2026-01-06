import { useState } from 'react';

const GoScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [bookingStarted, setBookingStarted] = useState(false);

  const vehicles = [
    { id: 0, name: 'Grab Motorcycle', price: '₱90', color: '#00BCD4', icon: '🏍️' },
    { id: 1, name: 'Grab Car', price: '₱190', color: '#3F51B5', icon: '🚗' }
  ];

  const handleGo = () => {
    console.log(`Selected vehicle: ${vehicles[selectedVehicle].name}`);
    setBookingStarted(true);
  };

  const handleArrived = () => {
    console.log('Arrived at destination');
    alert('Redirecting to feedback...');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow: hidden;
        }
        
        .go-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
          background-color: #f5f5f5;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .map-container {
          flex: 1;
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        .map-iframe {
          border: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .bottom-card {
          background-color: #ffffff;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 32px 0 40px 0;
          width: 100%;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .vehicle-scroll-container {
          padding: 0 40px;
          margin-bottom: 24px;
        }
        
        .vehicle-cards {
          display: flex;
          gap: 16px;
        }
        
        .vehicle-card {
          flex: 1;
          background-color: #f8f8f8;
          border-radius: 16px;
          padding: 20px 16px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .vehicle-card.selected {
          background-color: #ffffff;
          border-color: #00BCD4;
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.2);
        }
        
        .vehicle-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
        }
        
        .vehicle-info {
          text-align: left;
          flex: 1;
        }
        
        .vehicle-name {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }
        
        .vehicle-price {
          font-size: 15px;
          color: #666666;
        }
        
        .trip-info-card {
          background-color: #f8f8f8;
          border-radius: 20px;
          padding: 28px 24px;
          margin: 4px 40px 24px 40px;
        }
        
        .trip-time {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .trip-confidence {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .confidence-label {
          font-size: 16px;
          color: #666666;
        }
        
        .confidence-value {
          font-size: 16px;
          font-weight: 600;
          color: #666666;
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background-color: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #4CAF50;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .button-container {
          padding: 0 40px;
        }
        
        .go-button {
          width: 100%;
          background-color: #00BCD4;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          padding: 18px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        .go-button:active {
          background-color: #00ACC1;
          transform: scale(0.98);
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .bottom-card {
            padding: 20px 0 32px 0;
            padding-bottom: calc(32px + env(safe-area-inset-bottom));
          }
          
          .vehicle-scroll-container {
            padding: 0 16px;
            margin-bottom: 16px;
          }
          
          .vehicle-cards {
            gap: 12px;
            flex-direction: column;
          }
          
          .vehicle-card {
            padding: 16px;
          }
          
          .vehicle-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }
          
          .vehicle-name {
            font-size: 15px;
          }
          
          .vehicle-price {
            font-size: 14px;
          }
          
          .trip-info-card {
            padding: 20px;
            margin: 4px 16px 16px 16px;
          }
          
          .trip-time {
            font-size: 24px;
            margin-bottom: 4px;
          }
          
          .trip-confidence {
            margin-bottom: 8px;
          }
          
          .confidence-label,
          .confidence-value {
            font-size: 14px;
          }
          
          .progress-bar {
            height: 4px;
          }
          
          .button-container {
            padding: 0 16px;
          }
          
          .go-button {
            font-size: 16px;
            padding: 16px;
          }
        }
        
        /* Handle notch/safe areas on iOS */
        @supports (padding: max(0px)) {
          .bottom-card {
            padding-bottom: max(40px, env(safe-area-inset-bottom));
          }
          
          @media (max-width: 768px) {
            .bottom-card {
              padding-bottom: max(32px, env(safe-area-inset-bottom));
            }
          }
        }
      `}</style>
      
      <div className="go-container">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64228312948!2d120.8204!3d14.5995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1234567890"
            className="map-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          />
        </div>

        <div className="bottom-card">
          {!bookingStarted ? (
            <>
              <div className="vehicle-scroll-container">
                <div className="vehicle-cards">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`vehicle-card ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                      <div 
                        className="vehicle-icon"
                        style={{ backgroundColor: vehicle.color + '20' }}
                      >
                        {vehicle.icon}
                      </div>
                      <div className="vehicle-info">
                        <div className="vehicle-name">{vehicle.name}</div>
                        <div className="vehicle-price">{vehicle.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="button-container">
                <button
                  onClick={handleGo}
                  className="go-button"
                >
                  Go
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="trip-info-card">
                <div className="trip-time">10 minutes</div>
                <div className="trip-confidence">
                  <span className="confidence-label">Confidence</span>
                  <span className="confidence-value">High</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="button-container">
                <button
                  onClick={handleArrived}
                  className="go-button"
                >
                  Arrived at destination
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GoScreen;