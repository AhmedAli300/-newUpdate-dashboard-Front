import React from "react";
import { Grid, Button, Paper } from "@mui/material";
import { AddCircle, EventNote, AssignmentTurnedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "New Subscription", icon: <AddCircle />, path: "/subscriptions/add", color: '#38bdf8' },
    { label: "Check Attendance", icon: <EventNote />, path: "/check-in", color: '#10b981' },
    { label: "Subscription Report", icon: <AssignmentTurnedIn />, path: "/subscription-report", color: '#8b5cf6' },
  ];

  return (
    <Grid container spacing={2}>
      {actions.map((action, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: action.color,
                boxShadow: `0 0 0 4px ${action.color}15`,
              }
            }}
          >
            <Button
              fullWidth
              size="large"
              startIcon={action.icon}
              onClick={() => navigate(action.path)}
              sx={{
                justifyContent: 'flex-start',
                py: 2,
                px: 3,
                color: 'text.primary',
                fontWeight: 600,
                '& .MuiButton-startIcon': { color: action.color, mr: 1.5 }
              }}
            >
              {action.label}
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickActions;
