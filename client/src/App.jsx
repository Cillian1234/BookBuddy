import React, { useEffect, useState } from 'react'; // Importing React and useState hook
import DengRead from './assets/Images by AJ/DengReadingBook.jpg'; // Importing images
import teachB from './assets/Images by AJ/BluePencil.png';
import childB from './assets/Images by AJ/YellowPencil.png';
import parentB from './assets/Images by AJ/RedPencil.png';
import '../main.css'; // Importing CSS file
import { Outlet } from "react-router-dom";
import yellowStars from './assets/Images by AJ/YellowStars.png';
import Navbar from './components/Navbar'; // Importing Navbar component
import BarcodeScannerComponent from 'react-qr-barcode-scanner'; // Importing Barcode Scanner component
import Cookies from "js-cookie"; // Importing js-cookie for cookie management
import bcodeimg from './assets/Images by AJ/bcodescnimg.jpg'; //Importing the img for the scanner toggle
function App() {
  // State to store the result of the barcode scan
  const [barcodeResult, setBarcodeResult] = useState('No result');
  const [locked, setLocked] = useState(true); // State to control locked pages
  const [showScanner, setShowScanner] = useState(false); // State to control the visibility of the barcode scanner

  // Function to handle barcode scan
  const handleScan = (err, result) => {
    if (result) {
      setBarcodeResult(result.text); // Updating state with the scanned result
    } else if (err) {
      console.error(err); // Logging error if there is any.. hopefully not or never ;)
    }
  };

  // Function to toggle locked pages state
  function toggleLockedPages() {
    setLocked(!locked); // Toggling locked state
    Cookies.set("Locked", locked); // Setting cookie value
  }

  // Using useEffect to set cookie on state change
  useEffect(() => {
    Cookies.set("Locked", locked);
  }, [locked]);

  // Function to toggle the barcode scanner
  const toggleScanner = () => {
    setShowScanner(!showScanner); // Toggling the visibility of the barcode scanner. Scanner should not show until clicked
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar */}
      <div className="main-container">
        <button onClick={toggleLockedPages}>{locked ? "Disable required login level" : "Enable required login level"}</button>
        <img src={yellowStars} className="stars-top-left" alt="Yellow Stars Top Left" /> {/* Top left stars image */}
        <div className="header">
          <img src={DengRead} className="logo" alt="Hippo reading" /> {/* Logo image */}
          <h1>BookBuddy</h1> {/* Main title */}
        </div>
        <div className="image-container">
          <a href="/teachSign" className="button-link">
            <img src={teachB} className="button-image tSign" alt="Blue button pencil" /> {/* Teacher button */}
            <span className="button-text button-text-T">Teacher</span>
          </a>
          <a href="/childSign" className="button-link">
            <img src={childB} className="button-image cSign" alt="Yellow button pencil" /> {/* Child button */}
            <span className="button-text">Child</span>
          </a>
          <a href="/parentSign" className="button-link">
            <img src={parentB} className="button-image pSign" alt="Red button pencil" /> {/* Parent button */}
            <span className="button-text button-text-P">Parent</span>
          </a>
        </div>
        <img src={yellowStars} className="stars-bottom-right" alt="Yellow Stars Bottom Right" /> {/* Bottom right stars image */}
      </div>

      <h1>Book Buddy!</h1>
      <div className="card">
        <p>
          The beginning.
        </p>
        <p>
          I{`'`}m losing my mind :3 I love that song "Where Is My Mind".
        </p>
      </div>
      <hr />
      {/* Horizontal line */}
      <Outlet /> {/* Placeholder for nested routes */}
      <div className="barcode-toggle">
        <img src={bcodeimg} alt="Toggle Barcode Scanner" onClick={toggleScanner} style={{ cursor: 'pointer' }} /> {/* Clickable image to toggle barcode scanner! unless clicked it should not show */}
      </div>
      {showScanner && (
        <div className="barcode-scanner">
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => handleScan(err, result)} // Handling barcode scanner
          />
          <h1><bold>{barcodeResult.startsWith('978') || barcodeResult.startsWith('979') ? `ISBN: ${barcodeResult}` : barcodeResult}</bold></h1> {/* Displaying scanned result, checking for ISBN prefixes!! */}
          {/* The '?' basically checks if the condition is true or false. If true displays `ISBN: ${barcodeResult}` ':' is like otherwise, false displays barcodeResult */}
        </div>
      )}
    </>
  );
}

export default App; // Exporting App component