import logo from './logo.svg';
import './App.css';
import Nav from "./Nav";
import Map from "./Map";
import GuestMessage from "./Map";
import LocationSelector from "./Map";
import {Container, Typography} from "@mui/material";
import MessageTemplateEditor from "./MessageTemplateEditor";
import InvitePageConfirm from "./InvitePageConfirm";

function App() {
    return (
        <Nav/>

        // <Nav/>
        // <Container>
        //   <Typography variant="h4" gutterBottom>
        //     Location Selector
        //   </Typography>
        //   <LocationSelector />
        // </Container>
    );
}

export default App;
