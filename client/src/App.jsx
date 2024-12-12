import React, {useEffect, useState} from 'react'; // Importing React and useState hook
import DengRead from './assets/Images by AJ/DengReadingBook.jpg'; // Importing images
import teachB from './assets/Images by AJ/BluePencil.png';
import childB from './assets/Images by AJ/YellowPencil.png';
import parentB from './assets/Images by AJ/RedPencil.png'; 
import '../main.css';
import { Outlet } from "react-router-dom";
import yellowStars from './assets/Images by AJ/YellowStars.png';
import '../main.css'; // Importing CSS file
import Navbar from './components/Navbar'; // Importing Navbar component
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Cookies from "js-cookie"; // Importing Barcode Scanner component

function App() {
    const [barcodeResult, setBarcodeResult] = useState('No result'); // Setting initial state for barcode result
    const [locked, setLocked] = useState(true);

  // Function to handle barcode scan
  const handleScan = (err, result) => {
    if (result) {
      setBarcodeResult(result.text); // Updating state with scanned result
    } else if (err) {
      console.error(err); // Logging error if any
    }
  };

  function toggleLockedPages() {
      setLocked(!locked);
      Cookies.set("Locked", locked);
  }

  useEffect(() => {
      Cookies.set("Locked", locked);
  })

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
          <a href="/teachSign" target="_blank" className="button-link">
            <img src={teachB} className="button-image tSign" alt="Blue button pencil" /> {/* Teacher button */}
            <span className="button-text button-text-T">Teacher</span>
          </a>
          <a href="/childSign" target="_blank" className="button-link">
            <img src={childB} className="button-image cSign" alt="Yellow button pencil" /> {/* Child button */}
            <span className="button-text">Child</span>
          </a>
          <a href="/parentSign" target="_blank" className="button-link">
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
        <hr/>
        {/* Horizontal line */}
        <Outlet/> {/* Placeholder for nested routes */}
        <div className="barcode-scanner">
            <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => handleScan(err, result)} // Handling barcode scan
            />
            <p>{barcodeResult}</p> {/* Displaying scanned result */}
        </div>
    </>
  );
}

export default App; // Exporting App component
