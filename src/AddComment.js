// src/components/AddComment.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import {getCookie} from "./apiFunc";

const AddComment = ({ type, entityId ,eventManager}) => {
    const [comment, setComment] = useState('');
    const performedBy= ()=>{
        let admin = eventManager ? "Event Manager" : "Admin";
      return getCookie("username") + " - "+admin;
    }
    const handleSubmit = () => {
        axios.post('http://localhost:8080/users/add-comment', null, {
            params: {
                type,
                entityId,
                comment,
                performedBy:performedBy(),
            }
        })
            .then(() => {
                setComment('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <TextField
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
            />
            <TextField
                label="Your Name"
                value={performedBy()}
                disabled={true}
                fullWidth
                style={{ marginTop: '10px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '10px' }}
            >
                Add Comment
            </Button>
        </div>
    );
};

export default AddComment;
