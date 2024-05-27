import React, {useEffect, useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {generalGetApi, generalPostApi, getCookie} from "./apiFunc";
import EditIcon from "@mui/icons-material/Edit";
import DialogComponent from "./DialogComponent";
import AddType from "./task/AddType";

const generate = (obj) => {
    if (obj !== undefined) {
        return {
            userId: getCookie("userId"), providerName: obj.providerName,
            bid: obj.bid,
            advancePayment: obj.advancePayment,
            phoneNumber: obj.phoneNumber
            , done: obj.done
            , id: obj.id,
            typeId: obj.type?.id || null
        }
    }
    return {
        userId: getCookie("userId"),
        providerName: '',
        bid: 0,
        advancePayment: 0,
        phoneNumber: '',
        done: false,
        id: null, typeId: null
    }
}

const AddOrUpdateProviderComp = ({navigate, obj, edit}) => {
    const [providerModel, setProviderModel] = useState(generate(obj));
    const [loading, setLoading] = useState(true);
    const [addType, setAddType] = useState(false);
    const [updateType, setUpdateType] = useState(false);
    const [typeList, setTypeList] = useState([]);
    const setObjByKey = (key, value) => {
        setProviderModel(obj => ({
            ...obj,
            [key]: value,
        }));
    }
    const sendToSever = async (e) => {
        e.preventDefault();
        let url = edit ? "update-provider" : "add-provider";
        const res = await generalPostApi(`http://localhost:8080/users/provider/${url}`, providerModel, navigate)
        if (res.data.success) {
            edit ? alert("update") : init();
        } else {
            alert(res.data.errorCode)
        }
    }
    const init = () => {
        const first = {
            userId: getCookie("userId"),
            providerName: '',
            bid: 0,
            advancePayment: 0,
            phoneNumber: '',
            done: false,
            id: null
        }
        setProviderModel(first);
    }
    const fetch = async () => {
        setLoading(true)
        const res = await generalGetApi(`http://localhost:8080/api/provider-type/get-user-provider-type?userId=${getCookie("userId")}`, navigate);
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

    return (
        loading ? "loading....":
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
                        label="Provider Name"
                        type="name"
                        value={providerModel.providerName}
                        onChange={(e) => setObjByKey("providerName", e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Phone"
                        type="tel"
                        value={providerModel.phoneNumber}
                        onChange={(e) => setObjByKey("phoneNumber", e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        label="bid"
                        value={providerModel.bid}
                        onChange={(e) => setObjByKey("bid", e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="advancePayment"
                        type="number"
                        value={providerModel.advancePayment}
                        onChange={(e) => setObjByKey("advancePayment", e.target.value)}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Done</InputLabel>
                        <Select
                            value={providerModel.done}
                            onChange={(e) => setObjByKey("done", e.target.value)}
                            label="Done"
                        >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Task Type</InputLabel>
                            <Select sx={{backgroundColor: providerModel.typeId ? typeList.find(i=>i.id===providerModel.typeId)?.color : "white"}} value={providerModel.typeId ? providerModel.typeId : ''}
                                    onChange={(e) => setObjByKey("typeId", e.target.value)}
                                    label="Type"
                            >{providerModel.typeId ? typeList.find(i=>i.id===providerModel.typeId)?.name : "Select"}
                                {typeList.map((i => {
                                    return <MenuItem value={i.id} >{i.name}
                                        <EditIcon onClick={() => setUpdateType(true)}/>
                                    </MenuItem>
                                }))}
                                <MenuItem>
                                    <Button onClick={() => setAddType(true)}>Add Provider Type</Button>
                                </MenuItem>
                            </Select>
                            {addType && <DialogComponent handleClose={()=>backFromAddOrUpdateType(false)}
                                                         Component={ <AddType type={3} obj={null} navigate={navigate} edit={false}/>}/>}
                            {updateType && <DialogComponent handleClose={()=>backFromAddOrUpdateType(true)}
                                                            Component={ <AddType type={3}
                                                                                 obj={typeList.find(i=>i.id===providerModel.typeId)}
                                                                                 navigate={navigate} edit={true}/>}/>}
                        </FormControl>
                    </FormControl>
                    <Button
                        onClick={sendToSever}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Add Provider
                    </Button>
                </from>
            </Box>

        </Container>
    );
};

export default AddOrUpdateProviderComp;
