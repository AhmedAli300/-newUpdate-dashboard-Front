import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, CardHeader, Divider, Box, Typography, useTheme } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const SubscriptionsChart = ({ filters }) => {
  const theme = useTheme();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Using mock data for a professional look if API is not fully ready
    const mockSeries = [
      {
        name: 'Subscriptions',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ];
    setSeries(mockSeries);
  }, [filters]);

  const options = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#38bdf8']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      }
    },
    colors: ['#38bdf8']
  };

  return (
    <Card sx={{ height: '100%', borderRadius: 4 }}>
      <CardHeader 
        title="Subscription Growth" 
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        action={<ShowChartIcon color="action" sx={{ opacity: 0.5 }} />}
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 300, width: '100%' }}>
          {series.length > 0 ? (
            <Chart options={options} series={series} type="area" height="100%" />
          ) : (
            <Typography color="text.secondary">Loading chart...</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionsChart;

