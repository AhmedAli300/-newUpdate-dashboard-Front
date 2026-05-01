import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
  Tooltip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      number: 'RCP001',
      name: 'John Doe',
      transactionType: 'Payment',
      amount: 150.00,
      date: '2024-03-20'
    },
    {
      id: 2,
      number: 'RCP002',
      name: 'Jane Smith',
      transactionType: 'Refund',
      amount: 75.50,
      date: '2024-03-21'
    },
  ]);

  const handlePrint = (id) => {
    console.log('Print receipt:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit receipt:', id);
  };

  const handleDelete = (id) => {
    setReceipts(receipts.filter(receipt => receipt.id !== id));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                Receipts Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
                View, print, and manage all transaction receipts.
            </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<ReceiptLongIcon />}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Create New Receipt
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Receipt #</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow 
                key={receipt.id}
                sx={{ '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.01)' }, transition: 'background-color 0.2s' }}
              >
                <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {receipt.number}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {receipt.date}
                    </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{receipt.name}</TableCell>
                <TableCell>
                    <Chip 
                        label={receipt.transactionType} 
                        size="small"
                        color={receipt.transactionType === 'Payment' ? 'success' : 'info'}
                        variant="outlined"
                        sx={{ fontWeight: 600, borderRadius: 1.5 }}
                    />
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                    ${receipt.amount.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Print">
                            <IconButton color="primary" onClick={() => handlePrint(receipt.id)} size="small">
                                <PrintIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => handleDelete(receipt.id)} size="small">
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
    </Box>
  );
};

export default ReceiptsPage;