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
import { useAppDispatch } from "../../store/store";
import { dateFormat } from "../../utils/formatter";
import { fetchCommission } from "../../store/features/commissionSlice";

export const DataPickerComp = ()=> {

  const [currentStartDate, setCurrentStartDate] = useState();
    const [currentEndDate, setCurrentEndDate] = useState();
    const dispatch = useAppDispatch();

    const updateTable = () => {
      const start = dayjs(currentStartDate).toDate()
      const end = dayjs(currentEndDate).toDate()
      
      const dates = {
        start: dateFormat(start),
        end: dateFormat(end)
      }
      console.log("Enviando data ==============: ", dates)
      dispatch(fetchCommission(dates))
      
    }

    const setStart = (data:any) => {
      setCurrentStartDate(data)
  }
    const setEnd = (data:any) => {
      setCurrentEndDate(data)
  }

    return  (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker defaultValue={dayjs()}  onChange={(newValue:any) => setStart(newValue)}/>
        <DatePicker defaultValue={dayjs()} onChange={(newValue:any) => setEnd(newValue)}/>
        <Button variant="contained" onClick={()=> updateTable()} color="secondary"><SearchIcon sx={{color: "#fff"}}/></Button>
      </DemoContainer>
      
    </LocalizationProvider>
        </>
      )
}