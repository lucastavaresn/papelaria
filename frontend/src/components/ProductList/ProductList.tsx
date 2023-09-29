import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Props } from "../../utils/ChildProps"
import { useState } from "react";


export const ProductList = ({sale, setSale,removeItem, ...props}: Props)  =>{

    let products = sale.listProducts

    const [currentProuct, setProduct] = useState<string[]>([]);

    const handleSelect = (event: any, value: string | null) => {
        if (value) {
            console.log("Aeeeeeeeee==========: ", value)
            setProduct([...currentProuct, value]);
        }
      };
    
    const remove = (item:any) => {
        console.log("Removendo==============: ", item)
        removeItem(item)
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
                {products.map((product: any) => (
                    <TableRow
                    key={(product.label + Math.random())}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    >
                    <TableCell component="th" scope="row">{product.label}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">R$ {product.price}</TableCell>
                    <TableCell align="center">R$ {(product.quantity * product.price)}</TableCell>
                    <TableCell align="center"><IconButton onClick={()=> remove(product)}><DeleteIcon sx={{color: "#BE0000"}}/></IconButton> </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
    )
}