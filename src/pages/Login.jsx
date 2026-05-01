import { useEffect, useState } from "react";
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
    Fade
} from "@mui/material";
import { 
    LockOutlined as LockOutlinedIcon, 
    Person as PersonIcon,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        // Subtle hint for the user
        console.log('Login Hint: admin / 1234');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !password) {
            setError('Both fields are required!');
            setLoading(false);
            return;
        }
        
        try {
            const response = await api.post('/auth/login', { email: username, password });
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
            setError(err.response?.data?.message || 'Invalid credentials');
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
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        
                        <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                            Welcome Back
                        </Typography>
                        
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Please enter your details to sign in
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 } 
                                }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
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
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 } 
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 1, width: '100%' }}>
                                <Link to="/forgot-password" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ 
                                    mt: 4, 
                                    mb: 2, 
                                    py: 1.5, 
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 14px 0 rgba(118, 75, 162, 0.39)',
                                    '&:hover': {
                                        boxShadow: '0 6px 20px 0 rgba(118, 75, 162, 0.45)',
                                    }
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                            
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Don't have an account? <Link to="/signup" style={{ color: '#38bdf8', textDecoration: 'none' }}>Sign up</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Fade>
        </Box>
    );
}

export default Login;