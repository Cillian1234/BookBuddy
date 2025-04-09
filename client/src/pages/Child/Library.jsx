import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import barcodeScannerImg from "../../assets/Images by AJ/bcodescnimg.jpg";
import '../Child/css/lib.css';

export default function Library() {
  const [barcodeResult, setBarcodeResult] = useState('No result');
  const [books, setBooks] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const childID = Cookies.get("UID") || "Unknown";  // Set to "Unknown" if no childID is found (Jst for the moment)

  // Fetch books when childID is available (If unkmnown it should jst display it anyeays)
  useEffect(() => {
    fetchBooks();
  }, [childID]);

  // Fetch books from backend
  const fetchBooks = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:8080/record/getBooks?childID=${childID}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('Fetched books:', data);

      if (Array.isArray(data)) {
        setBooks(data); // Set books into state
      } else {
        console.error('Books data is not an array', data);
        setBooks([]); // Reset if invalid data
      }
    } catch (error) {
      console.error('Error fetching books', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle barcode scan result
  const handleScan = (err, result) => {
    if (result) {
        console.log('Scanned result:', result.text);
        setBarcodeResult(result.text);
        addBookToLibrary(result.text); // Add the book using scanned ISBN
    } else {
        console.log('Scan failed:', err);
        setBarcodeResult(`Scan failed. Error: ${err}`);
    }
};

  // Add book to library by ISBN
  const addBookToLibrary = async (isbn) => {
    try {
      console.log('Adding book with ISBN:', isbn);
      const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
      const response = await fetch(openLibraryUrl);
      const data = await response.json();
  
      if (data[`ISBN:${isbn}`]) {
        const book = data[`ISBN:${isbn}`];
        const title = book.title || "Unknown Title";
        const author = book.authors ? book.authors.map(author => author.name).join(', ') : "Unknown Author";
  
        console.log('Fetched book details:', { title, author });
  
        // Send book data to backend
        const addBookResponse = await fetch('http://localhost:8080/record/addBook', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isbn,
            title,
            author,
            childID,  // Use the fallback "Unknown" for testing
          }),
        });
  
        const addBookData = await addBookResponse.json();
  
        if (addBookData.message === "Book added successfully!") {
          alert('Book added successfully!');
          fetchBooks(); // Fetch books again after adding
        } else {
          console.error('Failed to add the book:', addBookData.message);
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
      <img
        src={barcodeScannerImg}
        alt="Scan Barcode"
        className="scanner-img"
        onClick={() => setShowScanner(!showScanner)}
        style={{ cursor: 'pointer' }}
      />

      {showScanner && (
        <div className="barcode-scanner">
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={handleScan}
            onError={(err) => console.error('Scanner error:', err)}
          />
          <h2>{barcodeResult}</h2> {/* Display scanned result */}
        </div>
      )}

      {/* Books list */}
      <div className="books-list">
        <h2>Books in Your Library:</h2>
        {isLoading ? (
          <p>Loading books...</p>
        ) : (
          <ul>
            {books.length > 0 ? (
              books.map((book, index) => (
                <li key={index}>
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                  <p>ISBN: {book.isbn}</p>
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
