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

  useEffect(() => {
    if (shouldFetch) {
      const fetchBooksAndAuthors = async () => {
        try {
          const searchQuery = searchTerm ? `&author=${encodeURIComponent(searchTerm)}` : '';
          // Fetch more records than needed for pagination
          const booksResponse = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&limit=100`);
          
          // Filter records case insensitively for exact match
          const booksData = booksResponse.data.docs.filter(book => 
            book.author_name && book.author_name.some(author => author.toLowerCase() === searchTerm.toLowerCase())
          );

          setTotalRecords(booksData.length);

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
    setShouldFetch(true);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    setShouldFetch(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedBooks = books.sort((a, b) => {
    if (orderBy) {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  // Apply pagination to sorted books
  const paginatedBooks = sortedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: '34px', fontWeight: 'bold' }}>Book Dashboard</h1>
      <TextField id="searchInput" label="Search Books by Author" variant="outlined" fullWidth margin="normal" />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={() => {
          setSearchTerm(document.getElementById('searchInput').value);
          setPage(0);  // Reset to the first page on new search
          setShouldFetch(true);
        }}>Search</Button>
        <CSVLink data={sortedBooks} filename={"books.csv"} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Download CSV</Button>
        </CSVLink>
      </div>
      <BookTable
        books={paginatedBooks}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
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
