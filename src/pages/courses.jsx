//import styles from "/styles/style_1.css";
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { initFirebase } from '../../backend/firebase';
import firebase_app from '../../backend/firebase';
import {auth} from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';

// import logout
import { logout } from '../../backend/firebase';
import { useEffect, useState } from 'react';
//import { HashLink } from 'react-router-hash-link';
const inter = Inter({ subsets: ['latin'] })
//import {Link} from "react-router-dom";
//import '@/styles/globals.css'
//import '@/styles/style_1.css'

export default function Home() {
  const [user, setUser] = useState('');

  useEffect (() => {
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });
      return unsubscribe;
  }, []);
  
  
  const handleLogout = async () => {
      // try {
      //     const auth = getAuth(firebase_app);
      //     await logout(auth).then(() => {
            
      //     }}  ;
      //     console.log("logged out succesfully")
      // }
      // catch (error) {
      //     console.error(error)
      // 
      signOut(auth).then(() => {
          // Sign-out successful.
          console.log("logged out succesfully")
          console.log(getAuth().currentUser);
  
        }).catch((error) => { 
          // An error happened.
          console.error(error)
        });
  }

  return (
    <>
        <section class = "entryCourse">
            <nav>
              <Link href="https://batulchehab.com">
                <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
              </Link>
              <ul class = "nav" id = "navlist">
                <li><Link href="/">About Us</Link></li>
                <li><Link href="/courses">Courses</Link></li>
                {user == null ? (
                        <li>
                            <Link href="/login">Login</Link>
                        </li> 
                        ) : (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    ) 
                        
                    }
                <li><Link href="/">Contact</Link></li>
              </ul>
              <button className = "hamburger" id = "hamburger">
                <i className="fas fa-bars"></i>
              </button>

            </nav>

            <h2 id="courseTitle">Courses</h2>

            <div id="selection">
              <div className="courseBox"><a href="/mockCourse"><Image src={require("src/images/laptop.png")} class="courseImg"/></a><span>Beginner Computer Literacy</span></div>
              <div className="courseBox"><Image src={require("src/images/laptop.png")} class="courseImg"/><span>Course 1</span></div>
              <div className="courseBox"><Image src={require("src/images/laptop.png")} class="courseImg"/><span>Course 1</span></div>
              <div className="courseBox"><Image src={require("src/images/laptop.png")} class="courseImg"/><span>Course 1</span></div>
              <div className="courseBox"><Image src={require("src/images/laptop.png")} class="courseImg"/><span>Course 1</span></div>
              <div className="courseBox"><Image src={require("src/images/laptop.png")} class="courseImg"/><span>Course 1</span></div>
            </div>

        </section>
          

          <footer>
            <p className = "footer-design">@RS Academy Online 2023</p>
          </footer>


          <Script src="src/app.js"></Script>
    </>
    
  )
}