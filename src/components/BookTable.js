// BookTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

const BookTable = ({ books, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };

  const headerCellStyle = {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
    textTransform: 'capitalize',
    padding: '10px',
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['title', 'author_name', 'first_publish_year', 'subject', 'ratings_average', 'author_birth_date', 'author_top_work'].map((headCell) => (
              <TableCell
                key={headCell}
                sortDirection={orderBy === headCell ? order : false}
                style={headerCellStyle}
              >
                <TableSortLabel
                  active={orderBy === headCell}
                  direction={orderBy === headCell ? order : 'asc'}
                  onClick={createSortHandler(headCell)}
                >
                  {headCell.replace('_', ' ')}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.cover_i}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author_name}</TableCell>
              <TableCell>{book.first_publish_year}</TableCell>
              <TableCell>{book.subject}</TableCell>
              <TableCell>{book.ratings_average}</TableCell>
              <TableCell>{book.author_birth_date}</TableCell>
              <TableCell>{book.author_top_work}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;