import {useState} from "react";
import {getCookie} from "../apiFunc";
import TableWithEdit from "../TableWithEdit";
import DialogComponent from "../DialogComponent";
import * as React from "react";
import AddTask from "./AddTask";
import AddType from "./AddType";
import {Button, Typography} from "@mui/material";
import {formatDate} from "../public";
import CircleIcon from '@mui/icons-material/Circle';

export default function Tasks({navigate, eventManager,addObj,editObj}) {
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [obj, setObj] = useState({});
    const back = (edit) => {
        setObj({})
        edit ? setEdit(false) : setVisible(false);
    }
    const columns = [
        {
            field: 'description',
            headerName: 'description',
            width: 150,
            editable: false,
        },
        {
            field: 'created',
            headerName: 'created at',
            width: 150,
            editable: false,
            renderCell: (params) => formatDate(params.row.created)
        },
        {
            field: 'until',
            headerName: 'Until',
            width: 150,
            editable: false,
            renderCell: (params) => formatDate(params.row.until)

        }, {
            field: 'done',
            headerName: 'Done',
            type: 'boolean',
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

        }
    ];
    const url = () => {
        if (!eventManager) {
            return "http://localhost:8080/api/tasks/get-user-tasks?userId=" + getCookie("userId");
        } else {
            return `http://localhost:8080/api/event-manager/${getCookie("userId")}/list/3`
        }
    }

    return (
        <>

            <TableWithEdit addObj={addObj} editObj={editObj} type={3}
                           eventManager={eventManager}
                edit={edit} setEdit={setEdit} setVisible={setVisible} visible={visible}
                navigate={navigate} columns={columns} setObj={setObj}
                ComponentVisible={<DialogComponent handleClose={() => back(false)}
                                                   Component={<AddTask edit={false} navigate={navigate} obj={obj}/>}
                                                   title={"Add Task"}/>}
                ComponentEdit={<DialogComponent handleClose={() => back(true)}
                                                Component={<AddTask edit={true} obj={obj} navigate={navigate}/>}
                                                title={"Update Task"}/>}
                url={url()}
            />
        </>

    );
}