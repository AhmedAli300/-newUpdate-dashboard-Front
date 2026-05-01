import React, { useState } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Stack, Chip, Avatar 
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimePage = () => {
  const [tickets] = useState([
    {
      id: 1,
      name: 'John Doe',
      ticketType: 'Monthly Pass',
      date: '2025-04-24',
      price: 99.99,
      usageStatus: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      ticketType: 'Day Pass',
      date: '2025-04-24',
      price: 15.00,
      usageStatus: 'Used'
    },
  ]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                Ticket Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Track and manage time-based tickets and day passes.
            </Typography>
        </Box>
        <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.5 }} />
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Ticket Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow 
                key={ticket.id}
                sx={{ '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.01)' }, transition: 'background-color 0.2s' }}
              >
                <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontSize: '0.875rem' }}>
                            {ticket.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {ticket.name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>
                    <Chip 
                        label={ticket.ticketType} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 500, borderRadius: 1.5 }}
                    />
                </TableCell>
                <TableCell>{new Date(ticket.date).toLocaleDateString()}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                    ${ticket.price.toFixed(2)}
                </TableCell>
                <TableCell>
                    <Chip 
                        label={ticket.usageStatus} 
                        size="small"
                        color={ticket.usageStatus === 'Active' ? 'success' : 'default'}
                        sx={{ 
                            fontWeight: 700, 
                            borderRadius: 1.5,
                            bgcolor: ticket.usageStatus === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                            color: ticket.usageStatus === 'Active' ? '#10b981' : '#64748b'
                        }}
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimePage;