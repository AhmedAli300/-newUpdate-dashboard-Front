import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import {
  Box, TextField, Checkbox, FormControlLabel, Button, Typography,
  FormControl, InputLabel, Select, MenuItem, Paper, Grid, Stack, Divider,
  IconButton, Breadcrumbs, Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const AddEditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    paid: false,
    notes: '',
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/subscriptions/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error('Error loading subscription:', err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      api.put(`/subscriptions/${id}`, formData)
        .then(() => {
          navigate('/subscriptions');
        })
        .catch(err => console.error('Error updating:', err));
    } else {
      api.post('/subscriptions', formData)
        .then(() => {
          navigate('/subscriptions');
        })
        .catch(err => console.error('Error adding:', err));
    }
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <IconButton 
            onClick={() => navigate('/subscriptions')}
            sx={{ bgcolor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box>
            <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="small" />} 
                aria-label="breadcrumb"
                sx={{ mb: 0.5 }}
            >
                <Link underline="hover" color="inherit" href="/subscriptions" sx={{ fontSize: '0.8rem' }}>
                    Subscriptions
                </Link>
                <Typography color="text.primary" sx={{ fontSize: '0.8rem' }}>
                    {isEdit ? 'Edit' : 'New'}
                </Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                {isEdit ? 'Update Member' : 'New Subscription'}
            </Typography>
        </Box>
      </Stack>

      <Paper component="form" onSubmit={handleSubmit} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Basic Information</Typography>
            <Typography variant="body2" color="text.secondary">Enter the membership details for the user.</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <TextField 
                            name="name" 
                            label="Member Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            fullWidth 
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        
                        <FormControl fullWidth required>
                            <InputLabel id="subscription-type-label">Subscription Type</InputLabel>
                            <Select
                                labelId="subscription-type-label"
                                name="type"
                                value={formData.type}
                                label="Subscription Type"
                                onChange={handleChange}
                                sx={{ borderRadius: 2 }}
                            >
                                <MenuItem value="Monthly">Monthly Plan</MenuItem>
                                <MenuItem value="Annual">Annual Plan</MenuItem>
                                <MenuItem value="Weekly">Weekly Plan</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            name="date"
                            label="Activation Date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <Box sx={{ p: 2, bgcolor: 'rgba(16, 185, 129, 0.05)', borderRadius: 3, border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        name="paid" 
                                        checked={formData.paid} 
                                        onChange={handleChange}
                                        sx={{ color: '#10b981', '&.Mui-checked': { color: '#10b981' } }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Payment Received</Typography>
                                        <Typography variant="caption" color="text.secondary">Mark this if the user has already paid.</Typography>
                                    </Box>
                                }
                            />
                        </Box>

                        <TextField
                            name="notes"
                            label="Additional Notes"
                            multiline
                            rows={4}
                            value={formData.notes}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Add any specific details about this member..."
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.02)', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
                onClick={() => navigate('/subscriptions')}
                sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                size="large"
                startIcon={<SaveIcon />}
                sx={{ px: 4, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
            >
                {isEdit ? 'Update Subscription' : 'Save Subscription'}
            </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddEditSubscriptionPage;

