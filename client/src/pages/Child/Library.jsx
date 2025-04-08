import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import barcodeScannerImg from "../../assets/Images by AJ/bcodescnimg.jpg";
import '../Child/css/lib.css';

export default function Library() {
  const [barcodeResult, setBarcodeResult] = useState('No result');
  const [books, setBooks] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const childID = Cookies.get("UID");

  useEffect(() => {
    if (childID) {
      fetchBooks(childID);
    }
  }, [childID]);

  const fetchBooks = async (childID) => {
    try {
      const response = await fetch('http://localhost:8080/api/record/getBooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: childID }),
      });
      const data = await response.json();
      console.log('Fetched books:', data);

      if (Array.isArray(data)) {
        setBooks(data); // Set fetched books into state
      } else {
        console.error('Books data is not an array', data);
        setBooks([]); // Reset the books list if data is invalid
      }
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleScan = (err, result) => {
    if (result) {
      console.log('Scanned result:', result.text);  // Log the scanned result
      setBarcodeResult(result.text);
      addBookToLibrary(result.text);
    } else {
      console.log('Scan failed:', err);  
    }
  };

  const addBookToLibrary = async (isbn) => {
    try {
      //Jst for the moment still have to figure out how to do this..
      const title = "Unknown Title"; 
      const author = "Unknown Author"; 

      console.log('Adding book with ISBN:', isbn); // Log ISBN being added

      const response = await fetch('http://localhost:8080/api/record/addBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: childID,
          isbn: isbn,
          title: title,
          author: author,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Book added successfully!');
        fetchBooks(childID); // Fetch books again after adding
      } else {
        console.error('Failed to add the book:', data.message); // Log failure message
        alert('Failed to add the book.');
      }
    } catch (error) {
      console.error('Error adding book', error);
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
            onUpdate={handleScan}  // Handle scan result
            onError={(err) => console.error('Scanner error:', err)}  // Handle error
          />
          <h2>{barcodeResult}</h2>  {/* Display the scanned ISBN */}
        </div>
      )}

      <div className="books-list">
        <h2>Books in Your Library:</h2>
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
      </div>
    </div>
  );
}
