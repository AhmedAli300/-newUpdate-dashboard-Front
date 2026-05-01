import React, { useState } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Stack, Chip, Avatar 
} from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const InvitationsPage = () => {
  const [invitations] = useState([
    {
      id: 1,
      name: 'John Doe',
      date: '2025-04-24',
      used: 'No',
      source: 'Email Campaign'
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: '2025-04-23',
      used: 'Yes',
      source: 'Website Registration'
    }
  ]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                Free Invitations
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Track guest passes and referral invitations.
            </Typography>
        </Box>
        <CardMembershipIcon sx={{ fontSize: 40, color: 'secondary.main', opacity: 0.5 }} />
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Guest Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitations.map((invitation) => (
              <TableRow 
                key={invitation.id}
                sx={{ '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.01)' }, transition: 'background-color 0.2s' }}
              >
                <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', fontSize: '0.875rem' }}>
                            {invitation.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {invitation.name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{invitation.date}</TableCell>
                <TableCell>
                    <Chip 
                        label={invitation.used === 'Yes' ? 'Used' : 'Available'} 
                        size="small"
                        color={invitation.used === 'Yes' ? 'default' : 'success'}
                        variant={invitation.used === 'Yes' ? 'outlined' : 'filled'}
                        sx={{ fontWeight: 700, borderRadius: 1.5 }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" color="text.secondary">
                        {invitation.source}
                    </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvitationsPage;