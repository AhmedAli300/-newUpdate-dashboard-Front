import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Box, Typography, Grid, Card, CardContent, Avatar, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarsIcon from '@mui/icons-material/Stars';

const StatsCards = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    api.get('/subscriptions')
      .then(response => {
        setSubscriptions(response.data);
        // Randomly calculating some mock revenue for aesthetic purposes
        setRevenue(response.data.length * 1500);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const stats = [
    { 
        title: 'Total Members', 
        value: subscriptions.length, 
        icon: <PeopleIcon sx={{ color: '#38bdf8' }} />, 
        trend: '+12%', 
        bgColor: 'rgba(56, 189, 248, 0.1)' 
    },
    { 
        title: 'Active Revenue', 
        value: `$${revenue.toLocaleString()}`, 
        icon: <MonetizationOnIcon sx={{ color: '#10b981' }} />, 
        trend: '+8%', 
        bgColor: 'rgba(16, 185, 129, 0.1)' 
    },
    { 
        title: 'New Signups', 
        value: Math.floor(subscriptions.length * 0.15), 
        icon: <TrendingUpIcon sx={{ color: '#8b5cf6' }} />, 
        trend: '+5%', 
        bgColor: 'rgba(139, 92, 246, 0.1)' 
    },
    { 
        title: 'Club Rating', 
        value: '4.9', 
        icon: <StarsIcon sx={{ color: '#f59e0b' }} />, 
        trend: 'Stable', 
        bgColor: 'rgba(245, 158, 11, 0.1)' 
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar 
                    sx={{ 
                        bgcolor: stat.bgColor, 
                        width: 48, 
                        height: 48,
                        borderRadius: 2
                    }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </Stack>
              <Box mt={2} display="flex" alignItems="center" gap={0.5}>
                <Typography 
                    variant="caption" 
                    sx={{ 
                        color: stat.trend.includes('+') ? '#10b981' : 'text.secondary',
                        fontWeight: 700,
                        bgcolor: stat.trend.includes('+') ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                        px: 1,
                        borderRadius: 1
                    }}
                >
                  {stat.trend}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;

