import React, {useState} from 'react';
import {TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Box} from '@mui/material';
import TimezonePlayground from "./TimezonePlayground";
import {
    isDateAfterCurrentTime,
    isValidEventType,
    isValidPassword,
    isValidPhoneNumber,
    isValidUsername,
    validEmail
} from "./public";
import {generalGetApi, setCookie} from "./apiFunc";


const Login = ({navigate}) => {
    const[login,setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [eventDate, setEventDate] = React.useState('');
    const [password, setPassword] = useState('');
    const [eventType, setEventType] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `http://localhost:8080/users/add-user?password=${password}&email=${email}&phone=${phone}&username=${username}&eventDate=${eventDate}&eventType=${eventType}`;
        if (login) {
            url = "http://localhost:8080/users/login?username=" + username + "&password=" + password;
        }
        if (checkValidation()) {
            let res = await generalGetApi(url, navigate);
            if (res.data.success) {
                setCookie("userId", res.data.user.id, 1);
                setCookie("token", res.data.user.token, 1);
                setCookie("email",res.data.user.email,1);
                setCookie("username",res.data.user.username,1);
                navigate('/user')
            } else {
                alert("database error")
            }
        } else {
            alert("some data not valid");
        }
    };
    const checkValidation = () => {
        let valid = false;
        if (isValidUsername(username)) {
            if (isValidPassword(password)) {
                if (login) {
                    valid = true;
                } else {
                    if (validEmail(email)) {
                        if (isValidPhoneNumber(phone)) {
                            if (isDateAfterCurrentTime(eventDate)) {
                                if (isValidEventType(eventType)) {
                                    valid = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return valid;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    {login ? "Login" : "Sign In"}
                </Typography>
                <Button onClick={()=>setLogin(!login)}>{login? "To Sing-In Page Click here ":"To Login Page Click here"}</Button>
                <from onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!login &&
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="date"
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            >
                                <TimezonePlayground value={eventDate} setValue={setEventDate}/>
                            </TextField>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Event Type</InputLabel>
                                <Select
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                    label="Event Type"
                                >
                                    <MenuItem value='1'>Wedding</MenuItem>
                                    <MenuItem value='2'>Bar</MenuItem>
                                    <MenuItem value='3'>General</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    }
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        {login ? "login" : "sign-in"}
                    </Button>
                </from>
            </Box>
        </Container>
    );
};

export default Login;
