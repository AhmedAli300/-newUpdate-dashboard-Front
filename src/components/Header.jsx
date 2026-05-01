import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { InputBase, alpha, styled } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
    const { user, logout } = useAuth();
    
    // Menu state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    
    // Dialog state
    const [openDialog, setOpenDialog] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogout = () => {
        logout();
    };

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setAnchorEl(null);
        setOpenDialog(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
        setError('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdatePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await api.post('/auth/update-password', { oldPassword, newPassword });
            setMessage(response.data.message || 'Password updated successfully!');
            setTimeout(() => {
                handleCloseDialog();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                color: 'text.primary',
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    fontWeight: 800, 
                    color: 'primary.main',
                    letterSpacing: '-0.5px'
                }}
              >
                ADMIN<span style={{ color: '#38bdf8' }}>DASH</span>
              </Typography>
              
              <Search>
                <SearchIconWrapper>
                  <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton size="large" color="inherit">
                <NotificationsIcon color="action" />
              </IconButton>
              
              <Box 
                  onClick={handleClickMenu}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, cursor: 'pointer', p: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
              >
                <Avatar 
                    alt={user?.name || "User"} 
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{ width: 35, height: 35, border: '2px solid #38bdf8' }}
                />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: 600 }}>
                        {user?.name || 'Admin User'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                        {user?.role || 'Admin'}
                    </Typography>
                </Box>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 3,
                    sx: { mt: 1, minWidth: 150, borderRadius: 2 }
                }}
              >
                <MenuItem onClick={handleOpenDialog} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Update Password
                </MenuItem>
              </Menu>

              <Button
                color="primary"
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ ml: 2, borderRadius: 2 }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>

          {/* Update Password Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { borderRadius: 3, p: 1, minWidth: 350 } }}>
            <DialogTitle sx={{ fontWeight: 700 }}>Update Password</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2, mt: 1 }}>{error}</Alert>}
                {message && <Alert severity="success" sx={{ mb: 2, mt: 1 }}>{message}</Alert>}
                
                <TextField
                    fullWidth
                    margin="dense"
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={loading || !!message}
                    sx={{ mb: 2, mt: 1 }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading || !!message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading || !!message}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleCloseDialog} color="inherit" disabled={loading}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleUpdatePassword} 
                    variant="contained" 
                    color="primary"
                    disabled={loading || !!message}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
                </Button>
            </DialogActions>
          </Dialog>
        </AppBar>
    );
}

export default Header;