import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GoScreen = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [bookingStarted, setBookingStarted] = useState(false);
  const scrollRef = useRef(null);

  const vehicles = [
    { id: 0, name: 'Grab Motorcycle', price: '₱90', color: '#00BCD4', icon: '🏍️' },
    { id: 1, name: 'Grab Car', price: '₱190', color: '#3F51B5', icon: '🚗' }
  ];

  const handleGo = () => {
    console.log(`Selected vehicle: ${vehicles[selectedVehicle].name}`);
    setBookingStarted(true);
  };

  const handleArrived = () => {
    navigate('/feedback');
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      setSelectedVehicle(Math.min(Math.max(newIndex, 0), vehicles.length - 1));
    }
  };

  const scrollToVehicle = (id) => {
    setSelectedVehicle(id);
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: id * containerWidth,
        behavior: 'smooth'
      });
    }
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
          padding: 20px 0 32px 0;
          width: 100%;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .vehicle-scroll-container {
          overflow-x: scroll;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          margin-bottom: 16px;
          scroll-behavior: smooth;
        }
        
        .vehicle-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .vehicle-cards {
          display: flex;
        }
        
        .vehicle-card {
          flex: 0 0 100%;
          width: 100%;
          background-color: #f8f8f8;
          border-radius: 16px;
          padding: 20px;
          margin: 4px 16px;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          box-sizing: border-box;
        }
        
        .vehicle-card.selected {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
          flex: 1;
        }
        
        .vehicle-name {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }
        
        .vehicle-price {
          font-size: 14px;
          color: #666666;
        }
        
        .scroll-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e0e0e0;
          transition: all 0.3s ease;
        }
        
        .indicator.active {
          width: 24px;
          border-radius: 4px;
          background-color: #00BCD4;
        }
        
        .trip-info-card {
          background-color: #f8f8f8;
          border-radius: 16px;
          padding: 20px;
          margin: 4px 16px 16px 16px;
        }
        
        .trip-time {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 4px;
        }
        
        .trip-confidence {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .confidence-label {
          font-size: 14px;
          color: #666666;
        }
        
        .confidence-value {
          font-size: 14px;
          font-weight: 600;
          color: #666666;
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background-color: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #4CAF50;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .button-container {
          padding: 0 16px;
        }
        
        .go-button {
          width: 100%;
          background-color: #00BCD4;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 16px;
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
        
        @media (max-width: 768px) {
          .go-container {
            max-width: 100vw;
          }
          
          .bottom-card {
            padding-bottom: calc(32px + env(safe-area-inset-bottom));
          }
        }
        
        @media (min-width: 769px) {
          .go-container {
            max-width: 430px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
        }
        
        @supports (padding: max(0px)) {
          .bottom-card {
            padding-bottom: max(32px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
      
      <div className="go-container">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3167890123456!2d121.03694!3d14.55027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264a0d21f%3A0x4b5f6c5a9f5e5c5a!2sMarikina%20River%20Park!5e0!3m2!1sen!2sph!4v1234567890"
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
              <div 
                className="vehicle-scroll-container"
                ref={scrollRef}
                onScroll={handleScroll}
              >
                <div className="vehicle-cards">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`vehicle-card ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                      onClick={() => scrollToVehicle(vehicle.id)}
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

              <div className="scroll-indicators">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`indicator ${selectedVehicle === vehicle.id ? 'active' : ''}`}
                  />
                ))}
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
              {/* Trip Info Card */}
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