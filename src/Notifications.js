import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Badge, Button, Divider, List, ListItem, ListItemText, MenuItem, Snackbar} from '@mui/material';
import {generalGetApi} from "./apiFunc";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

function NotificationsIcon() {
    return null;
}

const Notifications = ({ userId ,navigate}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await generalGetApi(`http://localhost:8080/api/notifications?userId=${userId}`,navigate);
                setNotifications(response.data);
                if (response.data.length > 0) {
                    const lastMessage= response.data[response.data.length-1];
                    if(!lastMessage.readNotification){
                        setMessage(lastMessage.messageNotification);
                        setOpen(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 6000*60); // Poll every 24 hours
        return () => clearInterval(interval);
    }, [userId]);
    const handleIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseIcon = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const markAsRead = async (id) => {
        try {
            await generalGetApi(`http://localhost:8080/api/notifications/${id}/read`, navigate);
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, readNotification: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };
    const unreadCount = notifications.filter(notification => !notification.readNotification).length;

    return (

        <>
            <IconButton color="inherit" onClick={handleIconClick}>
                <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseIcon}
            >
                {notifications.map(notification => (
                    <div key={notification.id}>
                        <MenuItem onClick={() => markAsRead(notification.id)}
                                  style={{ backgroundColor: notification.readNotification ? 'inherit' : 'lightblue' }}
                        >
                            <ListItemText  primary={notification.messageNotification} />
                        </MenuItem>
                        <Divider />
                    </div>
                ))}
            </Menu>
            {/*<List>*/}
            {/*    {notifications.map(notification => (*/}
            {/*        <ListItem key={notification.id}>*/}
            {/*            <ListItemText primary={notification.messageNotification} />*/}
            {/*            {!notification.readNotification && (*/}
            {/*                <Button onClick={() => markAsRead(notification.id)}>Mark as read</Button>*/}
            {/*            )}*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
            <Snackbar
                open={open}
                onClose={handleClose}
                message={message}
                autoHideDuration={6000}
            />
        </>
    );
};

export default Notifications;
