import ResponsiveAppBar from "./ResponsiveAppBar";
import {Route, Routes} from "react-router-dom";
import Invites from "./invite/Invites";
import Providers from "./Providers";
import Tasks from "./task/Tasks";
import UserSettings from "./UserSettings";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeEmailPage from "./ChangeEmailPage";
import Logout from "./Logout";
import ImageUpload from "./ImageUpload";
import MessageTemplateEditor from "./MessageTemplateEditor";
import EventTitle from "./EventTitle";
import PrivacySettings from "./PrivacySettings";
import {getCookie} from "./apiFunc";
import ManageEventManagers from "./ManageEventManagers";
import {useEffect, useState} from "react";
import axios from "axios";


export default function ManagerMain({navigate}) {
    const [pages,setPages] = useState([]);
    const[privacy,setPrivacy] = useState({});
    useEffect(() => {
        // Fetch the privacy settings
        axios.get(`http://localhost:8080/users/${getCookie("userId")}/get-privacy`)
            .then(response =>{
                setPrivacy(response.data);
                let tempPages= [];
                if (response.data.allowShowInvite){
                    tempPages.push("invites")
                }
                if (response.data.allowShowProvider){
                    tempPages.push("providers")
                }
                if (response.data.allowShowTask){
                    tempPages.push("tasks")
                }
                setPages(tempPages);
            })
            .catch(error => console.error("There was an error fetching the privacy settings!", error));
    }, []);
    return <div>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ResponsiveAppBar navigate={navigate} pages={pages} setting={['logout']} />
        <Routes>
            <Route path={"invites"} element={<Invites navigate={navigate} eventManager={true} editObj={privacy.allowEditInvite} addObj={privacy.allowAddInvite}/>}/>
            <Route path={"providers"}
                   element={<Providers navigate={navigate} eventManager={true} editObj={privacy.allowEditProvider} addObj={privacy.allowAddProvider}/>}/>
            <Route path={"tasks"}
                   element={<Tasks navigate={navigate} eventManager={true} editObj={privacy.allowEditTask} addObj={privacy.allowAddTask}/>}/>
            <Route path={"logout"} element={<Logout navigate={navigate}/>}/>
        </Routes>
    </div>
}