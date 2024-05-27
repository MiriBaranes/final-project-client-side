import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import {useEffect, useState} from "react";
import {generalGetApi, generalPostApi, getCookie} from "./apiFunc";
import {useNavigate} from "react-router-dom";



function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function AddIniteCopm1() {
    const navigate = useNavigate();
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        fetchData();
    }, [ loading]);
    const fetchData = async () => {
        const res = await generalGetApi(`http://localhost:8080/users/invite/get-user-invites?userId=${getCookie("userId")}`, navigate);
        setRows(res.data);
        setLoading(false);
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        processRowUpdate()
        setRowModesModel({ ...rowModesModel, [id]: {  mode: GridRowModes.View, ignoreModifications: true} });
    };

    const handleDeleteClick = (id) => () => {
        const res= generalGetApi(`http://localhost:8080/users/invite/remove-invite?userId=${getCookie("userId")}&inviteId=${id}`, navigate);
        console.log(res)
        if (res.data.success) {
            setRows(rows.filter((row) => row.id !== id));
            alert("remove")
        }
        else {
            alert("database error")
        }
    };

    const handleCancelClick = (id) => () => {
        console.log(id)
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        let updatedRow = { ...newRow, isNew: false };
        let send = newRow;
        let  url= "update-invite";
        const type = typeof newRow.id;
        if (type ==='string' ){
            url="add-invite";
            send={...send,
                id: null,
            userId: getCookie("userId")}
        }
        const res=  generalPostApi(`http://localhost:8080/users/invite/${url}`,send, navigate);
        if (res.data.success) {
            updatedRow = {...updatedRow,id: res.data.invite.id};
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        }else {
            alert("database error")
        }
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Invited name',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Invited Phone',
            width: 150,
            editable: true,
        },
        {
            field: 'numberOfInvites',
            headerName: 'Number of Invites',
            type: 'number',
            width: 150,
            editable: true,
        }, {
            field: 'gift',
            headerName: 'Gift',
            type: 'number',
            width: 110,
            editable: true,
        },{field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel }
                }}
            />
        </Box>
    );
}
