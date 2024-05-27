import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Fab,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import {getCookie} from "../apiFunc";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openTypeDialog, setOpenTypeDialog] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: null, name: '', description: '', typeId: '', until: '',userId:getCookie("userId") });
    const [currentType, setCurrentType] = useState({ id: null, name: '', color: '' ,userId:getCookie("userId")});
    const [isEditing, setIsEditing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchTasks();
        fetchTaskTypes();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tasks/get-user-tasks?userId=${getCookie("userId")}`); // Update with actual userId and endpoint
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const fetchTaskTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/task-type/get-user-tasks-type?userId=${getCookie("userId")}`); // Update with actual userId and endpoint
            setTaskTypes(response.data);
        } catch (error) {
            console.error('Error fetching task types', error);
        }
    };

    const handleAddOrUpdateTask = async () => {
        try {
            if (isEditing) {
                await axios.post('http://localhost:8080/api/tasks/update-task', currentTask);
                setSnackbarMessage('Task updated successfully!');
            } else {
                await axios.post('http://localhost:8080/api/tasks/add-task', currentTask);
                setSnackbarMessage('Task added successfully!');
            }
            setOpenDialog(false);
            fetchTasks();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    const handleAddOrUpdateType = async () => {
        try {
            if (currentType.id) {
                await axios.post('http://localhost:8080/api/task-type/update-task-type', currentType);
                setSnackbarMessage('Task type updated successfully!');
            } else {
                await axios.post('http://localhost:8080/api/task-type/add-task-type', currentType);
                setSnackbarMessage('Task type added successfully!');
            }
            setOpenTypeDialog(false);
            fetchTaskTypes();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving task type', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/delete-task/${taskId}`); // Implement delete functionality on the backend and adjust the endpoint
            setSnackbarMessage('Task deleted successfully!');
            fetchTasks();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const openTaskDialog = (task = { id: null, name: '', description: '', typeId: '', until: '' ,userId:getCookie("userId")}) => {
        setCurrentTask(task);
        setIsEditing(!!task.id);
        setOpenDialog(true);
    };

    const openTypeDialog1 = (type = { id: null, name: '', color: '' ,userId:getCookie("userId")}) => {
        setCurrentType(type);
        setOpenTypeDialog(true);
    };

    const closeTaskDialog = () => {
        setOpenDialog(false);
        setCurrentTask({ id: null, name: '', description: '', typeId: '', until: '' ,userId:getCookie("userId")});
    };

    const closeTypeDialog = () => {
        setOpenTypeDialog(false);
        setCurrentType({ id: null, name: '', color: '',userId:getCookie("userId") });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleColorChange = (color) => {
        setCurrentType({ ...currentType, color: color.hex });
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Task Manager
            </Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.id}>
                            <ListItemText
                                primary={task.description}
                                secondary={`Due: ${new Date(task.until).toLocaleString()} - Type: ${task.type?.name}`}
                                style={{ backgroundColor: task.type?.color }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => openTaskDialog(task)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Fab
                    color="primary"
                    aria-label="add"
                    style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                    onClick={() => openTaskDialog()}
                >
                    <Add />
                </Fab>
                <Button
                    variant="outlined"
                    style={{ marginTop: '20px' }}
                    onClick={() => openTypeDialog1()}
                >
                    Add Task Type
                </Button>
            </Paper>
            <Dialog open={openDialog} onClose={closeTaskDialog}>
                <DialogTitle>{isEditing ? 'Edit Task' : 'Add Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Description"
                        type="text"
                        fullWidth
                        value={currentTask.description}
                        onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    />
                    <FormControl fullWidth style={{ marginTop: '20px' }}>
                        <InputLabel>Task Type</InputLabel>
                        <Select
                            value={currentTask.typeId}
                            onChange={(e) => setCurrentTask({ ...currentTask, typeId: e.target.value })}
                        >
                            {taskTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={currentTask.until}
                        onChange={(e) => setCurrentTask({ ...currentTask, until: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeTaskDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdateTask} color="primary">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openTypeDialog} onClose={closeTypeDialog}>
                <DialogTitle>Add Task Type</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Type Name"
                        type="text"
                        fullWidth
                        value={currentType.name}
                        onChange={(e) => setCurrentType({ ...currentType, name: e.target.value })}
                    />
                    <SketchPicker
                        color={currentType.color}
                        onChangeComplete={handleColorChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeTypeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdateType} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TaskManager;
