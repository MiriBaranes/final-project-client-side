import {useEffect, useRef, useState} from "react";
import {generalGetApi, getCookie, setCookie} from "./apiFunc";
import {Box, Button, TextField} from "@mui/material";


const ChangePasswordPage = ({navigate}) => {
    const [newPassword,setNewPassword] = useState('');
    const [confirm, setConfirm] = useState("");
    const textFieldRef = useRef();

    const handleTemplateChange = (e) => {
        const value = e.target.value;
        setConfirm(value);
    };
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
    };


    const handleSave = async () => {
        console.log(confirm)
        try {
            // Save the template to the server
            const response = await generalGetApi(`http://localhost:8080/users/set-password?username=${getCookie("username")}&password=${newPassword}&userId=${getCookie("userId")}`,navigate);
            if (response.data.success){
                setCookie("token",response.data.value,1);
                alert("password changed successfully!");
                setConfirm("")
                setNewPassword("");
            }else {
                alert(response.data.errorCode);
            }
        } catch (error) {
            console.error('Error saving template:', error);
        }
    }


    return (
        <Box>
            <TextField
                label="New Password"
                multiline
                type='password'
                value={newPassword}
                onChange={handlePasswordChange}
                fullWidth
                inputRef={textFieldRef}
            />

            <TextField
                label="Confirm Password"
                type={'password'}
                multiline
                rows={4}
                value={confirm}
                onChange={handleTemplateChange}
                fullWidth
                inputRef={textFieldRef}
            />
            <Button onClick={handleSave} variant="contained" color="secondary">
                Save
            </Button>
        </Box>
    );
};


export default ChangePasswordPage;
