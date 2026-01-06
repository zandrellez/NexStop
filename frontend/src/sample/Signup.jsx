import { Link } from 'react-router-dom';
import './Signup.css';
import { useAuth } from '../context/AuthContext';
import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signUpUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get('email');
      const password = formData.get('password');

      const {
        success,
        data,
        error: signUpError,
      } = await signUpUser(email, password);

      if (signUpError) {
        return new Error(signUpError);
      }
      if (success && data?.session) {
        navigate('/dashboard');
        return null;
      }
      return null;
    },
    null
  );

  return (
    <div className="auth-container">
      {/* Left side: Identical to Sign In */}
      <div className="auth-brand-side">
        <div className="brand-content">
          <img src="/src/assets/NSLogo.png" alt="Logo" className="logo-img" />
          <h1 className="brand-title">NexStop</h1>
        </div>
      </div>

      {/* Right side: Form Section */}
      <div className="auth-form-side">
        <div className="form-card">
          <h2>Create account</h2>
          <p className="switch-text">
            Already have an account? <Link to="/signin">Log in</Link>
          </p>
          
          <form action={submitAction} aria-label="Sign up form" aria-describedby="form-description">
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Your username" required />
            </div>

            <div className="input-group">
              <label>Email address</label>
              <input name="email" type="email" placeholder="helloworld@gmail.com" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="input-group">
              <label>Confirm password</label>
              <input name="confirmPassword" type="password" placeholder="••••••••" required />
            </div>

            <div style={{ display: 'flex', gap: '8px', margin: '1rem 0', fontSize: '0.85rem' }}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I accept the terms and privacy policy</label>
            </div>
            
            <button type="submit" className="primary-btn" disabled={isPending} aria-busy={isPending}>
              {isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          {error && <p className="error-msg">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;