import React, { useState } from "react";
import { Box, Grid, Typography, Stack, Breadcrumbs, Link } from "@mui/material";
import StatsCards from "../components/dashboard/StatsCards";
import SubscriptionsChart from "../components/dashboard/SubscriptionsChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import QuickActions from "../components/dashboard/QuickActions";
import FilterOptions from "../components/dashboard/FilterOptions";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const DashboardPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 1 }}
          >
            <Link underline="hover" color="inherit" href="/" sx={{ fontSize: '0.875rem' }}>
              Dashboard
            </Link>
            <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>Overview</Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
            Welcome back, Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here's what's happening with your club today.
          </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <FilterOptions onFilterChange={handleFilterChange} />
        </Box>
      </Stack>

      {/* Stats Cards */}
      <Box mb={4}>
        <StatsCards />
      </Box>

      <Grid container spacing={3} mb={4}>
        {/* Chart */}
        <Grid item xs={12} lg={8}>
          <SubscriptionsChart filters={filters} />
        </Grid>
        
        {/* Recent Transactions */}
        <Grid item xs={12} lg={4}>
          <RecentTransactions filters={filters} />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box mb={2}>
        <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
          Quick Management
        </Typography>
        <QuickActions />
      </Box>
    </Box>
  );
};

export default DashboardPage;
