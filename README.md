# Book Dashboard

Welcome to the Book Dashboard! This application allows you to search for books by author and view detailed information about the books and their authors. You can also sort the book list, paginate through the results, and download the data as a CSV file.

## Features

- **Search for Books by Author**: Search books by entering the author's name in the search field. The search is case-insensitive but matches the exact author name.
- **View Book Details**: See a list of books with details including title, author, publication year, subject, ratings, author's birth date, and author's top work.
- **Sort the Book List**: Click on the table headers to sort the books by any column in ascending or descending order.
- **Paginate Through Results**: Navigate through the list of books using pagination controls. Change the number of books displayed per page.
- **Download Data as CSV**: Download the displayed book data as a CSV file for offline analysis.

## Accessing the Dashboard

You can access the Book Dashboard by visiting the following URL:

[Book Dashboard on Vercel](<https://book-search-nine.vercel.app/>)

## Getting Started

### Step 1: Search for Books by Author

1. Open the Book Dashboard in your web browser.
2. In the search field labeled "Search Books by Author", enter the name of the author you want to search for. For example, type `Mark Twain` or `J.K. Rowling`.
3. Click the "Search" button next to the search field.
4. The dashboard will display a list of books written by the specified author.

### Step 2: View Book Details

1. After performing a search, a table of books will be displayed.
2. Each row in the table represents a book and includes the following details:
   - **Title**: The title of the book.
   - **Author Name**: The name of the author.
   - **First Publish Year**: The year the book was first published.
   - **Subject**: The subject or genre of the book.
   - **Ratings Average**: The average rating of the book.
   - **Author Birth Date**: The birth date of the author.
   - **Author Top Work**: The most well-known work of the author.

### Step 3: Sort the Book List

1. To sort the book list, click on any column header in the table.
2. Clicking the header once will sort the column in ascending order.
3. Clicking the header again will sort the column in descending order.
4. The active sort column will be highlighted.

### Step 4: Paginate Through Results

1. The table displays a limited number of books per page.
2. Use the pagination controls at the bottom of the table to navigate through the pages:
   - **Previous Page**: Click to go to the previous page of results.
   - **Next Page**: Click to go to the next page of results.
   - **Rows Per Page**: Select the number of rows (books) to display per page from the dropdown menu (10, 25, 50, or 100).
3. The current page and the total number of records are displayed in the pagination controls.

### Step 5: Download Data as CSV

1. To download the displayed book data, click the "Download CSV" button.
2. A CSV file containing the current book data will be generated and downloaded to your computer.

## Troubleshooting

- **No Results Found**:
  - Ensure that the author's name is entered correctly.
  - Try different variations of the author's name if you receive no results.
- **Pagination Issues**:
  - If you notice any discrepancies in the number of records, try reloading the page and performing the search again.

