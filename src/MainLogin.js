import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import LoginEvenetManager from "./LoginEventManager";
import Login from "./Login";

const MainLogin = ({navigate}) => {
    const [loginType, setLoginType] = useState('user');

    const handleLoginTypeChange = (event) => {
        setLoginType(event.target.value);
    };



    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Box sx={{ mb: 2 }}>
                <RadioGroup row value={loginType} onChange={handleLoginTypeChange}>
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                    <FormControlLabel value="eventManager" control={<Radio />} label="Event Manager" />
                </RadioGroup>
                {loginType === 'user' ? <Login navigate={navigate}/> : <LoginEvenetManager navigate={navigate}/> }
            </Box>

        </Paper>
    );
};

export default MainLogin;
