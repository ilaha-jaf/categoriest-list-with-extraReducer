import { Link } from "react-router-dom";
import "./navbar.css"
import { useSelector } from "react-redux";
export default function Navbar() {
    const { basket, favorites } = useSelector((state) => state.users);



    return (
        <div className="nav-section">
            <nav className="nav">
                <ul className="navbar">
                    <Link to="/" className="site-title">Categories</Link>
                    <Link to="/addCategory">Add Category</Link>
                    <Link to="/favorites ">Favorites <span className="badge">{favorites.length}</span> </Link>
                    <Link to="/basket">Basket <span className="badge">{basket.length}</span></Link>
                </ul>
            </nav>
        </div>
    );
}