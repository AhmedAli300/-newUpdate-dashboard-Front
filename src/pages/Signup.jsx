import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from '../api/axios';
import { 
    Container, 
    Box, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Alert, 
    Avatar, 
    InputAdornment,
    IconButton,
    Fade,
    MenuItem
} from "@mui/material";
import { 
    PersonAddOutlined as PersonAddIcon, 
    Person as PersonIcon,
    Email as EmailIcon,
    LockOutlined as LockOutlinedIcon,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }
        
        try {
            const response = await api.post('/auth/signup', { name, email, password, role });
            setError('');
            const userData = {
                id: response.data._id,
                username: response.data.name,
                role: response.data.role,
                isAuthenticated: true,
                loginTime: new Date().toISOString()
            };
            login(userData, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 2
            }}
        >
            <Fade in={true} timeout={1000}>
                <Container maxWidth="xs">
                    <Paper
                        elevation={10}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                            <PersonAddIcon fontSize="large" />
                        </Avatar>
                        
                        <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                            Create Account
                        </Typography>
                        
                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSignup} noValidate sx={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />

                            <TextField
                                select
                                margin="normal"
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="employee">Employee</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ 
                                    mt: 3, 
                                    mb: 2, 
                                    py: 1.5, 
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    bgcolor: 'secondary.main',
                                    '&:hover': { bgcolor: 'secondary.dark' }
                                }}
                            >
                                {loading ? 'Creating...' : 'Sign Up'}
                            </Button>
                            
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Already have an account? <Link to="/login" style={{ color: '#38bdf8', textDecoration: 'none' }}>Sign in here</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Fade>
        </Box>
    );
}

export default Signup;
