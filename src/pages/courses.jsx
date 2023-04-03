import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
//import { HashLink } from 'react-router-hash-link';
const inter = Inter({ subsets: ['latin'] })
//import {Link} from "react-router-dom";
//import '@/styles/globals.css'
//import '@/styles/style_1.css'

export default function Home() {
  return (
    <>
        <section class = "entryCourse">
            <nav>
              <Link href="https://batulchehab.com">
                <img className="logo" src="src/images/RS.png" alt="RS Logo"/>
              </Link>
              <ul class = "nav" id = "navlist">
                <li><Link href="/">About Us</Link></li>
                <li><Link href="/courses">Courses</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/">Contact</Link></li>
              </ul>
              <button className = "hamburger" id = "hamburger">
                <i className="fas fa-bars"></i>
              </button>

            </nav>

            <h2 id="courseTitle">Courses</h2>

            <div id="selection">
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
              <div className="courseBox"><img src="src/images/laptop.png"/><span>Course 1</span></div>
            </div>

          </section>
          

          <footer>
            <p className = "footer-design">@RS Academy Online 2023</p>
          </footer>


          <Script src="src/app.js"></Script>
    </>
    
  )
}