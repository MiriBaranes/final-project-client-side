import React, {useEffect, useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import { generalPostApi, getCookie} from "../apiFunc";
import {SketchPicker} from "react-color";

const generate = (obj) => {
    if (obj !== undefined && obj!==null) {
        return {name: obj.name, color: obj.color, userId: getCookie("userId"), id: obj.id};
    }
    return {name: "", color: "", userId: getCookie("userId"), id: null};
}

const AddType = ({navigate, obj, edit,type}) => {
    const [typeModel, setTypeModel] = useState(generate(obj));
    const setObjByKey = (key, value) => {
        setTypeModel(obj => ({
            ...obj,
            [key]: value,
        }));
    }
    const sendToSever = async (e) => {
        e.preventDefault();
        console.log(type)
        let urlByType =getUrlByType();
        let url = edit ? `update-${urlByType}-type` : `add-${urlByType}-type`;
        const res = await generalPostApi(`http://localhost:8080/api/${urlByType}-type/${url}`, typeModel, navigate)
        if (res.data.success) {
            edit ? alert("update") : init();
        } else {
            alert(res.data.errorCode)
        }
    }
    const getUrlByType = ()=>{
        let ans;
        switch(type){
            case 1:
                ans= "invited"
                break
            case 2:
                ans= "provider"
                break
            case 3:
                ans= "task"
                break
            default : return null;
        }
        return ans;
    }
    const init = () => {
        const first = {name: "", color: "", userId: getCookie("userId"), id: null};
        setTypeModel(first);
    }
    const setColor = (color)=>{
        setTypeModel(obj => ({
            ...obj,
            color : color.hex
        }));
    }


    return (
            <Container maxWidth="sm">
                <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        TYPE
                    </Typography>
                    <from onSubmit={sendToSever}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Type Name"
                            type="name"
                            value={typeModel.name}
                            onChange={(e) => setObjByKey("name", e.target.value)}
                        />
                        <SketchPicker
                            color={typeModel.color}
                            onChangeComplete={setColor}
                        />
                        {/*<ColorSelector selectedColor={typeModel.color} setSelectedColor={setColor} />*/}
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

export default AddType;
