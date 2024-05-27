import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes} from '@mui/x-data-grid';
import {useDemoData} from '@mui/x-data-grid-generator';
import {useEffect, useState} from "react";
import {getCookie} from "./apiFunc";
import DialogComponent from "./DialogComponent";

import TableWithEdit from "./TableWithEdit";
import AddOrUpdateProviderComp from "./AddOrUpdateProviderComp";
import {Button, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AddType from "./task/AddType";

export default function Providers({navigate, eventManager,editObj,addObj}) {
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [obj, setObj] = useState({});
    // const [addType, setAddType] = useState(false);

    const back = (edit) => {
        edit ? setEdit(false) : setVisible(false);
    }
    // const backFromAddType = () => {
    //     setAddType(false);
    // }
    const columns = [
        {
            field: 'providerName',
            headerName: 'Provider name',
            width: 150,
            editable: false,
        },
        {
            field: 'bid',
            headerName: 'Provider Bin',
            width: 150,
            editable: false,
        },
        {
            field: 'advancePayment',
            headerName: 'advance Payment',
            type: 'number',
            width: 150,
            editable: false,
        }, {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            type: 'number',
            width: 110,
            editable: false,
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
            return "http://localhost:8080/users/provider/get-user-provider?userId=" + getCookie("userId");
        } else {
            return `http://localhost:8080/api/event-manager/${getCookie("userId")}/list/2`
        }
    }

    return (
        <>
            {/*{addObj &&*/}
            {/*<Button onClick={() => setAddType(true)}>Add Provider Type</Button>*/}
            {/*}*/}
            {/*{addType && <DialogComponent handleClose={backFromAddType}*/}
            {/*                             Component={<AddType type={3} obj={null} navigate={navigate} edit={false}/>}/>}*/}
            <TableWithEdit
                eventManager={eventManager}
                type={2}
                addObj={addObj} editObj={editObj}
                edit={edit} setEdit={setEdit} setVisible={setVisible} visible={visible}
                navigate={navigate} columns={columns} setObj={setObj}
                ComponentVisible={<DialogComponent handleClose={() => back(false)}
                                                   Component={<AddOrUpdateProviderComp edit={false}
                                                                                       navigate={navigate}/>}
                                                   title={"Add Provider"}/>}
                ComponentEdit={<DialogComponent handleClose={() => back(true)}
                                                Component={<AddOrUpdateProviderComp edit={true} obj={obj}
                                                                                    navigate={navigate}/>}
                                                title={"Update Provider"}/>}
                url={url()}
            />
        </>

    );
}