import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function TableResult(props) {
    const {rows} = props
  return (
    <TableContainer className='tableResult'  sx={{ maxHeight: 540 }} stickyHeader component={Paper}>
      <Table aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">File type</TableCell>
            <TableCell align="left">Percent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[0]}
            >
              <TableCell align="left">{row[0]}</TableCell>
              <TableCell align="left">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}