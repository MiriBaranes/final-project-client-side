import React, {useState, useRef, useEffect} from 'react';
import {TextField, Button, MenuItem, List, ListItem, ListItemText, Popper, Paper, Box} from '@mui/material';
import axios from "axios";
import {generalGetApi, generalPostApi, getCookie} from "./apiFunc";

const placeholders = [
    {label: "Name", value: "{name}"},
    {label: "Event Name", value: "{event}"},
    {label: "Date", value: "{date}"},

];

const MessageTemplateEditor = ({navigate}) => {
    const [currentMessage,setCurrentMessage] = useState('');
    const [template, setTemplate] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const textFieldRef = useRef();
    useEffect(() => {
        const fetch =async () => {
            const response = await generalGetApi(`http://localhost:8080/users/get-message-formater?userId=${getCookie("userId")}`,navigate);
            setCurrentMessage(response.data);
        }
        fetch();
    }, []);

    const handleTemplateChange = (e) => {
        const value = e.target.value;
        setTemplate(value);

        if (value.endsWith("@")) {
            setAnchorEl(textFieldRef.current);
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handlePlaceholderSelect = (placeholder) => {
        const newValue = template.slice(0, -1) + placeholder.value;
        setTemplate(newValue);
        setOpen(false);
    };


    const handleKeyDown = (event) => {
        if (open) {
            if (event.key === 'ArrowDown') {
                setSelectedIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
                event.preventDefault();
            } else if (event.key === 'ArrowUp') {
                setSelectedIndex((prevIndex) => (prevIndex - 1 + placeholders.length) % placeholders.length);
                event.preventDefault();
            } else if (event.key === 'Enter') {
                handlePlaceholderSelect(placeholders[selectedIndex]);
                event.preventDefault();
            }
        }
    };
    const handleSave = async () => {
        console.log(template)
        try {
            // Save the template to the server
            const response = await generalPostApi('http://localhost:8080/users/set-message', {template:template , userId:getCookie("userId")},navigate);
            console.log('Template saved successfully:', response.data);
            setCurrentMessage(response.data.value);
            setTemplate("")
        } catch (error) {
            console.error('Error saving template:', error);
        }
    }


    return (
        <Box>
            <TextField
                label="Current Message Template"
                multiline
                value={currentMessage}
                fullWidth
                inputRef={textFieldRef}
                disabled={true}
            />

            <TextField
                label="Message Template"
                multiline
                rows={4}
                value={template}
                onChange={handleTemplateChange}
                onKeyDown={handleKeyDown}
                fullWidth
                inputRef={textFieldRef}
            />
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                <Paper>
                    <List>
                        {placeholders.map((placeholder, index) => (
                            <ListItem
                                key={placeholder.value}
                                button
                                selected={index === selectedIndex}
                                onClick={() => handlePlaceholderSelect(placeholder)}
                            >
                                <ListItemText primary={placeholder.label}/>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Popper>
            <Button onClick={handleSave} variant="contained" color="secondary">
                Save
            </Button>
        </Box>
    );
};


export default MessageTemplateEditor;
