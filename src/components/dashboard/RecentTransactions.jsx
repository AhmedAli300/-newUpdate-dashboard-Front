import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Paper, Typography, Card, CardHeader, Divider, Avatar } from "@mui/material";
import api from '../../api/axios';
import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => {
        // Fallback if transactions endpoint doesn't exist
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Recent Activities" 
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        action={<HistoryIcon color="action" />}
        sx={{ pb: 1 }}
      />
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ py: 0 }}>
          {transactions.length > 0 ? (
            transactions.slice(0, 6).map((transaction, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)', mr: 2 }}>
                    <PaymentIcon sx={{ color: '#38bdf8' }} />
                  </Avatar>
                  <ListItemText
                    primary={transaction.name}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                    secondary={`Amount: $${transaction.amount}`}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {transaction.date || 'Today'}
                  </Typography>
                </ListItem>
                {index < 5 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    No recent transactions found.
                </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Card>
  );
};

export default RecentTransactions;
