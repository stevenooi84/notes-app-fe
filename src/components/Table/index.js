import React from 'react';
import PropTypes from "prop-types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableComponent = ({ data, onRowClick, selectedRow}) => {
    return (  
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Content</TableCell>
            <TableCell align="right">Tag</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data && data.notes && data.notes.map((row) => (
            <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => onRowClick(row)}
                style={{backgroundColor: selectedRow?._id === row._id ? '#F0B27A' : 'inherit'}}
            >
                <TableCell component="th" scope="row">
                {row.content}
                </TableCell>
                <TableCell align="right">{JSON.stringify(row.tags)}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
)};

TableComponent.propTypes = {
    data: PropTypes.array,
    onRowClick: PropTypes.func,
};

export default TableComponent;