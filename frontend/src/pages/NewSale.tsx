import {Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductList } from "../components/ProductList/ProductList";


export default function SaleCreate(){

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    const formattedDateTime = () => {
        const options: object = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
        return currentDateTime.toLocaleDateString('pt-BR', options);
      };

    return (
        <>
            <Grid container spacing={2} height={"80vh"}>
                <Grid item xs={8}>
                    <Grid container direction={"column"} justifyContent="space-around" spacing={3}>
                        <Grid item xs={12} paddingX={4}>
                            <Typography variant="h6" component="div" sx={{marginBottom: "20px"}}>
                                Produtos
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} justifyContent="space-around" spacing={3}>
                        <Grid item xs={8}>
                        <>Buscar pelo código de barras ou descrição</>
                        <Autocomplete
                                disablePortal
                                id="products"
                                options={products}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} placeholder="Digite o código ou nome do produto"/>}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        <>Quantidade</>
                        <TextField id="quantity" type="number" placeholder="0" />
                        </Grid>
                        <Grid item xs={2}>
                        <Button variant="contained" color="secondary" sx={{marginTop: "22px", height: "54px"}}>Adicionar</Button>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <ProductList products={selectedProducts}/>
                        </Grid>
                    </Grid>
                </Grid>



                <Grid item xs={4} sx={{borderLeft: "1px #C4C4C4 solid"}}>
                    <Grid container direction={"column"} justifyContent="space-between" spacing={3}>
                        <Grid item xs={12} paddingX={4}>
                        <Typography variant="h6" component="div">
                            Dados da venda
                        </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{paddingX: 4}}>
                            <>Data e Hora da Venda</>
                            <TextField id="sale-date" variant="outlined" value={formattedDateTime()} disabled sx={{width: "90%"}} />
                        </Grid>
                        <Grid item xs={12} sx={{paddingX: 4}}>
                            <>Escolha o vendedor</>
                            <Autocomplete
                                disablePortal
                                id="seller"
                                options={customers}
                                sx={{ width: "90%" }}
                                renderInput={(params) => <TextField {...params} placeholder="Selecione o nome"/>}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{paddingX: 4}}>
                            <>Escolha um cliente</>
                            <Autocomplete
                                disablePortal
                                id="customer"
                                options={sellers}
                                sx={{ width: "90%" }}
                                renderInput={(params) => <TextField {...params} placeholder="Selecione o nome"/>}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row", marginTop: "70px", fontWeight: "bold"}}>
                            <Grid container justifyContent={"space-between"} direction={"row"} paddingRight={"10%"}>
                                <Grid item justifyContent={"left"}>Valor total da venda:</Grid>
                                <Grid item>R$ 2.567,30</Grid>
                            </Grid>
                        </Grid> 
                        <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row"}}>
                            <Grid container justifyContent={"space-between"} direction={"row"}  paddingRight={"10%"}>
                                <Grid item><Button variant="contained" color="secondary">Cancelar</Button></Grid>
                                <Grid item><Button variant="contained" color="secondary">Finalizar</Button></Grid>
                            </Grid>
                        </Grid> 
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    );
}


const customers = [
    { label: '001 - Regina Souza', year: 1994 },
    { label: '002 - Matheus Oliveira', year: 1972 },
]

const sellers = [
    { label: '001 - Caio Dantas', year: 1994 },
    { label: '002 - Henrique Pirez', year: 1972 },
]

const products = [ 
    { label: '001 - Mouse Logitech', price: 230.56 },
    { label: '002 - Iphone 14 pro 128gb', price: 6560.76 },
    { label: '003 - Ipad pro 256gb', price: 8453.32 },
]

const selectedProducts = [ 
    { label: '001 - Mouse Logitech', price: 230.56, quantity: 2 },
    { label: '002 - Iphone 14 pro 128gb', price: 6560.76, quantity: 6 },
    { label: '003 - Ipad pro 256gb', price: 8453.32, quantity: 1 },
]