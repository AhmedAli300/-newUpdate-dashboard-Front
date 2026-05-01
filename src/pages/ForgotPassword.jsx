import React, { useState } from 'react';
import {
  Box, Card, Typography, TextField, Button,
  Alert, CircularProgress, Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    setPreviewUrl('');

    try {
      const response = await api.post('/auth/forgot-password', { email: trimmedEmail });
      setMessage(response.data.message || 'OTP has been sent to your email.');

      // If using Ethereal (dev mode), show the preview link
      if (response.data.previewUrl) {
        setPreviewUrl(response.data.previewUrl);
      } else {
        // Real email sent — redirect after 2s
        setTimeout(() => {
          navigate('/reset-password', { state: { email: trimmedEmail } });
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      p: 2
    }}>
      <Card sx={{
        p: 4,
        width: '100%',
        maxWidth: 420,
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(31,38,135,0.37)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
      }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="800" gutterBottom color="primary.main">
            Forgot Password?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your account email and we&apos;ll send you an OTP to reset your password.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        {message && !previewUrl && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{message}</Alert>
        )}

        {/* Dev mode: show preview link */}
        {previewUrl && (
          <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              ✅ OTP sent! (Dev Mode — Ethereal)
            </Typography>
            <Typography variant="body2" mb={1}>
              Click the link below to view the email with the OTP:
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="info"
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 2, mb: 1, width: '100%', textTransform: 'none' }}
            >
              📧 Open Email Preview
            </Button>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: 2, textTransform: 'none' }}
              onClick={() => navigate('/reset-password', { state: { email: email.trim() } })}
            >
              I have the OTP → Reset Password
            </Button>
          </Alert>
        )}

        {!previewUrl && (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              disabled={loading || !!message}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={loading || !!message}
              sx={{ py: 1.5, borderRadius: 2, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
            </Button>

            <Box textAlign="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 600, textDecoration: 'none', color: '#764ba2' }}
                type="button"
              >
                ← Back to Login
              </Link>
            </Box>
          </form>
        )}
      </Card>
    </Box>
  );
};

export default ForgotPassword;
