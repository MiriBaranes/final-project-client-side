import * as React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');


export default function TimezonePlayground({value,setValue}) {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                timezone={'UTC'}
                value={value}
                onChange={setValue}
            />
        </LocalizationProvider>
    );
}
