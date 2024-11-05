import {Link} from 'react-router-dom'
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
//Importing the images used to link to their page
import starRevB from '../../assets/Images by AJ/starRevB.png';
import bookHWB from '../../assets/Images by AJ/bookHWB.png';
//Importing the css files from css folder
import './css/child.css'; 
//Importing image for the background
import bckgrdImg from '../../assets/Images by AJ/chBckgrd.png';

export default function Child() {
    return (
    /* Return as a single parent element */
    <> 
    <Navbar />
        {/* Creating a div class for the childs contents */}
        <div className = "Contents" style={{backgroundImage: `url(${bckgrdImg})`}}>  
            <div className="ButtonCon">
            <Link to={"/Review"}><img id = {"sRB"} src={starRevB} alt={"Review"}/></Link>
            <Link to={"/Assignment"}><img id = {"bHWB"} src={bookHWB} alt={"Assignment"}/></Link>
            </div>
        </div>
    </>
)}

