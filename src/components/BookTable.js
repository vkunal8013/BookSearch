import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const BookTable = ({ books, order, orderBy, onRequestSort, isEditing, onEdit, onSave, onChange }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
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
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="title"
                    value={book.title}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.title
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="author_name"
                    value={book.author_name}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.author_name
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="first_publish_year"
                    value={book.first_publish_year}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.first_publish_year
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="subject"
                    value={book.subject}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.subject
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="ratings_average"
                    value={book.ratings_average}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.ratings_average
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="author_birth_date"
                    value={book.author_birth_date}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.author_birth_date
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <TextField
                    name="author_top_work"
                    value={book.author_top_work}
                    onChange={(e) => onChange(e, book)}
                  />
                ) : (
                  book.author_top_work
                )}
              </TableCell>
              <TableCell>
                {isEditing === book.cover_i ? (
                  <IconButton onClick={() => onSave(book.cover_i)}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onEdit(book)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
