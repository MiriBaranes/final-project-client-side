import React, { useState } from 'react';
import {
    Container,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Box
} from '@mui/material';
import {useParams} from "react-router-dom";
import axios from "axios";

const InvitePageConfirm = () => {
    const { id } = useParams();
    const [response, setResponse] = useState('');
    const [numPeople, setNumPeople] = useState(null);
    const [showNumPeopleInput, setShowNumPeopleInput] = useState(false);
    const [message, setMessage] = useState('');

    const handleResponseChange = (event) => {
        const value = event.target.value;
        setResponse(value);
        setShowNumPeopleInput(false);
        setNumPeople('');
        setMessage('');

        if (value === 'yes') {
            setShowNumPeopleInput(true);
        } else if (value === 'no') {
            setMessage('Thank you for your response.');
        } else if (value === 'maybe') {
            setMessage('Please return to this link to set your answer later.');
        }
    };
    const change = ()=>{
        const res= axios.get(`http://localhost:8080/users/invite/update-invite-response?id=${id}&arrivedType=${getTypeIntByString()}&numberOfInvited=${numPeople}`);
        console.log(res.data);
    }
    const getTypeIntByString = ()=>{
        if (response=="yes"){
            return 1;
        }
        if (response=="no"){
            return 2;
        }
        if(response=="maybe"){
            return 3;
        }
    }

    const handleNumPeopleChange = (event) => {
        setNumPeople(event.target.value);
    };

    const handleNumPeopleSubmit = (event) => {
        event.preventDefault();
        const num = parseInt(numPeople, 10);
        if (!isNaN(num) && num > 0) {
            setMessage(`Thank you! We hope to see you and ${num} others at the event!`);
        } else {
            setMessage('Please enter a valid number of people.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Are you coming to the event?
                </Typography>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Your Response</FormLabel>
                    <RadioGroup name="response" value={response} onChange={handleResponseChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        <FormControlLabel value="maybe" control={<Radio />} label="Maybe" />
                    </RadioGroup>
                </FormControl>

                {showNumPeopleInput && (
                    <form onSubmit={handleNumPeopleSubmit}>
                        <TextField
                            label="How many people are coming?"
                            type="number"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                            fullWidth
                            margin="normal"
                            inputProps={{ min: "1" }}
                        />
                    </form>
                )}
                <Button onClick={change} variant="contained" color="primary" type="submit">
                    Submit
                </Button>

                {message && (
                    <Box mt={3}>
                        <Typography variant="h6" color="textPrimary">
                            {message}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default InvitePageConfirm;
