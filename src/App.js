import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { MainLayout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Issues from './pages/Issues';
import Sprints from './pages/Sprints';
import AdminLayout from '../src/components/Admin/AdminLayout';
import AdminDashboard from '../src/pages/Admin/AdminDashboard';
import IssueTypesAdmin from '../src/pages/Admin/IssueTypesAdmin';
import IssueStatusAdmin from './pages/Admin/IssueStatusAdmin';
import WorkflowsAdmin from './pages/Admin/WorkflowsAdmin';
import CustomFieldsAdmin from './pages/Admin/CustomFieldsAdmin';
import UsersAdmin from './pages/Admin/UsersAdmin';
import EmailSettingsAdmin from './pages/Admin/EmailSettingsAdmin';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
    },
    secondary: {
      main: '#36B37E',
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <Navigate to="/" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/projects" element={
        <ProtectedRoute>
          <Projects />
        </ProtectedRoute>
      } />
      <Route path="/issues" element={
        <ProtectedRoute>
          <Issues />
        </ProtectedRoute>
      } />
      <Route path="/sprints" element={
        <ProtectedRoute>
          <Sprints />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/issue-types" element={
        <ProtectedRoute>
          <AdminLayout>
            <IssueTypesAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/issue-status" element={
        <ProtectedRoute>
          <AdminLayout>
            <IssueStatusAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/workflows" element={
        <ProtectedRoute>
          <AdminLayout>
            <WorkflowsAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/custom-fields" element={
        <ProtectedRoute>
          <AdminLayout>
            <CustomFieldsAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <AdminLayout>
            <UsersAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/email-settings" element={
        <ProtectedRoute>
          <AdminLayout>
            <EmailSettingsAdmin />
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProjectProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
