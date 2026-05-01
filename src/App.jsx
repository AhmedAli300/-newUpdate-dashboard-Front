import './App.css'
import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, createTheme, Fade } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddEditSubscriptionPage from './pages/AddEditSubscriptionPage';
import Subscriptions from './pages/Subscriptions';
import ReceiptsPage from './pages/ReceiptsPage';
import TimePage from './pages/TimePage';
import CheckInPage from './pages/CheckInPage';
import InvitationsPage from './pages/InvitationsPage';
import LeadingClientsPage from './pages/LeadingClientsPage';
import EmployeeSalariesPage from './pages/EmployeeSalariesPage';
import ShiftSchedulePage from './pages/ShiftSchedulePage';
import SubscriptionReportPage from './pages/SubscriptionReportPage';
import TradeReportPage from './pages/TradeReportPage';
import ReceiptsReportPage from './pages/ReceiptsReportPage';
import CountPage from './pages/CountPage';
import CheckOutPage from './pages/CheckOutPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return children;
  }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 3 }, 
            mt: '64px', // Header height
            ml: { xs: 0, sm: '240px' }, // Sidebar width
            transition: 'margin 0.3s ease-in-out',
            width: '100%',
            overflowX: 'hidden'
          }}
        >
          <Fade in={true} key={location.pathname} timeout={500}>
            <Box>{children}</Box>
          </Fade>
        </Box>
      </Box>
    </>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
        } />
        <Route path="/forgot-password" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
        } />
        <Route path="/reset-password" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        } />
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/subscriptions" element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        } />
        <Route path="/subscriptions/add" element={
          <ProtectedRoute>
            <AddEditSubscriptionPage />
          </ProtectedRoute>
        } />
        <Route path="/subscriptions/edit/:id" element={
          <ProtectedRoute>
            <AddEditSubscriptionPage />
          </ProtectedRoute>
        } />
        <Route path="/receipts" element={
          <ProtectedRoute>
            <ReceiptsPage />
          </ProtectedRoute>
        } />
        <Route path="/time" element={
          <ProtectedRoute>
            <TimePage />
          </ProtectedRoute>
        } />
        <Route path="/check-in" element={
          <ProtectedRoute>
            <CheckInPage />
          </ProtectedRoute>
        } />
        <Route path="/invitations" element={
          <ProtectedRoute>
            <InvitationsPage />
          </ProtectedRoute>
        } />
        <Route path="/leading-clients" element={
          <ProtectedRoute>
            <LeadingClientsPage />
          </ProtectedRoute>
        } />
        <Route path="/employee-salaries" element={
          <ProtectedRoute>
            <EmployeeSalariesPage />
          </ProtectedRoute>
        } />
        <Route path="/shift-schedule" element={
          <ProtectedRoute>
            <ShiftSchedulePage />
          </ProtectedRoute>
        } />
        <Route path="/subscription-report" element={
          <ProtectedRoute>
            <SubscriptionReportPage />
          </ProtectedRoute>
        } />
        <Route path="/trade-report" element={
          <ProtectedRoute>
            <TradeReportPage />
          </ProtectedRoute>
        } />
        <Route path="/receipts-report" element={
          <ProtectedRoute>
            <ReceiptsReportPage />
          </ProtectedRoute>
        } />
        <Route path="/count" element={
          <ProtectedRoute>
            <CountPage />
          </ProtectedRoute>
        } />
        <Route path="/check-out" element={
          <ProtectedRoute>
            <CheckOutPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
};

function App() {  
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: '#0f172a', // Deep Slate
        light: '#334155',
        dark: '#020617',
      },
      secondary: {
        main: '#38bdf8', // Sky Blue
      },
      background: {
        default: '#f8fafc', // Slate 50
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <CssBaseline />
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;