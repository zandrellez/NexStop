import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  return (
    <div className="auth-container">
      {/* Left side: Identical to Sign In */}
      <div className="auth-brand-side">
        <div className="brand-content">
          <img src="/src/assets/NSLogo.png" alt="Logo" className="logo-img" />
        </div>
      </div>

      {/* Right side: Form Section */}
      <div className="auth-form-side">
        <div className="form-card">
          <h2>Create account</h2>
          <p className="switch-text">
            Already have an account? <Link to="/signin">Log in</Link>
          </p>
          
          <form>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Your username" required />
            </div>

            <div className="input-group">
              <label>Email address</label>
              <input type="email" placeholder="helloworld@gmail.com" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div className="input-group">
              <label>Confirm password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div style={{ display: 'flex', gap: '8px', margin: '1rem 0', fontSize: '0.85rem' }}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I accept the terms and privacy policy</label>
            </div>
            
            <button type="submit" className="primary-btn">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;