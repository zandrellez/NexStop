import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useActionState } from 'react';
import './SignIn.css';

const Signin = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get('email');
      const password = formData.get('password');

      const {
        success,
        data,
        isAdmin,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError);
      }

      if (success && data?.session) {
        if (isAdmin) {
          navigate('/admin/dashboard'); 
          return null;
        }
        navigate('/dashboard'); 
        return null;
      }
      
      return null;
    },
    null
  );

  const handleGuestMode = () => {
    navigate('/dashboard'); 
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
          
          <form action={submitAction} aria-label="Sign in form">
            <div className="input-group">
              <label>Email address</label>
              <input type="email" name="email" placeholder="helloworld@gmail.com" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" required />
            </div>
            <p className="forgot-link"><Link to="#">Forgot password?</Link></p>
            
            <button type="submit" className="primary-btn" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Log in'}
            </button>

            <button 
              type="button" 
              className="guest-btn" 
              onClick={handleGuestMode}
            >
              Guest Mode
            </button>
          </form>

          {/* Neat Social Login Section */}
          <div className="divider-container">
            <span className="divider-line"></span>
            <span className="divider-text">Or Login with</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-icons-row">
            <button className="social-btn" type="button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
            </button>
            <button className="social-btn" type="button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" />
            </button>
            <button className="social-btn" type="button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
            </button>
          </div>

          {error && <p className="error-msg">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signin;