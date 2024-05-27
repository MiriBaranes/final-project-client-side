import React, {useState, useRef, useEffect} from 'react';
import {TextField, Button, MenuItem, List, ListItem, ListItemText, Popper, Paper, Box} from '@mui/material';
import axios from "axios";
import {generalGetApi, generalPostApi, getCookie} from "./apiFunc";

const placeholders = [
    {label: "Name", value: "{name}"},
    {label: "Event Name", value: "{event}"},
    {label: "Date", value: "{date}"},

];

const EventTitle = ({navigate}) => {
    const [currentEventTitle,setCurrentEventTitle] = useState('');
    const [template, setTemplate] = useState("");
    const textFieldRef = useRef();
    useEffect(() => {
        const fetch =async () => {
            const response = await generalGetApi(`http://localhost:8080/users/get-event-title?userId=${getCookie("userId")}`,navigate);
            const temp = response.data.value;
            const myData=temp ==null ? "No Title yet" : temp;
            setCurrentEventTitle(myData);
        }
        fetch();
    }, []);

    const handleTemplateChange = (e) => {
        const value = e.target.value;
        setTemplate(value);
    };


    const handleSave = async () => {
        console.log(template)
        try {
            // Save the template to the server
            const response = await generalGetApi(`http://localhost:8080/users/set-event-title?eventTitle=${template}&userId=${getCookie("userId")}`,navigate);
            console.log('Event Title saved successfully:', response.data);
            setCurrentEventTitle(response.data.value);
            setTemplate("")
        } catch (error) {
            console.error('Error saving template:', error);
        }
    }


    return (
        <Box>
            <TextField
                label="Current Event Title"
                multiline
                value={currentEventTitle}
                fullWidth
                inputRef={textFieldRef}
                disabled={true}
            />

            <TextField
                label="Event title Template"
                multiline
                rows={4}
                value={template}
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


export default EventTitle;
