import Link from 'next/link';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
    <>
        <section className = "entry">
            <nav>
                <a href="https://batulchehab.com">
                    <img className="logo" src="src/images/RS.png" alt="RS Logo"/>
                </a>
                <ul className = "nav" id = "navlist">
                    {/* <li><a href="/index.jsx#about-us">About Us</a></li> 
                    <li><a href="/index.jsx#Courses">Courses</a></li>
                    <li><a href="src/media.html">Media</a></li>
                    <li><a href="/index.jsx#Contact">Contact</a></li>*/}

                    <li><Link href="/index#about-us">About Us</Link></li>
                    <li><Link href="/index#Courses">Courses</Link></li>
                    <li><Link href="/signUp">Sign Up</Link></li>
                    <li><Link href="/index#Contact">Contact</Link></li>
                </ul>
                <button className = "hamburger" id = "hamburger">
                    <i className="fas fa-bars"></i>
                </button>
            </nav>
            <div className="entry-area">    
                <div className="entry-text">
                    <h1 id="logTitle">Login!</h1>
                </div>

                <form id="mainForm" action="#" method="#">
                    <div><label><b>Username</b></label></div>
                    <div><input type="text" name="name" required /> <br/> </div>

                    <div id="pass"><label><b>Password</b></label></div>
                    <div><input type="password" name="psw" minlength="3" required /><br/></div>


                    <div id="btn"><button type="submit" id="inner-btn">LOGIN</button></div>
                    <div><Link href="/signUp">Don&apos;t have an account yet?</Link></div>
                </form>
            </div>

        
        </section>

        <footer>
            <p className = "footer-design">@RS Academy Online 2023</p>
        </footer>


        {/* <script src="src/app.js"></script> */}
    </>
      
    )
}