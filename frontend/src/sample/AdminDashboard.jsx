import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase-client';
import './AdminDashboard.css';
import logo from '../assets/NSLogo.png'; //

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({ 
    avgWait: 0, 
    followRate: 0, 
    helpfulRate: 0,
    total: 0 
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  // Requirement 3.1: Admin Logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signin'); //
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside or on a nav item (mobile)
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Requirement 3.2: Fetch sessions from the database
      // Using 'waiting_sessions' as defined in the Backend requirement
      const { data, error } = await supabase
        .from('waiting_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setSessions(data);
        
        // Requirement 3.3: Analytics Calculation
        const total = data.length;
        if (total > 0) {
          const totalActualWait = data.reduce((acc, curr) => acc + (curr.actual_wait || 0), 0);
          const followedCount = data.filter(s => s.outcome === s.recommendation).length;
          const helpfulCount = data.filter(s => s.is_helpful).length;

          setStats({
            total,
            avgWait: (totalActualWait / total).toFixed(1),
            followRate: ((followedCount / total) * 100).toFixed(0),
            helpfulRate: ((helpfulCount / total) * 100).toFixed(0)
          });
        }
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation with Branding */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="brand">
          <img src={logo} alt="NexStop Logo" className="brand-logo-small" />
          <div className="brand-name">NexStop</div>
          <p className="brand-tagline">Optimizing Your Commute</p>
        </div>
        <nav>
          <button 
            className={activeTab === 'Overview' ? 'active' : ''} 
            onClick={() => { setActiveTab('Overview'); closeSidebar(); }}
          > Overview
          </button>
          <button 
            className={activeTab === 'User Logs' ? 'active' : ''} 
            onClick={() => { setActiveTab('User Logs'); closeSidebar(); }}
          > User Logs
          </button>
          <button className="logout-btn" onClick={() => { handleLogout(); closeSidebar(); }}>Logout</button>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-nav">
          <button 
            className="hamburger" 
            onClick={toggleSidebar} 
            aria-expanded={isSidebarOpen} 
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <h2>{activeTab} Analytics</h2>
        </header>

        {activeTab === 'Overview' ? (
          <>
            {/* Requirement 3.3: Analytics Bento Grid */}
            <section className="stats-grid">
              <div className="glass-card stat">
                <span className="label">Avg Wait Time</span>
                <div className="value">{stats.avgWait} <small>min</small></div>
              </div>
              <div className="glass-card stat">
                <span className="label">Rec. Follow Rate</span>
                <div className="value">{stats.followRate}%</div>
              </div>
              <div className="glass-card stat">
                <span className="label">Helpfulness Rate</span>
                <div className="value">{stats.helpfulRate}%</div>
              </div>
            </section>

            {/* Requirement 3.2: Sessions Table */}
            <section className="table-container glass-card">
              <div className="table-header">
                <h3>Recent Commute Records</h3>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Corridor</th>
                      <th>Recommendation</th>
                      <th>Pred. vs Actual</th>
                      <th>Outcome</th>
                      <th>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length > 0 ? (
                      sessions.map((s) => (
                        <tr key={s.id}>
                          <td>{new Date(s.created_at).toLocaleString()}</td>
                          <td>{s.corridor}</td>
                          <td>
                            <span className={`badge ${s.recommendation?.toLowerCase()}`}>
                              {s.recommendation}
                            </span>
                          </td>
                          <td>{s.predicted_wait}m / {s.actual_wait}m</td>
                          <td>{s.outcome}</td>
                          <td>{s.is_helpful ? '✅ Helpful' : '❌ Unhelpful'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>No sessions recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <div className="glass-card placeholder-view">
            <h3>{activeTab} View</h3>
            <p>This section is currently under development.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;