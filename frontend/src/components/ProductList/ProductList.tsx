import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from "../../store/store";
import { moneyFormat } from "../../utils/formatter";
import {  removeProduct } from "../../store/features/productSaleSlice";
import { addCurrentSale } from "../../store/features/currentSaleSlice";


export const ProductList = ()  =>{

    const dispatch = useAppDispatch();
    const productsList = useAppSelector((state)=> state.productSale.productsSale);
    const total = useAppSelector((state)=> state.currentSale.currentSale);

    const remove = (product:any) => {
        const newProcuts = productsList
        let indexToUpdate = newProcuts.find((item) => item.id === product.id);
        const totalItem = ((indexToUpdate?.quantity ?? 1) * (indexToUpdate?.unit_value ?? 1))
        const newTotal = total - totalItem
        dispatch(removeProduct(product.id))
        dispatch(addCurrentSale(newTotal))
    }
    
    
    return(
        <TableContainer component={Paper} sx={{marginTop: "40px", maxHeight: "60vh"}}>
            <Table sx={{ overflowY: "hidden" }} size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize: "14pt"}}>Produtos/Serviços</TableCell>
                    <TableCell align="center" sx={{fontSize: "14pt"}}>Quantidade</TableCell>
                    <TableCell align="center" sx={{fontSize: "14pt"}}>Preço unitário</TableCell>
                    <TableCell align="center" sx={{fontSize: "14pt"}}>Total</TableCell>
                    <TableCell sx={{fontSize: "14pt"}}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {productsList.map((product: any) => (
                    <TableRow
                    key={(product.id + Math.random())}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    >
                    <TableCell component="th" scope="row">{product.description}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">{moneyFormat(product.unit_value)}</TableCell>
                    <TableCell align="center">{moneyFormat(product.quantity * product.unit_value)}</TableCell>
                    <TableCell align="center"><IconButton onClick={()=>remove(product)}><DeleteIcon sx={{color: "#BE0000"}}/></IconButton> </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
    )
}