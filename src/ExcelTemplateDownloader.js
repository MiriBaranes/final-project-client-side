import React, {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {generalGetApi} from "./apiFunc";
import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
const ExcelTemplateDownloader = ({type,navigate,fileName}) => {
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = generalGetApi(`http://localhost:8080/users/get-excel-headers?type=${type}`,navigate);
            setHeaders((await res).data);
        }
        fetchData();
    }, []);


    const handleDownload = () => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Create a new worksheet with the headers
        const ws = XLSX.utils.aoa_to_sheet([headers]);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Template");

        // Generate a binary string representation of the workbook
        const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});

        // Save the Blob as an Excel file
        saveAs(blob, `${fileName}Template.xlsx`);
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    };

    return (

        <Button onClick={handleDownload} >
            <DownloadIcon/>
            Download Excel Template
        </Button>
    );
};

export default ExcelTemplateDownloader;
