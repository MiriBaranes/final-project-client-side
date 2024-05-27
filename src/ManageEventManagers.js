import React, {useState, useEffect} from 'react';
import {Typography, Box, Paper, List, ListItem, ListItemText, TextField, Button, Container} from '@mui/material';
import axios from 'axios';

const ManageEventManagers = ({userId}) => {
    const [eventManagers, setEventManagers] = useState([]);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/users/add-event-manager', null, {
            params: {
                userId: userId,
                phone: phone,
                name: name
            }
        })
            .then(response => {
                setResponse(response.data);
                fetch();
                setPhone("");
                setName("")
            })
            .catch(error => {
                console.error("There was an error adding the event manager!", error);
                setResponse({success: false, message: "An error occurred"});
            });
    };
    const fetch=()=>{
        axios.get(`http://localhost:8080/users/get-event-managers`, {
            params: {userId: userId}
        })
            .then(response => {
                setEventManagers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the event managers!", error);
            });
    }
    useEffect(() => {
      fetch();
    }, [userId]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Manage Event Managers
            </Typography>
            <Paper elevation={3} sx={{p: 3, mt: 3}}>
                <Typography variant="h5" gutterBottom>
                    Add Event Manager
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        required
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        sx={{mb: 2}}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Event Manager
                    </Button>
                </Box>
                {response && (
                    <Box sx={{mt: 3}}>
                        <Typography variant="body1" color={response.success ? 'green' : 'red'}>
                            {response.message}
                        </Typography>
                    </Box>
                )}
            </Paper>
            <Paper elevation={3} sx={{p: 3, mt: 3}}>
                <Typography variant="h5" gutterBottom>
                    Event Managers
                </Typography>
                <List>
                    {eventManagers.map((manager) => (
                        <ListItem key={manager.id}>
                            <ListItemText primary={manager.name} secondary={manager.phone}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ManageEventManagers;
