// src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const CommentList = ({ type, entityId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/get-comment/${entityId}/${type}`)
            .then(response => setComments(response.data))
            .catch(error => console.error(error));
    }, [type, entityId]);

    return (
        <List>
            {comments?.map((comment) => (
                <ListItem key={comment.id}>
                    <ListItemText
                        primary={comment.comment}
                        secondary={<>
                            <Typography component="span" variant="body2" color="textPrimary">
                                {comment.creatorName}
                            </Typography>
                            {" — "}{new Date(comment.createAt).toLocaleString()}
                        </>}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default CommentList;
