import { Button, Grid, TextField } from "@mui/material";
import ListBlock from "../components/ListBlock/ListBlock";
import Typography from '@mui/material/Typography';


import SearchIcon from '@mui/icons-material/Search';
import { DataPickerComp } from "../components/DatePicker/DatePicker";
import DialogAlert from "../components/DialogAlert/DialogAlert";

export default function SellerCommssion(){
    return (
        <>
            <Grid container spacing={2} padding={4} alignContent={'flex-end'} direction={"row"}>
                <Grid item xs={8}>
                    <Typography variant="h4" color="secondary" sx={{fontWeight: "bolder"}}>
                        Relatório de Comissões 
                    </Typography>
                </Grid>
                <Grid item xs={4} >
                        <DataPickerComp/>
                        <DialogAlert/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ListBlock/>
                </Grid>
            </Grid>
            
        </>
    );
}
