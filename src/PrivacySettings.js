import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel, Button, Box, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';

const PrivacySettings = ({ userId }) => {
    const [settings, setSettings] = useState({
        allowShowInvite: false,
        allowAddInvite: false,
        allowEditInvite: false,
        allowShowProvider: false,
        allowAddProvider: false,
        allowEditProvider: false,
        allowShowTask: false,
        allowAddTask: false,
        allowEditTask: false
    });

    useEffect(() => {
        // Fetch the privacy settings
        axios.get(`http://localhost:8080/users/${userId}/get-privacy`)
            .then(response => setSettings(response.data))
            .catch(error => console.error("There was an error fetching the privacy settings!", error));
    }, [userId]);

    const handleChange = (event) => {
        const { name, checked } = event.target;
        let updatedSettings = { ...settings, [name]: checked };

        if (name === 'allowShowInvite' && !checked) {
            updatedSettings = {
                ...updatedSettings,
                allowAddInvite: false,
                allowEditInvite: false
            };
        } else if (name === 'allowShowProvider' && !checked) {
            updatedSettings = {
                ...updatedSettings,
                allowAddProvider: false,
                allowEditProvider: false
            };
        } else if (name === 'allowShowTask' && !checked) {
            updatedSettings = {
                ...updatedSettings,
                allowAddTask: false,
                allowEditTask: false
            };
        }

        setSettings(updatedSettings);
    };

    const handleSave = () => {
        axios.put(`http://localhost:8080/users/${userId}/privacy`, settings)
            .then(response => console.log("Privacy settings updated!", response))
            .catch(error => console.error("There was an error updating the privacy settings!", error));
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Privacy Settings
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Invite Settings
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowShowInvite}
                                onChange={handleChange}
                                name="allowShowInvite"
                            />
                        }
                        label="Allow Show Invite"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowAddInvite}
                                onChange={handleChange}
                                name="allowAddInvite"
                                disabled={!settings.allowShowInvite}
                            />
                        }
                        label="Allow Add Invite"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowEditInvite}
                                onChange={handleChange}
                                name="allowEditInvite"
                                disabled={!settings.allowShowInvite}
                            />
                        }
                        label="Allow Edit Invite"
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Provider Settings
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowShowProvider}
                                onChange={handleChange}
                                name="allowShowProvider"
                            />
                        }
                        label="Allow Show Provider"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowAddProvider}
                                onChange={handleChange}
                                name="allowAddProvider"
                                disabled={!settings.allowShowProvider}
                            />
                        }
                        label="Allow Add Provider"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowEditProvider}
                                onChange={handleChange}
                                name="allowEditProvider"
                                disabled={!settings.allowShowProvider}
                            />
                        }
                        label="Allow Edit Provider"
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Task Settings
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowShowTask}
                                onChange={handleChange}
                                name="allowShowTask"
                            />
                        }
                        label="Allow Show Task"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowAddTask}
                                onChange={handleChange}
                                name="allowAddTask"
                                disabled={!settings.allowShowTask}
                            />
                        }
                        label="Allow Add Task"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.allowEditTask}
                                onChange={handleChange}
                                name="allowEditTask"
                                disabled={!settings.allowShowTask}
                            />
                        }
                        label="Allow Edit Task"
                    />
                </Grid>
            </Grid>
            <Box mt={3}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Paper>
    );
};

export default PrivacySettings;
