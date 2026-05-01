import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Stack } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterOptions = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateRange: "",
    subscriptionType: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select
          name="subscriptionType"
          value={filters.subscriptionType}
          onChange={handleFilterChange}
          label="Type"
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="annual">Annual</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="From Date"
        type="date"
        name="dateRange"
        size="small"
        value={filters.dateRange}
        onChange={handleFilterChange}
        InputLabelProps={{ shrink: true }}
        sx={{ 
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
            width: 150
        }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<FilterListIcon />}
        onClick={() => onFilterChange(filters)}
        sx={{ borderRadius: 2, px: 3, textTransform: 'none' }}
      >
        Filter
      </Button>
    </Stack>
  );
};

export default FilterOptions;
