import { useState, useEffect } from 'react';

const WaitingScreen = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEnd = () => {
    console.log('Trip ended');
    alert('Trip ended! Redirecting to trip details...');
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
        
        .waiting-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh; /* Dynamic viewport height for mobile */
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
          backgroundColor: #f5f5f5;
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
          touch-action: pan-x pan-y;
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
          padding: 24px 20px 32px 20px;
          width: 100%;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .timer {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        
        .description {
          font-size: 14px;
          color: #666666;
          margin-bottom: 24px;
          line-height: 1.4;
        }
        
        .end-button {
          width: 100%;
          background-color: #000000;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 16px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        .end-button:active {
          background-color: #1a1a1a;
          transform: scale(0.98);
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .waiting-container {
            max-width: 100vw;
          }
          
          .bottom-card {
            padding-bottom: calc(32px + env(safe-area-inset-bottom));
          }
        }
        
        /* Desktop centered view */
        @media (min-width: 769px) {
          .waiting-container {
            max-width: 430px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
        }
        
        /* Handle notch/safe areas on iOS */
        @supports (padding: max(0px)) {
          .bottom-card {
            padding-bottom: max(32px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
      
      <div className="waiting-container">
        {/* Map Area */}
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

          <div className="timer">
            {formatTime(seconds)}
          </div>

          <div className="description">
            Waiting for public transportation
          </div>

          <button
            onClick={handleEnd}
            className="end-button"
          >
            End
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingScreen;