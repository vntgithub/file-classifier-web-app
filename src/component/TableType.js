import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableType(props) {
    const {rows} = props
    const tableDataRows = []
    for(let i = 0; i < rows.length; i+=5){
        const row = 
            <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right">{rows[i].toUpperCase()}</TableCell>
                <TableCell align="right">{rows[i+1].toUpperCase()}</TableCell>
                <TableCell align="right">{rows[i+2].toUpperCase()}</TableCell>
                <TableCell align="right">{rows[i+3].toUpperCase()}</TableCell>
                <TableCell align="right">{rows[i+4].toUpperCase()}</TableCell>
            </TableRow>
        tableDataRows.push(row)
    }

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableBody>
            {tableDataRows}
        </TableBody>
        </Table>
    </TableContainer>
    );
}
