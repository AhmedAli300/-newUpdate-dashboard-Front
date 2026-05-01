import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If accessed directly without an email from forgot password, redirect back
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleResendOTP = async () => {
    setResending(true);
    setError('');
    setMessage('');
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'New OTP has been sent to your email.');
      setTimeLeft(60); // Reset timer
      setOtp(''); // Clear old OTP field
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/auth/reset-password', { email, otp, newPassword });
      setMessage(response.data.message || 'Password reset successful!');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 2
    }}>
      <Card sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="800" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the 6-digit OTP sent to <b>{email}</b> and your new password.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'rgba(56, 189, 248, 0.1)', p: 1.5, borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" color="primary">
            Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
          {timeLeft === 0 && (
            <Button size="small" variant="outlined" onClick={handleResendOTP} disabled={resending}>
              {resending ? 'Sending...' : 'Resend OTP'}
            </Button>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="6-Digit OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading || !!message}
            inputProps={{ maxLength: 6 }}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading || !!message}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
            disabled={loading || !!message}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            disabled={loading || !!message || timeLeft === 0}
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default ResetPassword;
