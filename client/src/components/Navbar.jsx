import {Link} from 'react-router-dom'
import MooDeng from '../assets/Images by AJ/DengReadingBook.jpg'
import "./Nav.css"
import logo from '../assets/Images by AJ/hippoBlink.gif';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to={"/"}><img src={logo} className="logo-img" alt={"The deng"} /></Link>
            <Link to={"/Child"}>Child</Link>
            <Link to={"/Parent"}>Parent</Link>
            <Link to={"/Teacher"}>Teacher</Link>
            <Link to={"/DBTest"}>DB test</Link>
        </nav>
    )
}