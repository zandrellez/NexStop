import { useState } from 'react';

const FeedbackScreen = () => {
  const [feedbackRating, setFeedbackRating] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmitFeedback = () => {
    console.log('Feedback:', { rating: feedbackRating, text: feedbackText });
    alert('Thank you for your feedback!');
    // Navigate to home or next screen
    // navigate('/home');
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
        
        .feedback-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
          background-color: #ffffff;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          padding: 40px 24px 32px 24px;
        }
        
        .feedback-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .feedback-title {
          font-size: 28px;
          font-weight: 700;
          color: #000000;
          margin-top: 60px;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .feedback-subtitle {
          font-size: 15px;
          color: #666666;
          text-align: center;
          line-height: 1.5;
          margin-bottom: 32px;
          max-width: 320px;
        }
        
        .rating-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .rating-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 12px;
          border: 2px solid transparent;
          background-color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 16px;
          font-weight: 600;
          -webkit-tap-highlight-color: transparent;
        }
        
        .rating-button:active {
          transform: scale(0.95);
        }
        
        .rating-button.selected-yes {
          background-color: #E8F5E9;
          border-color: #4CAF50;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        .rating-button.selected-no {
          background-color: #FFEBEE;
          border-color: #F44336;
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }
        
        .rating-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .rating-icon.yes {
          background-color: #E8F5E9;
        }
        
        .rating-icon.no {
          background-color: #FFEBEE;
        }
        
        .rating-text {
          color: #000000;
        }
        
        .feedback-textarea {
          width: 100%;
          min-height: 200px;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 15px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          resize: none;
          margin-bottom: 24px;
          transition: border-color 0.2s ease;
        }
        
        .feedback-textarea:focus {
          outline: none;
          border-color: #00BCD4;
        }
        
        .feedback-textarea::placeholder {
          color: #999999;
        }
        
        .submit-button {
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
          margin-top: auto;
        }
        
        .submit-button:active {
          background-color: #00ACC1;
          transform: scale(0.98);
        }
        
        .submit-button:disabled {
          background-color: #B0BEC5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        @media (max-width: 768px) {
          .feedback-container {
            max-width: 100vw;
            padding-bottom: calc(32px + env(safe-area-inset-bottom));
          }
        }
        
        @media (min-width: 769px) {
          .feedback-container {
            max-width: 430px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
        }
        
        @supports (padding: max(0px)) {
          .feedback-container {
            padding-bottom: max(32px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
      
      <div className="feedback-container">
        <div className="feedback-content">
          <h1 className="feedback-title">Thank You!</h1>
          <p className="feedback-subtitle">
            How was your trip? Did this trip meet your expectation?
          </p>
          
          <div className="rating-buttons">
            <button
              className={`rating-button ${feedbackRating === 'yes' ? 'selected-yes' : ''}`}
              onClick={() => setFeedbackRating('yes')}
            >
              <div className="rating-icon yes">👍</div>
              <span className="rating-text">Yes</span>
            </button>
            
            <button
              className={`rating-button ${feedbackRating === 'no' ? 'selected-no' : ''}`}
              onClick={() => setFeedbackRating('no')}
            >
              <div className="rating-icon no">👎</div>
              <span className="rating-text">No</span>
            </button>
          </div>
          
          <textarea
            className="feedback-textarea"
            placeholder="Share your thoughts (optional)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>
        
        <button
          className="submit-button"
          onClick={handleSubmitFeedback}
          disabled={feedbackRating === null}
        >
          Submit now
        </button>
      </div>
    </>
  );
};

export default FeedbackScreen;