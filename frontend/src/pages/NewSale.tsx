import {Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { ProductList } from "../components/ProductList/ProductList";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProduct } from "../store/features/productSlice";
import { addProduct, updateProduct } from "../store/features/productSaleSlice";
import { moneyFormat } from "../utils/money";
import { fetchSeller } from "../store/features/sellerSlice";
import { fetchCustomer } from "../store/features/customerSlice";
import { addCurrentSale } from "../store/features/currentSaleSlice";
import { v4 as uuidv4 } from 'uuid';
import { Sale , addSaleSend } from "../store/features/saleSenderSlice";
import DocumentTitle from 'react-document-title';



export default function SaleCreate(){
    const dispatch = useAppDispatch();
    const productsList = useAppSelector((state)=> state.product.products);
    const productsSaleList = useAppSelector((state)=> state.productSale.productsSale);
    const customers = useAppSelector((state)=> state.customer.customers)
    const sellers = useAppSelector((state)=> state.seller.sellers)
    const total = useAppSelector((state)=> state.currentSale.currentSale);
    useEffect(()=>{
        dispatch(fetchProduct());
        dispatch(fetchSeller());
        dispatch(fetchCustomer());
    }, [])

    

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [currentProduct, setCurrentProduct] = useState<{id: number, description: string, code: string, unit_value: string, quantity: number}>();
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [currentCustomer, setCurrentCustomer] = useState<{id: number, name: string, email: string, phone: string}>();
    const [currentSeller, setCurrentSeller] = useState<{id: number, name: string, email: string, phone: string}>();

    const handleSelectSeller = (event: SyntheticEvent<Element, Event>, value: any) => {
        console.log("Selected seller====: ", value)
        if (value != null){
            setCurrentSeller(value)
        }
        
      };
    
    const handleSelectCustomer = (event: SyntheticEvent<Element, Event>, value: any) => {
    console.log("Selected customer====: ", value)
    if (value != null){
        setCurrentCustomer(value)
    }
    
    };

    const handleSelect = (event: SyntheticEvent<Element, Event>, value: any) => {
        console.log("Selected ====: ", value)
        if (value != null){
            setCurrentProduct(value)
        }
        
      };
    
    const handleSelectQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        setCurrentQuantity(value)
    };

    const add_item = () => {
        if (currentProduct != null && currentQuantity != 0){

           let saleProduct = {
                id: currentProduct.id,
                code: currentProduct.code,
                description: currentProduct.description,
                unit_value: parseFloat(currentProduct.unit_value,),
                quantity: currentQuantity

            }
            let newtotal = total + (currentQuantity * parseFloat(currentProduct.unit_value,))
            const itemToUpdate = productsSaleList.find((item) => item.id === currentProduct.id);
            if (itemToUpdate) {
                saleProduct.quantity = itemToUpdate.quantity + currentQuantity;
                dispatch(updateProduct(saleProduct))
                newtotal = total + (saleProduct.quantity * parseFloat(currentProduct.unit_value,))
              }else{
                dispatch(addProduct(saleProduct))
              }

            dispatch(addCurrentSale(newtotal))
        }
        
            
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
    
    const isOptionEqualToValue = (option:any, value:any) => {
    // Compare as opções com base no campo 'id'
    return option.id === value.id;
    };

    const finalize_sale = ()=>{
        const invoice = uuidv4(); 
        const actualDate = currentDateTime
        const custumer = currentCustomer
        const seller = currentSeller
        const products = productsSaleList.map((item) => ({
            product: item.id,
            quantity: item.quantity,
          }));

        const sale: Sale = {
            invoice: invoice,
            datetime: actualDate.toISOString(),
            customer: currentCustomer?.id ?? 0,
            seller: currentSeller?.id ?? 0,
            products: products


        }
        console.log("Venda concluida ================: ", sale)
        dispatch(addSaleSend(sale))
    }

    return (
        <>
            <>
            <Helmet></Helmet>
            </>
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
                                onChange={handleSelect}
                                getOptionLabel={(option) => option.description}
                                isOptionEqualToValue={isOptionEqualToValue}
                                options={productsList}
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
                            <ProductList/>
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
                                onChange={handleSelectSeller}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={isOptionEqualToValue}
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
                                onChange={handleSelectCustomer}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={isOptionEqualToValue}
                                options={sellers}
                                sx={{ width: "90%" }}
                                renderInput={(params) => <TextField {...params} placeholder="Selecione o nome"/>}
                            />
                        </Grid>
                        <Grid container direction={"column"} sx={{bottom: 0, position:"absolute", maxWidth: "580px", marginBottom: "80px"}}>
                            <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row", marginTop: "70px", fontWeight: "bold"}}>
                                <Grid container justifyContent={"space-between"} direction={"row"} paddingBottom={8}>
                                    <Grid item justifyContent={"left"} sx={{fontSize: "16px"}}>Valor total da venda:</Grid>
                                    <Grid item sx={{fontSize: "23px"}}>{moneyFormat(total)}</Grid>
                                </Grid>
                            </Grid> 
                            <Grid item xs={12} sx={{paddingX: 4, justifyContent: "space-around", direction: "row"}}>
                                <Grid container justifyContent={"space-between"} direction={"row"}  >
                                    <Grid item><Button variant="contained" color="secondary" sx={{width: "110px", height: "44px"}}>Cancelar</Button></Grid>
                                    <Grid item><Button onClick={()=> finalize_sale() } variant="contained" color="secondary" sx={{width: "110px", height: "44px"}}>Finalizar</Button></Grid>
                                </Grid>
                            </Grid> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    );
}
