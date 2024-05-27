import React from 'react';
import {Grid} from '@mui/material';
import ListItem1 from './ListItem1';
import ImageUpload from "./ImageUpload";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeEmailPage from "./ChangeEmailPage";
import MessageTemplateEditor from "./MessageTemplateEditor";
import EventTitle from "./EventTitle";
import Logout from "./Logout";
export const SETTINGS = ['setting-user','set-password','set-email','logout','images','message','event-title'];

const itemList = [
    {title: 'Email', content: 'For show more click', component:<ChangeEmailPage/> , navigateTo:'user/set-email', show: true},
    {title: 'Password', content: 'For show more click', component:<ChangePasswordPage/> , navigateTo:'user/set-password', show: true},
    {title: 'Message', content: 'For show more click', component:<MessageTemplateEditor/> , navigateTo:'user/set-message', show: true},
    {title: 'Event Title', content: 'For show more click', component:<EventTitle/> , navigateTo:'user/event-title', show: true},
    {title: 'Image', content: 'For show more click', component:<ImageUpload/> , navigateTo:'user/image', show: false},
    {title: 'Logout', content: 'For Logout Click', component:<Logout/> , navigateTo:'user/logout', show: false},
];

const UserSettings = ({navigate}) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {itemList.map((item, index) => (
                <Grid item key={index}>
                    <ListItem1 navigate={navigate} navigateTo={item.navigateTo}
                               title={item.title} content={item.content}
                               Component={item.component} show={item.show}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default UserSettings;

