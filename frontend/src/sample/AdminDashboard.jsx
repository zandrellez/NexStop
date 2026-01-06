import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase-client';
import './AdminDashboard.css';
import logo from '../assets/NSLogo.png';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Admin Logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside or on a nav item (mobile)
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch sessions from the database
        const { data, error } = await supabase
          .from('logs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setSessions(data);

          // Analytics Calculation
          const total = data.length;
          if (total > 0) {
            const totalWaitWindow = data.reduce((acc, curr) => acc + (curr.wait_window || 0), 0);
            const goCount = data.filter(s => s.recommended === 'GO').length;
            // Calculate helpfulness as average confidence score
            const totalConfidence = data.reduce((acc, curr) => acc + (curr.confidence || 0), 0);

            setStats({
              total,
              avgWait: (totalWaitWindow / total).toFixed(1),
              followRate: ((goCount / total) * 100).toFixed(0),
              helpfulRate: (totalConfidence / total).toFixed(0)
            });
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Reset to safe defaults on error
        setSessions([]);
        setStats({ avgWait: 0, followRate: 0, helpfulRate: 0, total: 0 });
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation with Branding */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="NexStop Logo" className="sidebar-logo" />
          <h2>NexStop</h2>
          <p className="sidebar-tagline">Optimizing Your Commute</p>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === 'Overview' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Overview');
              closeSidebar();
            }}
          >
            Overview
          </button>
          <button
            className={activeTab === 'User Logs' ? 'active' : ''}
            onClick={() => {
              setActiveTab('User Logs');
              closeSidebar();
            }}
          >
            User Logs
          </button>
          <button onClick={() => { handleLogout(); closeSidebar(); }}>Logout</button>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-bar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>{activeTab} Analytics</h1>
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
                      <th>Wait Window</th>
                      <th>Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length > 0 ? (
                      sessions.slice(0, 10).map((s) => (
                        <tr key={s.id}>
                          <td>{new Date(s.created_at).toLocaleString()}</td>
                          <td>{s.corridor}</td>
                          <td>
                            <span className={`badge ${s.recommended?.toLowerCase()}`}>
                              {s.recommended}
                            </span>
                          </td>
                          <td>{s.wait_window}m</td>
                          <td>{s.confidence}%</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>No sessions recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : activeTab === 'User Logs' ? (
          <>
            {/* Detailed User Logs Table */}
            <section className="table-container glass-card">
              <div className="table-header">
                <h3>Complete User Logs</h3>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Name</th>
                      <th>Origin</th>
                      <th>Corridor</th>
                      <th>Budget</th>
                      <th>Urgency</th>
                      <th>Traffic</th>
                      <th>Weather</th>
                      <th>Recommendation</th>
                      <th>Wait Window</th>
                      <th>Confidence</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length > 0 ? (
                      sessions.map((s) => (
                        <tr key={s.id}>
                          <td>{new Date(s.created_at).toLocaleString()}</td>
                          <td>{s.name || 'N/A'}</td>
                          <td>{s.origin || 'N/A'}</td>
                          <td>{s.corridor || 'N/A'}</td>
                          <td>₱{s.budget}</td>
                          <td>
                            <span className={`urgency urgency-${s.urgency}`}>
                              {s.urgency}
                            </span>
                          </td>
                          <td>
                            <span className={`traffic traffic-${s.traffic}`}>
                              {s.traffic}
                            </span>
                          </td>
                          <td>
                            <span className={`weather weather-${s.weather}`}>
                              {s.weather}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${s.recommended?.toLowerCase()}`}>
                              {s.recommended}
                            </span>
                          </td>
                          <td>{s.wait_window}m</td>
                          <td>
                            <span className="confidence">{s.confidence}%</span>
                          </td>
                          <td className="reason-cell">{s.reason}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" style={{ textAlign: 'center' }}>
                          No sessions recorded yet.
                        </td>
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