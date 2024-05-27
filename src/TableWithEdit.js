import * as React from 'react';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {generalGetApi, getCookie} from "./apiFunc";
import CustomToolbar from "./CustomToolbar";
import {formatDate, isDate} from "./public";
import AddIcon from '@mui/icons-material/Add';
import Toolbar from "@mui/material/Toolbar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DialogComponent from "./DialogComponent";
import AddType from "./task/AddType";
import DoneIcon from '@mui/icons-material/Done';
import ExcelTemplateDownloader from "./ExcelTemplateDownloader";
import AddComment from "./AddComment";
import IconButton from "@mui/material/IconButton";
import CommentList from "./CommentList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TableWithEdit({type,
                                          url,
                                          navigate,
                                          columns,
                                          ComponentEdit,
                                          setObj,
                                          setVisible,
                                          visible,
                                          ComponentVisible,
                                          edit,
                                          setEdit,eventManager
    ,addObj,editObj
                                      }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addType, setAddType] = useState(false);
    const [file, setFile] = useState(null);
    const [addComment,setAddComment]= useState(false);
    const [showComment,setShowComment]= useState(false);
    const [idClicked, setIdClicked] = useState(null);
    useEffect(() => {
        if (visible === false && edit === false && !loading) {
            fetchData();
        }
    }, [visible, edit]);
    useEffect(() => {
        if (data.length === 0) {
            fetchData();
        }
    }, []);
    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                let url;
                switch(type){
                    case 1:
                        url= `users/invite/upload-invite-data/${getCookie("userId")}`;
                        break
                    case 2:
                        url= `users/provider/upload-provider-data/${getCookie("userId")}`;
                        break
                    case 3:
                        url= "task"
                        break
                    default : return null;
                }
                const response = await fetch(`http://localhost:8080/${url}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setFile(null);
                fetchData();
                console.log(data);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };


    const handleEditClick = (id) => {
        let myObj = data.filter(i => i.id === id);
        if (myObj.length === 1) {
            setObj(myObj[0]);
            setEdit(true);
        }
    }
    const handleAddCommentClick = (id)=>{
        setIdClicked(id);
        setAddComment(true);
    }
    const handleShowCommentClick = (id)=>{
        setIdClicked(id);
        setShowComment(true);
    }
    const backFromShowCommentClick = ()=>{
        setIdClicked(null);
        setShowComment(false);
    }
    const backFromAddCommentClick = ()=>{
        setIdClicked(null);
        setAddComment(false);
    }

    const fetchData = async () => {
        setLoading(true);
        const res = await generalGetApi(url, navigate);
        if(res.data.success){
            const formattedData = res.data.list.map(item => {
                const formattedItem = {...item};
                for (const key in formattedItem) {
                    if (isDate(formattedItem[key])) {
                        formattedItem[key] = formatDate(formattedItem[key]);
                    }
                }
                return formattedItem;
            });
            console.log(formattedData)
            setData(formattedData);
            setLoading(false);
        }
        else {
            alert("user not exist")
        }
    }
    const myColumns = [...columns, editObj &&
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditClick(id)}
                        color="inherit"
                    />
                    ,addObj &&<GridActionsCellItem
                        icon={<AddIcon/>}
                        label="Add Comment"
                        className="textPrimary"
                        onClick={() => handleAddCommentClick(id)}
                        color="inherit"/>,
                    addObj &&<GridActionsCellItem
                        icon={<ExpandMoreIcon/>}
                        label="show Comment"
                        className="textPrimary"
                        onClick={() => handleShowCommentClick(id)}
                        color="inherit"/>
                ]
            }
        }
    ];
    const backFromAddType = () => {
        setAddType(false);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const getEntityByType = ()=>{
        switch(type){
            case 1:
                return "Invite"
            case 2:
                return "Provider"
            case 3:
                return "Task"
            default : return null;
        }
    }


    return (
        loading ? "loading..." :
            <Box sx={{height: 400, width: '100%'}}>
                {addType && <DialogComponent handleClose={backFromAddType}
                                             Component={<AddType type={type} obj={null} navigate={navigate} edit={false}/>}/>}
                {addObj &&
                    <>
                    <Toolbar>
                        <Button onClick={() => setVisible(true)}>
                            <AddIcon>
                            </AddIcon>
                            Add {getEntityByType()}
                        </Button>
                        <Box>
                            <Button onClick={() => setAddType(true)}>
                                <AddBoxIcon/>Add Type</Button>
                        </Box>
                    </Toolbar>
                    <Toolbar>
                        <input
                            accept=".xlsx,.xls,.ods"
                            type="file"
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Button component="span">
                                <FileUploadIcon></FileUploadIcon>
                                Upload Excel File
                            </Button>
                        </label>
                        <Button onClick={handleFileUpload} disabled={file == null}>
                            <DoneIcon/>
                            Upload Excel File
                        </Button>
                        <ExcelTemplateDownloader type={type} navigate={navigate} fileName={getEntityByType()}/>
                    </Toolbar>
                    </>}
                {edit && ComponentEdit}
                {visible && ComponentVisible}
                {addComment && <DialogComponent handleClose={backFromAddCommentClick}
                                                Component={<AddComment type={type} entityId={idClicked}
                                                                       eventManager={eventManager}/>}
                                                title={"Add Comment"}/>}
                {showComment && <DialogComponent handleClose={backFromShowCommentClick}
                                                 Component={<CommentList type={type} entityId={idClicked}/>}
                                                 title={"Comment Time Line"}/>}
                <DataGrid
                    rows={data}
                    columns={myColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
    );
}