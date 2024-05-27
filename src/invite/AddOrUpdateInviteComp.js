import React, {useEffect, useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {generalGetApi, generalPostApi, getCookie} from "../apiFunc";
import EditIcon from "@mui/icons-material/Edit";
import DialogComponent from "../DialogComponent";
import AddType from "../task/AddType";

const generate = (obj) => {
    if (obj !== undefined) {
        return {
            userId: getCookie("userId"),
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            numberOfInvites: obj.numberOfInvites,
            gift: obj.gift,
            typeId: obj.type?.id || null,
            arrived: obj.arrived
        }
    }
    return {
        userId: getCookie("userId"),
        id: null,
        name: '',
        phone: '',
        numberOfInvites: 0,
        gift: 0,
        typeId: null,
        arrived: 4
    }
}

const AddOrUpdateInviteComp = ({navigate, obj, edit}) => {
    const [loading, setLoading] = useState(true);
    const [inviteModel, setInviteModel] = useState(generate(obj));
    const [addType, setAddType] = useState(false);
    const [updateType, setUpdateType] = useState(false);
    const [typeList, setTypeList] = useState([]);
    const setObjByKey = (key, value) => {
        setInviteModel(obj => ({
            ...obj,
            [key]: value,
        }));
    }
    const fetch = async () => {
        setLoading(true)
        const res = await generalGetApi(`http://localhost:8080/api/invited-type/get-user-invited-types?userId=${getCookie("userId")}`, navigate);
        setTypeList(res.data);
        setLoading(false);
    }
    useEffect(() => {
        fetch()
    }, []);
    const backFromAddOrUpdateType = (edit) => {
        fetch()
        edit ? setUpdateType(false) : setAddType(false)
    }
    const sendToSever = async (e) => {
        e.preventDefault();
        let url = edit ? "update-invite" : "add-invite";
        const res = await generalPostApi(`http://localhost:8080/users/invite/${url}`, inviteModel, navigate)
        if (res.data.success) {
            edit ? alert("update") : init();
        } else {
            alert(res.data.errorCode)
        }
    }
    const init = () => {
        const first = {userId: getCookie("userId"), name: '', phone: '', numberOfInvites: 0, gift: 0};
        setInviteModel(first);
    }


    return (
        loading ? "loading...." :
            <Container maxWidth="sm">
                <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <from onSubmit={sendToSever}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Invite Name"
                            type="name"
                            value={inviteModel.name}
                            onChange={(e) => setObjByKey("name", e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Phone"
                            type="tel"
                            value={inviteModel.phone}
                            onChange={(e) => setObjByKey("phone", e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            label="number Of Invites"
                            value={inviteModel.numberOfInvites}
                            onChange={(e) => setObjByKey("numberOfInvites", e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="gift"
                            type="number"
                            value={inviteModel.gift}
                            onChange={(e) => setObjByKey("gift", e.target.value)}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Task Type</InputLabel>
                            <Select
                                sx={{backgroundColor: inviteModel.typeId ? typeList.find(i => i.id === inviteModel.typeId)?.color : "white"}}
                                value={inviteModel.typeId ? inviteModel.typeId : ''}
                                onChange={(e) => setObjByKey("typeId", e.target.value)}
                                label="Type"
                            >{inviteModel.typeId ? typeList.find(i => i.id === inviteModel.typeId)?.name : "Select"}
                                {typeList.map((i => {
                                    return <MenuItem value={i.id}>{i.name}
                                        <EditIcon onClick={() => setUpdateType(true)}/>
                                    </MenuItem>
                                }))}
                                <MenuItem>
                                    <Button onClick={() => setAddType(true)}>Add Invited Type</Button>
                                </MenuItem>
                            </Select>
                            {addType && <DialogComponent handleClose={() => backFromAddOrUpdateType(false)}
                                                         Component={<AddType type={2} obj={null} navigate={navigate}
                                                                             edit={false}/>}/>}
                            {updateType && <DialogComponent handleClose={() => backFromAddOrUpdateType(true)}
                                                            Component={<AddType type={2}
                                                                                obj={typeList.find(i => i.id === inviteModel.typeId)}
                                                                                navigate={navigate} edit={true}/>}/>}
                        </FormControl>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Arrived</InputLabel>
                            <Select value={inviteModel.arrived}
                                    onChange={(e) => setObjByKey("arrived", e.target.value)}
                                    label="Arrived"
                            >
                                <MenuItem value={1}>{"YES"}
                                </MenuItem>
                                <MenuItem value={2}>{"NO"}
                                </MenuItem>
                                <MenuItem value={3}>{"MAYBE"}
                                </MenuItem>
                                <MenuItem value={4}>{"DONE ANSWER"}
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={sendToSever}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Add Invite
                        </Button>
                    </from>
                </Box>

            </Container>
    );
};

export default AddOrUpdateInviteComp;
