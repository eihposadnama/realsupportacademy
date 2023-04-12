import React, {useState} from "react";
import Link from 'next/link';

const Navbar = ({user, handleLogout}) => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div style={{width: '100%'}} id="navPage">
            <nav className="navbar">
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>

            <div className={menu_class}>
                <ul id="displayUL">
                <li><Link href="/#about-us">About Us</Link></li>
                <li><Link href="/courses">Courses</Link></li>
                {user == null ? (
                    <li>
                        <Link href="/login">Login</Link>
                    </li> 
                    ) : (
                    <li>
                        <Link href="/" onClick={handleLogout}>Logout</Link>
                    </li>
                ) 
                    
                }
                <li><Link href="/#Contact">Contact</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar