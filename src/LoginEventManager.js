import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import {setCookie} from "./apiFunc";

const LoginEvenetManager = ({navigate}) => {
    const [name, setName] = useState('');
    const [secret, setSecret] = useState('');
    const [response, setResponse] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
         // Define your user login endpoint if different
        axios.post(`http://localhost:8080/api/event-manager/login`, null, {
            params: {
                name: name,
                code: secret
            }
        })
            .then(response => {
                setResponse(response.data);
                if (response.data.success){
                    setCookie("managerId",response.data.eventManager.id,1);
                    setCookie("userId",response.data.eventManager.user.id,1);
                    navigate("/manager")
                }
            })
            .catch(error => {
                console.error("There was an error logging in!", error);
                setResponse({ success: false, message: "An error occurred" });
            });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Secret Code"
                    type="password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </Box>
            {response && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" color={response.success ? 'green' : 'red'}>
                        {response.message}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default LoginEvenetManager;
