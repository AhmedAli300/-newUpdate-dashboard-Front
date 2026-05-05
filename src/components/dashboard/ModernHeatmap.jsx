import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardContent, Divider, Box, useTheme } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';

const ModernHeatmap = ({ title = "Activity Intensity", data = null }) => {
  const theme = useTheme();

  // Generate mock data if none provided (for demonstration)
  const generateData = (count, yrange) => {
    let i = 0;
    let series = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    while (i < days.length) {
      let x = days[i];
      let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
      // Creating data for each hour block (simplified to 12 blocks)
      let dataPoints = [];
      for(let j = 0; j < 12; j++) {
        dataPoints.push({
          x: `${j*2}h`,
          y: Math.floor(Math.random() * 100)
        });
      }

      series.push({
        name: x,
        data: dataPoints
      });
      i++;
    }
    return series;
  };

  const series = data || generateData(7, { min: 0, max: 90 });

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: {
        show: false
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
    colors: ["#38bdf8"], // Primary theme color
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 4,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              name: 'Low',
              color: 'rgba(56, 189, 248, 0.1)'
            },
            {
              from: 21,
              to: 45,
              name: 'Medium',
              color: 'rgba(56, 189, 248, 0.4)'
            },
            {
              from: 46,
              to: 75,
              name: 'High',
              color: 'rgba(56, 189, 248, 0.7)'
            },
            {
              from: 76,
              to: 100,
              name: 'Extreme',
              color: '#38bdf8'
            }
          ]
        }
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: '#94a3b8',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val) => `${val} activities`
      }
    },
    grid: {
      show: false
    }
  };

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2], borderRadius: 4 }}>
      <CardHeader 
        title={title}
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        action={<GridOnIcon color="action" sx={{ opacity: 0.5 }} />}
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 350, width: '100%' }}>
          <Chart options={options} series={series} type="heatmap" height="100%" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModernHeatmap;
