import {Route, Routes} from "react-router-dom";
import Invites from "./invite/Invites";
import Providers from "./Providers";
import Tasks from "./task/Tasks";
import UserSettings from "./UserSettings";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeEmailPage from "./ChangeEmailPage";
import Logout from "./Logout";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Notifications from "./Notifications";
import {getCookie} from "./apiFunc";
import TaskManager from "./task/TaskManger";
import ImageUpload from "./ImageUpload";
import MessageTemplateEditor from "./MessageTemplateEditor";
import EventTitle from "./EventTitle";
import PrivacySettings from "./PrivacySettings";
import ManageEventManagers from "./ManageEventManagers";
export const PAGES = ["invites","providers","tasks"];
export const SETTINGS = ['setting-user','set-password','set-email','logout','images','message','event-title','setting-privacy','event-managers'];

export default function Home({navigate}){
    return <div>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ResponsiveAppBar navigate={navigate} pages={PAGES} setting={SETTINGS} />
        <Routes>
            <Route path={"invites"} element={<Invites navigate={navigate} editObj={true} addObj={true} eventManager={false} />}/>
            <Route path={"providers"}
                   element={<Providers navigate={navigate} editObj={true} addObj={true} eventManager={false} />}/>
            <Route path={"tasks"}
                   element={<Tasks navigate={navigate} editObj={true} addObj={true} eventManager={false} />}/>
            <Route path={"setting-user"} element={<UserSettings navigate={navigate}/>}/>
            <Route path={"set-password"} element={<ChangePasswordPage navigate={navigate}/>}/>
            <Route path={"set-email"} element={<ChangeEmailPage navigate={navigate}/>}/>
            <Route path={"logout"} element={<Logout navigate={navigate}/>}/>
            <Route path={"images"} element={<ImageUpload/>}/>
            <Route path={"message"} element={<MessageTemplateEditor navigate={navigate}/>}/>
            <Route path={"event-title"} element={<EventTitle navigate={navigate}/> }/>
            <Route path={"setting-privacy"} element={<PrivacySettings userId={getCookie("userId")}/>}/>
            <Route path={"event-managers"} element={<ManageEventManagers userId={getCookie("userId")}/>}/>
        </Routes>
    </div>
}