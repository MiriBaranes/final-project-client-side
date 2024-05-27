import React from 'react';
import {Box, Button, Typography} from '@mui/material';

const ListItem1 = ({ title, content, Component, show, navigate, navigateTo }) => {
    return (
        <Box
            sx={{
                width: 350,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: 2,
                margin: 1,
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.05)',
                    borderColor: '#ccc'
                },
                '&:active': {
                    backgroundColor: '#e0e0e0',
                    transform: 'scale(1.02)'
                }
            }}
        >
            <Box sx={{ width: '100%', mb: 2, textAlign: 'center' }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white', // Text color
                        backgroundColor: 'primary.main', // Background color using theme
                        fontFamily: 'Verdana, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'primary.dark', // Darker shade on hover
                        },
                    }}
                    onClick={() => navigate(navigateTo)}
                >
                    {content}
                </Button>
            </Box>
            {show && <Box sx={{ mt: 'auto' }}>{Component}</Box>}
        </Box>
    );
};

export default ListItem1;
