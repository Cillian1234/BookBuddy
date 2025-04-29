import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

// Importing image for barcode scanner button
import barcodeScannerImg from "../../assets/Images by AJ/bcodescnimg.jpg";

// Importing the CSS
import '../Child/css/lib.css';

export default function Library() {
  // Shows result after scanning
  const [barcodeResult, setBarcodeResult] = useState('No result'); 
  // Holds all the books from the DB
  const [books, setBooks] = useState([]); 
  // Toggles the scanner view
  const [showScanner, setShowScanner] = useState(false);
  // Loading state when fetching
  const [isLoading, setIsLoading] = useState(false); 
  // If not logged in, still show books with "Unknown" ID
  const childID = Cookies.get("UID") || "Unknown";  

  // Load the books when childID is ready
  useEffect(() => {
    fetchBooks();
  }, [childID]);

  // Fetch all books from the backend
  const fetchBooks = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await fetch(`http://localhost:8080/record/getBooks?childID=${childID}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('Fetched books:', data);

      // If books came back as an array
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.error('Books data is not an array', data);
        setBooks([]); // Set to empty if something went wrong
      }
    } catch (error) {
      console.error('Error fetching books', error);
    } finally {
      setIsLoading(false); // Done loading
    }
  };

  // This runs when the scanner picks up something
  const handleScan = (err, result) => {
    if (result) {
      console.log('Scanned result:', result.text);
      setBarcodeResult(result.text);
      addBookToLibrary(result.text); // Try to add this scanned book
    } else {
      console.log('Scan failed:', err);
      setBarcodeResult(`Scan failed. Error: ${err}`);
    }
  };

  // Use the scanned ISBN to fetch and add the book to backend
  const addBookToLibrary = async (isbn) => {
    try {
      console.log('Adding book with ISBN:', isbn);
      const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

      const response = await fetch(openLibraryUrl, {
        headers: {
          "User-Agent": "BookBuddy/1.0 (hanapkokuyabuvs@yahoo.com)" // Just using my email for now
        }
      });

      const data = await response.json();

      if (data[`ISBN:${isbn}`]) {
        const book = data[`ISBN:${isbn}`];
        const title = book.title || "Unknown Title";
        const author = book.authors ? book.authors.map(author => author.name).join(', ') : "Unknown Author";

        console.log('Book details fetched:', { title, author });

        // Send book info to server
        const addBookResponse = await fetch('http://localhost:8080/record/addBook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isbn,
            title,
            author,
            childID,
          }),
        });

        const addBookData = await addBookResponse.json();

        if (addBookData.message === "Book added successfully!") {
          alert('Book added successfully!');
          fetchBooks(); // Refresh the list
        } else {
          alert('Failed to add the book.');
        }
      } else {
        alert('Book not found in Open Library.');
      }
    } catch (error) {
      console.error('Error adding book', error);
      alert('Failed to fetch book details.');
    }
  };

  return (
    <div className="library-container">
      <h1>Your Library</h1>

      {/* Scanner image acts like a toggle */}
      <img
        src={barcodeScannerImg}
        alt="Scan Barcode"
        className="scanner-img"
        onClick={() => setShowScanner(!showScanner)}
        style={{ cursor: 'pointer' }}
      />

      {/* Barcode scanner appears when toggled */}
      {showScanner && (
        <div className="barcode-scanner">
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={handleScan}
            onError={(err) => console.error('Scanner error:', err)}
          />
          <h2>{barcodeResult}</h2>
        </div>
      )}

      {/* Book list display */}
      <div className="books-list">
        <h2>Books in Your Library:</h2>
        {isLoading ? (
          <p>Loading books...</p>
        ) : (
          <ul>
            {books.length > 0 ? (
              books.map((book, index) => (
                <li key={index} className="book-item">
                  {/* Book cover from Open Library Covers API */}
                  <img
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                    alt={`${book.title} cover`}
                    className="book-cover"
                  />
                  <div className="book-info">
                    <p><strong>{book.title}</strong></p>
                    <p>{book.author}</p>
                    <p>ISBN: {book.isbn}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No books in your library yet.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
