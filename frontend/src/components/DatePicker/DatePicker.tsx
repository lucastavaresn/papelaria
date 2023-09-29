import { Button, TextField, makeStyles } from "@mui/material";
import { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import './DatePicker.css';

import { format } from 'date-fns'; 
import ptBR from 'date-fns/locale/pt-BR';

import SearchIcon from '@mui/icons-material/Search';

export const DataPickerComp = ()=> {

    return  (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ptBR">
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker 
        defaultValue={dayjs()}/>
        <DatePicker 
        defaultValue={dayjs()}/>
        <Button variant="contained" color="secondary"><SearchIcon sx={{color: "#fff"}}/></Button>
      </DemoContainer>
      
    </LocalizationProvider>
        </>
      )
}