import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, Button, DialogActions
} from '@mui/material';


const DialogComponent = ({title ,handleClose,Component }) => {
    const [openDialog, setOpenDialog] = useState(true);

    const handleCloseDialog = () => {
        handleClose();
        setOpenDialog(false);
    };

    return (
        <div >
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {Component}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComponent;