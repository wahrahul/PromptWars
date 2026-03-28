import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/DashboardLayout';
import OverviewView from './views/OverviewView';
import GraphView from './views/GraphView';
import SystemHooksView from './views/SystemHooksView';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading Session...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewView />} />
            <Route path="graph" element={<GraphView />} />
            <Route path="hooks" element={<SystemHooksView />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/overview" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
