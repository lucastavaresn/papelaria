import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../../store/store"
import { moneyFormat } from "../../utils/formatter";


export const CommisionList = () => {

    const commissions = useAppSelector((state)=> state.commission.commissions)
    if (commissions.length === 0) {
        return (<p style={{textAlign: "center", marginTop: "15%"}}>Para visualizar o relatório, selecione um período nos campos acima.</p>);
      }

    
    const totalCalc = () => {
        return commissions.reduce((acumulador, objeto) => {
            return acumulador + objeto.commission;
          }, 0);
    }
    return (
        <>
            <TableContainer component={Paper}>
      <Table sx={{ maxHeight: 620,  overflowY: "hidden"}} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Cód</TableCell>
            <TableCell >Vendedor</TableCell>
            <TableCell >Total de vendas</TableCell>
            <TableCell >Total de comissões</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissions.map((row) => (
            <TableRow key={row.code}>
              <TableCell>{row.code}</TableCell>
              <TableCell >{row.seller}</TableCell>
              <TableCell >{row.totalSale}</TableCell>
              <TableCell >{moneyFormat(row.commission)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell sx={{fontWeight: "bold"}}>Total de Comissões do Período</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right" colSpan={3}>{moneyFormat(totalCalc())}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}