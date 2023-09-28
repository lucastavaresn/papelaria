import {Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { ProductList } from "../components/ProductList/ProductList";


export default function SaleCreate(){

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [currentPrice, setPrice] = useState(0.00);
    const [currentSelectedProducts,setSelectedProducts] = useState<{label: string, quantity: number, price: number}[]>([])
    const [currentSale, setSale] = useState({
        listProducts: currentSelectedProducts,
        customer: "",
        seller: "",
        totalPrice: 0
    });

    const [currentProduct, setCurrentProduct] = useState({
        label: "" ,
        quantity: 0,
        price: 0.00
    });

    const handleSelect = (event: SyntheticEvent<Element, Event>, value: any) => {
        if (value) {
            const newProduct = {...currentProduct}
            newProduct.label = value.label
            newProduct.price = value.price
           setCurrentProduct(newProduct);
           console.log("Produto=====: ", currentProduct)
        }
      };
    
    const handleSelectQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (newValue) {
        const newProduct = {...currentProduct}
        newProduct.quantity = newValue
        setCurrentProduct(newProduct);
        console.log("Produto=====: ", currentProduct)
    }
    };
    
    const add_item = () => {
        if (currentProduct.quantity != 0 && currentProduct.label != null){

            const prod = {...currentProduct}
            const newSelectedProd = [...currentSelectedProducts]
            newSelectedProd.push(prod)
            const newSale = {...currentSale}
            newSale.listProducts = newSelectedProd
            
            let total = 0;

            for (const item of newSelectedProd) {
                total += (item.price * item.quantity);
            }
            
            newSale.totalPrice = total

           setSale(newSale);
            setSelectedProducts(newSelectedProd)
           console.log("Atual======: ", currentSale)
           console.log("total======: ", currentSelectedProducts)
           
            
        }
    }

    const remove_item = (remove_item:any)=>{
        const newSale = [...currentSelectedProducts]
        const novoArray = newSale.filter((item) => item !== remove_item);
        setSelectedProducts(novoArray)
    }

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
                                onChange={handleSelect}
                                id="products"
                                options={products}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} placeholder="Digite o código ou nome do produto"/>}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        <>Quantidade</>
                        <TextField id="quantity" type="number" placeholder="0" onChange={handleSelectQuantity} defaultValue={0} />
                        </Grid>
                        <Grid item xs={2}>
                        <Button variant="contained" color="secondary" onClick={add_item} sx={{marginTop: "22px", height: "54px"}}>Adicionar</Button>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sx={{paddingRight: "70px"}}>
                            <ProductList sale={currentSale} setSale={setSale} />
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
                        <Grid container direction={"column"} sx={{bottom: 0, position:"absolute", maxWidth: "580px", marginBottom: "80px"}}>
                            <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row", marginTop: "70px", fontWeight: "bold"}}>
                                <Grid container justifyContent={"space-between"} direction={"row"} paddingBottom={8}>
                                    <Grid item justifyContent={"left"} sx={{fontSize: "16px"}}>Valor total da venda:</Grid>
                                    <Grid item sx={{fontSize: "23px"}}>R$ {currentSale.totalPrice}</Grid>
                                </Grid>
                            </Grid> 
                            <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row"}}>
                                <Grid container justifyContent={"space-between"} direction={"row"}  >
                                    <Grid item><Button variant="contained" color="secondary" sx={{width: "110px", height: "44px"}}>Cancelar</Button></Grid>
                                    <Grid item><Button variant="contained" color="secondary" sx={{width: "110px", height: "44px"}}>Finalizar</Button></Grid>
                                </Grid>
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