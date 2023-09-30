import { Button, Grid } from "@mui/material";
import ListBlock from "../components/ListBlock/ListBlock";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchSale } from "../store/features/saleSlice";



export default function SaleList(){
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchSale());
    }, [])
    return (
        <>
            <Grid container spacing={2} padding={4} alignContent={'flex-end'} direction={"row"}>
                <Grid item xs={10}>
                    <Typography variant="h4" color="secondary" sx={{fontWeight: "bolder"}}>
                        Lista de vendas
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Link to={"/sale"}>
                        <Button variant="contained" color="secondary" sx={{float: "right"}}> Inserir nova Venda</Button>
                    </Link>
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
