import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../store/store';
import { moneyFormat } from '../../utils/money';
import { SaleItem } from '../../store/features/saleSlice';



function createData(
  invoice: string,
  customer: string,
  seller: string,
  date: string,
  items: SaleItem[]
) {
  return {
    invoice,
    customer,
    seller,
    date,
    items,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const totalCalc = (items: SaleItem[]) => {
   const total = items.reduce((accumulator: any, currentItem: any) => {
      return {
        qty: accumulator.qty + currentItem.sold_amount,
        total: accumulator.total + parseFloat(currentItem.product.unit_value),
      };
    }, { qty: 0, total: 0 });

    return total.qty * total.total
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', cursor: 'pointer'  } }} onClick={() => setOpen(!open)} hover >
        <TableCell >{row.invoice}</TableCell>
        <TableCell component="th" scope="row">{row.customer}</TableCell>
        <TableCell>{row.seller}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{moneyFormat(totalCalc(row.items))} </TableCell>
        <TableCell>Deletar</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produtos/Serviços</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="center">Preço unitário</TableCell>
                    <TableCell align="center">Preço Total</TableCell>
                    <TableCell align="center">% de Comissão</TableCell>
                    <TableCell align="center">Comissão</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell component="th" scope="row">{item.product.description}</TableCell>
                      <TableCell align="center">{item.sold_amount}</TableCell>
                      <TableCell align="center">{moneyFormat(parseFloat(item.product.unit_value))}</TableCell>
                      <TableCell align="center">{moneyFormat((item.sold_amount * parseFloat(item.product.unit_value)))}</TableCell>
                      <TableCell align="center">{item.product.commission_percentage}%</TableCell>
                      <TableCell align="center">{moneyFormat(((item.sold_amount * parseFloat(item.product.unit_value))*parseInt(item.product.commission_percentage))/100)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function ListBlock() {
  const sales = useAppSelector((state)=> state.sale.sales);
  return (
    <TableContainer component={Paper} sx={{height: 600}}>
      <Table aria-label="collapsible table" sx={{overflowY: "hidden"}} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Nota Fiscal</TableCell>
            <TableCell variant="head">Cliente</TableCell>
            <TableCell variant="head">Vendedor</TableCell>
            <TableCell variant="head">Data da Venda</TableCell>
            <TableCell variant="head">Valor Total</TableCell>
            <TableCell variant="head">Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {sales.map((row) => (
            <Row key={row.id} row={{invoice: row.invoice, customer: row.customer.name, seller: row.seller.name, date: row.datetime, items: row.items}} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}