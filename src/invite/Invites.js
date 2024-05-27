import React, {useState} from 'react';
import {Box, Button, Container, Input, Typography} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import TableWithEdit from "../TableWithEdit";
import DialogComponent from "../DialogComponent";
import AddOrUpdateInviteComp from "./AddOrUpdateInviteComp";
import AddType from "../task/AddType";
import {getCookie} from "../apiFunc";
import {Label} from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Invites({navigate, eventManager, addObj, editObj}) {
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [obj, setObj] = useState({});
    // const [addType, setAddType] = useState(false);
    // const [file, setFile] = useState(null);

    const back = (edit) => {
        edit ? setEdit(false) : setVisible(false);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Invited name',
            width: 150,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Invited Phone',
            width: 150,
            editable: false,
        },
        {
            field: 'numberOfInvites',
            headerName: 'Number of Invites',
            type: 'number',
            width: 150,
            editable: false,
        }, {
            field: 'gift',
            headerName: 'Gift',
            type: 'number',
            width: 110,
            editable: false,
        },
        {
            field: "type",
            headerName: 'Type',
            width: 110,
            editable: false,
            valueGetter: (params) => params.row?.type?.name,
            renderCell: (params) => (
                <Typography>
                    <CircleIcon style={{color: params.row.type.color}}/> {params.row.type.name}
                </Typography>
            ),
        },
        {
            field: "arrived",
            headerName: 'Arrived',
            width: 110,
            editable: false,
            valueGetter: (params) => params.row?.arrived,
            renderCell: (params) => (
                <Typography>
                    <CircleIcon style={{color: getColorArrivedByInt(params.row.arrived)}}/> {getStringArrivedByInt(params.row.arrived)}
                </Typography>
            ),
        }
    ];
    const getStringArrivedByInt = (arrived)=>{
        if (arrived==1){
            return "Yes"
        }
        if (arrived ==2){
            return  "No"
        }
        if (arrived==3){
            return "Maybe"
        }
        else {
            return "NOT ANSWER"
        }
    }
    const getColorArrivedByInt = (arrived)=>{
        if (arrived==1){
            return "green"
        }
        if (arrived ==2){
            return  "red"
        }
        if (arrived==3){
            return "orange"
        }
        else {
            return "gray"
        }
    }

    const url = () => {
        if (!eventManager) {
            return "http://localhost:8080/users/invite/get-user-invites?userId=" + getCookie("userId");
        } else {
            return `http://localhost:8080/api/event-manager/${getCookie("userId")}/list/1`;
        }
    };

    // const backFromAddType = () => {
    //     setAddType(false);
    // };

    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // const handleFileUpload = async () => {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         try {
    //             const response = await fetch(`http://localhost:8080/users/invite/upload-invite-data/${getCookie("userId")}`, {
    //                 method: 'POST',
    //                 body: formData,
    //             });
    //             const data = await response.json();
    //             setFile(null);
    //
    //             console.log(data);
    //         } catch (error) {
    //             console.error("Error uploading file:", error);
    //         }
    //     }
    // };

    return (
        <>
            {/*{addType && <DialogComponent handleClose={backFromAddType}*/}
            {/*                             Component={<AddType type={1} obj={null} navigate={navigate} edit={false}/>}/>}*/}
            {/*{addObj &&*/}
            {/*    <Toolbar>*/}
            {/*        <Box>*/}
            {/*        <Button onClick={() => setAddType(true)}>*/}
            {/*            <AddBoxIcon/>Add Type</Button>*/}
            {/*        </Box>*/}
            {/*        <input*/}
            {/*            accept=".xlsx,.xls,.ods"*/}
            {/*            type="file"*/}
            {/*            onChange={handleFileChange}*/}
            {/*            style={{display: 'none'}}*/}
            {/*            id="file-input"*/}
            {/*        />*/}
            {/*        <label htmlFor="file-input">*/}
            {/*            <Button  component="span" >*/}
            {/*                <FileUploadIcon></FileUploadIcon>*/}
            {/*                Upload Excel File*/}
            {/*            </Button>*/}
            {/*        </label>*/}
            {/*        <Button variant="contained" onClick={handleFileUpload} disabled={file==null}>*/}
            {/*            Submit File*/}
            {/*        </Button>*/}
            {/*    </Toolbar>}*/}

            <TableWithEdit
                type={1}
                addObj={addObj}
                editObj={editObj}
                edit={edit}
                setEdit={setEdit}
                setVisible={setVisible}
                visible={visible}
                navigate={navigate}
                columns={columns}
                setObj={setObj}
                eventManager={eventManager}
                ComponentVisible={<DialogComponent handleClose={() => back(false)}
                                                   Component={<AddOrUpdateInviteComp edit={false} navigate={navigate}/>}
                                                   title={"Add Invite"}/>}
                ComponentEdit={<DialogComponent handleClose={() => back(true)}
                                                Component={<AddOrUpdateInviteComp edit={true} obj={obj}
                                                                                  navigate={navigate}/>}
                                                title={"Add Invite"}/>}
                url={url()}
            />
        </>
    );
}
