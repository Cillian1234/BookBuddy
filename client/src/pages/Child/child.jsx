import {Link, useNavigate} from 'react-router-dom'
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
//Importing the images used to link to their page
import starRevB from '../../assets/Images by AJ/starRevB.png';
import bookHWB from '../../assets/Images by AJ/bookHWB.png';
//Importing the css files from css folder
import '../../css/acc/child/child.css'; 
//Importing image for the background
import bckgrdImg from '../../assets/Images by AJ/chBckgrd.png';
import {useEffect} from "react";
import Cookies from "js-cookie";

export default function Child() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("Level") !== "Child" && Cookies.get("Locked") === "true") {
            navigate('/ChildSign')
        }
    }, []);
    return (
    <> 
    <Navbar />
        {/* Creating a div class for the childs contents */}
        <div className = "child-Con" style={{backgroundImage: `url(${bckgrdImg})`}}>  
            <div className="ButtonCon">
            <Link to={"/Child/Review"}><img id = {"sRB"} src={starRevB} alt={"Review"}/></Link>
            <Link to={"/Child/Assignment"}><img id = {"bHWB"} src={bookHWB} alt={"Assignment"}/></Link>
            </div>
        </div>
    </>
)}

