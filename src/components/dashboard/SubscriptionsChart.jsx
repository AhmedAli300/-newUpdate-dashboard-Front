import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, Divider, Box, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SubscriptionsChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Using mock data for a professional look if API is not fully ready
    const mockData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Subscriptions',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#38bdf8',
        }
      ]
    };
    setChartData(mockData);
  }, [filters]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { borderDash: [5, 5], color: '#e2e8f0' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Subscription Growth" 
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        action={<ShowChartIcon color="action" />}
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 300, width: '100%' }}>
          {chartData ? (
            <Line data={chartData} options={options} />
          ) : (
            <Typography color="text.secondary">Loading chart...</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionsChart;
