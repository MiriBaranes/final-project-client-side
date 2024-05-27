import React, {useEffect, useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {generalGetApi, generalPostApi, getCookie} from "../apiFunc";
import TimezonePlayground from "../TimezonePlayground";
import {formatDate} from "../public";
import DialogComponent from "../DialogComponent";
import AddType from "./AddType";
import EditIcon from "@mui/icons-material/Edit";

const generate = (obj) => {
    if (obj !== {}) {
        return {
            userId: getCookie("userId"),
            description: obj.description
            , done: obj.done
            , created: obj.created
            , until: obj.until
            , id: obj.id,
            typeId: obj.type?.id || null
        };
    }
    return {
        userId: getCookie("userId"),
        description: ''
        , done: ''
        , until: ''
        , id: null,
        typeId: ''
    };
}

const AddTask = ({navigate, obj, edit}) => {
    const [loading, setLoading] = useState(true);
    const [addTaskType, setAddTaskType] = useState(false);
    const [updateTaskType, setUpdateTaskType] = useState(false);
    const [taskModel, setTaskModel] = useState(generate(obj));
    const [typeList, setTypeList] = useState([]);
    const setObjByKey = (key, value) => {
        setTaskModel(obj => ({
            ...obj,
            [key]: value,
        }));
    }
    const fetch = async () => {
        const res = await generalGetApi(`http://localhost:8080/api/task-type/get-user-tasks-type?userId=${getCookie("userId")}`, navigate);
        setTypeList(res.data);
        setLoading(false);
    }
    useEffect(() => {
        fetch()
    },[] );
    const sendToSever = async (e) => {
        e.preventDefault();
        if (valid() || !edit) {
            let url = edit ? "update-task" : "add-task";
            const res = await generalPostApi(`http://localhost:8080/api/tasks/${url}`, taskModel, navigate)
            if (res.data.success) {
                edit ? alert("update") : init();
            } else {
                alert(res.data.errorCode)
            }
        } else {
            alert("The created date is after until date");
        }
    }
    const valid = () => {
        const givenDate = new Date(taskModel.until);
        const createdDate = new Date(taskModel.created);
        return givenDate > createdDate;
    }
    const init = () => {
        const first = {
            userId: getCookie("userId"),
            description: ''
            , done: ''
            , until: ''
            , id: null
        };
        setTaskModel(first);
    }
    const setDoneDate = (value) => {
        setTaskModel(obj => ({
            ...obj,
            "done": value,
        }));
    }
    const backFromAddOrUpdateType = (edit)=>{
        fetch()
        edit ? setUpdateTaskType(false) : setAddTaskType(false)
    }

    return (
        loading ? "loading" :
            <Container maxWidth="sm">
                <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Task
                    </Typography>
                    <from onSubmit={sendToSever}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Descreption"
                            type="name"
                            value={taskModel.description}
                            onChange={(e) => setObjByKey("description", e.target.value)}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Task Done?</InputLabel>
                            <Select
                                defaultValue={false}
                                value={taskModel.done || false}
                                onChange={(e) => setObjByKey("done", e.target.value)}
                                label="Done"
                            >
                                <MenuItem value={"true"}>YES</MenuItem>
                                <MenuItem value={"false"}>NO</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Task Type</InputLabel>
                            <Select sx={{backgroundColor: taskModel.typeId ? typeList.find(i=>i.id===taskModel.typeId)?.color : "white"}} value={taskModel.typeId ? taskModel.typeId : ''}
                                onChange={(e) => setObjByKey("typeId", e.target.value)}
                                label="Type"
                            >{taskModel.typeId ? typeList.find(i=>i.id===taskModel.typeId)?.name : "Select"}
                                {typeList.map((i => {
                                    return <MenuItem value={i.id} >{i.name}
                                        <EditIcon onClick={() => setUpdateTaskType(true)}/>
                                    </MenuItem>
                                }))}
                                <MenuItem>
                                    <Button onClick={() => setAddTaskType(true)}>Add Task Type</Button>
                                </MenuItem>
                            </Select>
                            {addTaskType && <DialogComponent handleClose={()=>backFromAddOrUpdateType(false)}
                                                             Component={ <AddType type={1} obj={null} navigate={navigate} edit={false}/>}/>}
                            {updateTaskType && <DialogComponent handleClose={()=>backFromAddOrUpdateType(true)}
                                                                Component={ <AddType type={1}
                                                                    obj={typeList.find(i=>i.id===taskModel.typeId)}
                                                                    navigate={navigate} edit={true}/>}/>}
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="date"
                            type="datetime-local"
                            value={formatDate(taskModel.until)}
                            onChange={(e) => setObjByKey("until", e.target.value)}
                        >
                            <TimezonePlayground value={formatDate(taskModel.until)} setValue={setDoneDate}/>
                        </TextField>
                        {edit &&
                            <TextField
                                disabled={true}
                                margin="normal"
                                required
                                fullWidth
                                label="created"
                                type="datetime-local"
                                value={formatDate(taskModel.created)}
                                onChange={(e) => setObjByKey("created", e.target.value)}
                            >
                                <TimezonePlayground value={formatDate(taskModel.created)}/>
                            </TextField>
                        }
                        <Button
                            onClick={sendToSever}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            {edit ? "Update" : "Add"}
                        </Button>
                    </from>
                </Box>

            </Container>
    );
};

export default AddTask;
