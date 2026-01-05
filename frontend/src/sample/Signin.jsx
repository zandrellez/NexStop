import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './SignIn.css';

const Signin = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { success, error: signInError } = await signInUser(
      formData.get('email'),
      formData.get('password')
    );

    if (success) {
      navigate('/dashboard');
    } else {
      setError(signInError);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-brand-side">
        <div className="brand-content">
          <img src="/src/assets/NSLogo.png" alt="Logo" className="logo-img" />
        </div>
      </div>
      <div className="auth-form-side">
        <div className="form-card">
          <h2>Log in</h2>
          <p className="switch-text">Don't have an account? <Link to="/signup">Sign up</Link></p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email address</label>
              <input type="email" name="email" placeholder="helloworld@gmail.com" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" required />
            </div>
            <p className="forgot-link"><Link to="#">Forgot password?</Link></p>
            
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signin;