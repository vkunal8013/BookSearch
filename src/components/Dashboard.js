import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from './BookTable';
import { TablePagination, TextField, Button } from '@mui/material';
import { CSVLink } from 'react-csv';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    if (shouldFetch) {
      const fetchBooksAndAuthors = async () => {
        try {
          const booksResponse = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&page=${page + 1}&limit=${rowsPerPage}`);
          const booksData = booksResponse.data.docs;
          setTotalRecords(booksResponse.data.numFound);

          const authorNames = [...new Set(booksData.map(book => book.author_name).flat())];

          const authorsPromises = authorNames.map(async (authorName) => {
            const authorResponse = await axios.get(`https://openlibrary.org/search/authors.json?q=${authorName}&page=1&limit=1`);
            return authorResponse.data.docs[0];
          });

          const authorsData = await Promise.all(authorsPromises);

          const authorDetailsMap = authorsData.reduce((map, author) => {
            map[author.name] = author;
            return map;
          }, {});

          const booksWithAuthors = booksData.map(book => {
            const authorDetail = authorDetailsMap[book.author_name[0]] || {};
            return {
             ...book,
              author_birth_date: authorDetail.birth_date || 'N/A',
              author_top_work: authorDetail.top_work || 'N/A',
            };
          });

          setBooks(booksWithAuthors);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchBooksAndAuthors();
      setShouldFetch(false);
    }
  }, [shouldFetch, searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property, direction) => {
    setOrder(direction);
    setOrderBy(property);
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedBook(books[index]);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedBook({
     ...editedBook,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    const updatedBooks = books.map((book, index) => (index === isEditing? editedBook : book));
    setBooks(updatedBooks);
    setIsEditing(null);
  };

  const sortedBooks = books.sort((a, b) => {
    if (orderBy) {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) {
        return isAsc? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  return (
    <div>
      <h1>Book Dashboard</h1>
      <TextField id="searchInput" label="Search Books by Author" variant="outlined" fullWidth margin="normal" onChange={(e) => document.getElementById('searchInput').value = e.target.value} />
      <Button onClick={() => {
        setSearchTerm(document.getElementById('searchInput').value);
        setShouldFetch(true);
      }}>Search</Button>
      <CSVLink data={sortedBooks} filename={"books.csv"} className="btn btn-primary" target="_blank">
        <Button variant="contained" color="primary">Download CSV</Button>
      </CSVLink>
      <BookTable
        books={sortedBooks}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        onEditClick={handleEditClick}
        isEditing={isEditing}
        editedBook={editedBook}
        onEditChange={handleEditChange}
        onSaveClick={handleSaveClick}
      />
      <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};

export default Dashboard;
