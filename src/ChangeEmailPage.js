
import React, {useState, useRef, useEffect} from 'react';
import {TextField, Button, MenuItem, List, ListItem, ListItemText, Popper, Paper, Box} from '@mui/material';
import axios from "axios";
import {generalGetApi, generalPostApi, getCookie, setCookie} from "./apiFunc";


const ChangeEmailPage = ({navigate}) => {
    const [currentEmail,setCurrentEmail] = useState(getCookie("email"));
    const [newEmail, setNewEmail] = useState("");
    const textFieldRef = useRef();

    const handleTemplateChange = (e) => {
        const value = e.target.value;
        setNewEmail(value);
    };


    const handleSave = async () => {
        console.log(newEmail)
        try {
            // Save the template to the server
            const response = await generalGetApi(`http://localhost:8080/users/set-email?email=${newEmail}&userId=${getCookie("userId")}`,navigate);
           if (response.data.success) {
               setCurrentEmail(response.data.value);
               setCookie("email", response.data.value);
               setNewEmail("")
               alert("Email saved successfully!");
           }else {
               alert(response.data.errorCode);
           }
        } catch (error) {
            console.error('Error saving template:', error);
        }
    }


    return (
        <Box>
            <TextField
                label="Current Email"
                multiline
                value={currentEmail}
                fullWidth
                inputRef={textFieldRef}
                disabled={true}
            />

            <TextField
                label="New Email"
                multiline
                rows={4}
                value={newEmail}
                onChange={handleTemplateChange}
                fullWidth
                inputRef={textFieldRef}
            />
            <Button onClick={handleSave} variant="contained" color="secondary">
                Save
            </Button>
        </Box>
    );
};


export default ChangeEmailPage;
