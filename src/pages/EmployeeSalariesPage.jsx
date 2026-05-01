import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Avatar,
  Chip,
  Tooltip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';

const EmployeeSalariesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [addFormData, setAddFormData] = useState({
    name: '',
    role: '',
    status: 'Active',
    salary: '',
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    status: '',
    salary: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    api.get('/employees')
      .then(response => {
        // Ensure salary is a number for display
        const processedData = response.data.map(emp => ({
          ...emp,
          salary: typeof emp.salary === 'string' ? parseFloat(emp.salary) : emp.salary
        }));
        setEmployees(processedData);
      })
      .catch(error => {
          console.error('Error fetching employees:', error);
          // Mocking data if endpoint fails
          setEmployees([
              { id: 1, name: 'Ahmed Ali', role: 'Coach', status: 'Active', salary: 5000 },
              { id: 2, name: 'Sara Mohamed', role: 'Receptionist', status: 'Active', salary: 3000 },
              { id: 3, name: 'Hassan Mahmoud', role: 'Cleaner', status: 'Inactive', salary: 2000 },
          ]);
      });
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData({
      name: employee.name,
      role: employee.role,
      status: employee.status,
      salary: employee.salary,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      await api.post('/employees', addFormData);
      fetchEmployees();
      setAddDialogOpen(false);
      setAddFormData({ name: '', role: '', status: 'Active', salary: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/employees/${selectedEmployee.id}`, editFormData);
      fetchEmployees();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/employees/${selectedEmployee.id}`);
      fetchEmployees();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                Team & Salaries
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Manage club employees, their roles, and salary information.
            </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<BadgeIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Add New Employee
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Salary</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow 
                key={employee.id}
                sx={{ '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.01)' }, transition: 'background-color 0.2s' }}
              >
                <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
                            {employee.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {employee.name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {employee.role}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip 
                        label={employee.status} 
                        size="small"
                        sx={{ 
                            fontWeight: 700, 
                            borderRadius: 1.5,
                            bgcolor: employee.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                            color: employee.status === 'Active' ? '#10b981' : '#f43f5e'
                        }}
                    />
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                    ${employee.salary.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Edit">
                            <IconButton color="primary" onClick={() => handleEdit(employee)} size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => handleDelete(employee)} size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Employee</DialogTitle>
        <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1, minWidth: 350 }}>
                <TextField
                    name="name"
                    label="Full Name"
                    fullWidth
                    value={addFormData.name}
                    onChange={handleAddFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                    name="role"
                    label="Job Role"
                    fullWidth
                    value={addFormData.role}
                    onChange={handleAddFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={addFormData.status}
                        onChange={handleAddFormChange}
                        label="Status"
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="salary"
                    label="Monthly Salary"
                    fullWidth
                    type="number"
                    value={addFormData.salary}
                    onChange={handleAddFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
            </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Add Employee</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Employee Details</DialogTitle>
        <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1, minWidth: 350 }}>
                <TextField
                    name="name"
                    label="Full Name"
                    fullWidth
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                    name="role"
                    label="Job Role"
                    fullWidth
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditFormChange}
                        label="Status"
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="salary"
                    label="Monthly Salary"
                    fullWidth
                    type="number"
                    value={editFormData.salary}
                    onChange={handleEditFormChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
            </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to remove <strong>{selectedEmployee?.name}</strong> from the system? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ borderRadius: 2 }}>Delete Employee</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeSalariesPage;