import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Stack,
  TableContainer,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/subscriptions")
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error("Error fetching subscriptions:", err));

    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser("");
  };

  const handleConvertToSubscriber = async () => {
    if (!selectedUser) return;

    const user = users.find((u) => u.id === selectedUser);
    const newSubscription = {
      id: Math.random().toString(36).substr(2, 4),
      name: user.name,
      type: "Monthly",
      date: new Date().toISOString().split("T")[0],
      paid: false,
      notes: "Converted from user"
    };

    try {
      const response = await api.post('/subscriptions', newSubscription);
      setSubscriptions([...subscriptions, response.data]);
      handleCloseDialog();
    } catch (err) {
      console.error("Error creating subscription:", err);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                Subscriptions
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Manage and track all club memberships and payments.
            </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<SwapHorizIcon />}
              onClick={handleOpenDialog}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Convert User
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/subscriptions/add")}
              sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            >
              Add New
            </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Plan Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Notes</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow 
                key={sub.id}
                sx={{ '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.01)' }, transition: 'background-color 0.2s' }}
              >
                <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'primary.light' }}>
                            {sub.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {sub.name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>
                    <Chip 
                        label={sub.type} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 500, borderRadius: 1.5 }}
                    />
                </TableCell>
                <TableCell>{sub.date}</TableCell>
                <TableCell>
                    <Chip 
                        label={sub.paid ? "Paid" : "Pending"} 
                        size="small"
                        color={sub.paid ? "success" : "warning"}
                        sx={{ 
                            fontWeight: 600, 
                            borderRadius: 1.5,
                            bgcolor: sub.paid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: sub.paid ? '#10b981' : '#f59e0b',
                            border: 'none'
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
                        {sub.notes || '-'}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Edit Subscription">
                        <IconButton
                            size="small"
                            onClick={() => navigate(`/subscriptions/edit/${sub.id}`)}
                            sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.05)' } }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Convert User to Subscriber</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Select an existing user from the list below to create a new subscription for them.
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="Select User"
              sx={{ borderRadius: 2 }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button 
            onClick={handleConvertToSubscriber} 
            variant="contained"
            disabled={!selectedUser}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Convert Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscriptions;

