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



function createData(
  invoice: string,
  customer: string,
  seller: string,
  date: string,
  cost: number,
  options: string,
) {
  return {
    invoice,
    customer,
    seller,
    date,
    cost,
    options,
    history: [
      {
        product: '005 - Mouse Logitech',
        quantity: 3,
        unit_price: 25.56,
        total: 76.68,
        percent: 5.0,
        commission: 3.83,
      },
      {
        product: '012 - Caderno 200 Folhas',
        quantity: 3,
        unit_price: 25.56,
        total: 76.68,
        percent: 5.0,
        commission: 3.83,
      },
      {
        product: '105 - Manutenção Bicicleta',
        quantity: 3,
        unit_price: 25.56,
        total: 76.68,
        percent: 5.0,
        commission: 3.83,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', cursor: 'pointer'  } }} onClick={() => setOpen(!open)} hover >
        <TableCell >{row.invoice}</TableCell>
        <TableCell component="th" scope="row">{row.customer}</TableCell>
        <TableCell>{row.seller}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>R$ {row.cost}</TableCell>
        <TableCell>{row.options}</TableCell>
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.product}>
                      <TableCell component="th" scope="row">{historyRow.product}</TableCell>
                      <TableCell align="center">{historyRow.quantity}</TableCell>
                      <TableCell align="center">R$ {historyRow.unit_price}</TableCell>
                      <TableCell align="center">R$ {historyRow.total}</TableCell>
                      <TableCell align="center">{historyRow.percent}%</TableCell>
                      <TableCell align="center">R$ {historyRow.commission}</TableCell>
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

const rows = [
  createData('3490232', "1 Jorge Lacerda dos Santos", "Regina Souza", "19/10/2022 - 14:25", 71.10, "Deleter"),
  createData('563467', "2 Francisco Severino Ferreira", "Cléber Toledo", "19/10/2022 - 11:05", 65.99, "Deleter"),
  createData('8678768', "3 Vanessa Elza Liz Freitas", "Jacira dos Santos", "19/10/2022 - 09:10", 102.53, "Deleter"),
  createData('2437645', "4 Rebeca Beatriz Moreira", "Cléber Toledo", "19/10/2022 - 13:45", 253.75, "Deleter"),
  createData('976566', "5 Gustavo Pietro da Luz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('3490232', "6 Joge Lacerda dos Santos", "Regina Souza", "19/10/2022 - 14:25", 71.10, "Deleter"),
  createData('563467', "7 Francico Severino Ferreira", "Cléber Toledo", "19/10/2022 - 11:05", 65.99, "Deleter"),
  createData('8678768', "8 Vanesa Elza Liz Freitas", "Jacira dos Santos", "19/10/2022 - 09:10", 102.53, "Deleter"),
  createData('2437645', "9 Rebca Beatriz Moreira", "Cléber Toledo", "19/10/2022 - 13:45", 253.75, "Deleter"),
  createData('976566', "10 Gustvo Pietro da Luz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('976566', "11 Gustavo Pietro da", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('976566', "12 Gustavo PietroLuz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('976566', "13 Gustavo Pietro Luz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('976566', "14 Gustavo da Luz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),
  createData('976566', "15 Gustavo Luz", "Regina Souza", "19/10/2022 - 14:25", 22.36, "Deleter"),

];


export default function ListBlock() {

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
          {rows.map((row) => (
            <Row key={row.customer} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}