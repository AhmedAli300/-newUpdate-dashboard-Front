import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReportIcon from '@mui/icons-material/Assessment';
import CountertopsIcon from '@mui/icons-material/Countertops';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Toolbar, Divider } from '@mui/material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <DashboardIcon />, path: '/' },
  { text: 'Subscriptions', icon: <PeopleIcon />, path: '/subscriptions' },
  { text: 'Receipts', icon: <ReceiptIcon />, path: '/receipts' },
  { text: 'Time', icon: <AccessTimeIcon />, path: '/time' },
  { text: 'Check-in', icon: <EventAvailableIcon />, path: '/check-in' },
  { text: 'Check-out', icon: <LogoutIcon />, path: '/check-out' },
  { text: 'Invitations', icon: <GroupAddIcon />, path: '/invitations' },
  { text: 'Leading Clients', icon: <AssignmentIndIcon />, path: '/leading-clients' },
  { text: 'Employee Salaries', icon: <MonetizationOnIcon />, path: '/employee-salaries' },
  { text: 'Shift Schedule', icon: <CalendarTodayIcon />, path: '/shift-schedule' },
  { text: 'Subscription Report', icon: <ReportIcon />, path: '/subscription-report' },
  { text: 'Trade Report', icon: <ReportIcon />, path: '/trade-report' },
  { text: 'Receipts Report', icon: <ReportIcon />, path: '/receipts-report' },
  { text: 'Count', icon: <CountertopsIcon />, path: '/count' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', sm: 'block' },
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0f172a',
          color: '#94a3b8',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Toolbar /> {/* Spacer for fixed Header */}
      <Box sx={{ overflow: 'auto', px: 2, py: 3 }}>
        <Typography 
            variant="overline" 
            sx={{ px: 2, fontWeight: 700, color: 'rgba(255, 255, 255, 0.4)', mb: 1, display: 'block' }}
        >
          Main Navigation
        </Typography>
        <List sx={{ pt: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton 
                  component={Link} 
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    color: isActive ? '#fff' : 'inherit',
                    bgcolor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      '& .MuiListItemIcon-root': {
                        color: '#38bdf8',
                      }
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                        color: isActive ? '#38bdf8' : 'inherit',
                        minWidth: 40,
                        transition: 'color 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                        fontSize: '0.875rem', 
                        fontWeight: isActive ? 600 : 500 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.05)' }} />
        
        <Typography 
            variant="overline" 
            sx={{ px: 2, fontWeight: 700, color: 'rgba(255, 255, 255, 0.4)', mb: 1, display: 'block' }}
        >
          System
        </Typography>
        <List>
            <ListItem disablePadding>
                <ListItemButton 
                    sx={{ 
                        borderRadius: 2, 
                        color: 'inherit',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#fff' }
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

