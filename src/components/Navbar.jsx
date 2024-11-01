import {Link} from 'react-router-dom'
import MooDeng from '../assets/Images by AJ/DengReadingBook.jpg'

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to={"/"}><img src={MooDeng} /></Link></li>
                <li><Link to={"/Child"}>Child</Link></li>
                <li><Link to={"/Parent"}>Parent</Link></li>
                <li><Link to={"/Teacher"}>Teacher</Link></li>
            </ul>
        </nav>
    )
}