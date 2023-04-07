
//import styles from "/styles/style_1.css";
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
//import { HashLink } from 'react-router-hash-link';
const inter = Inter({ subsets: ['latin'] })
import {auth} from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';

// import logout
import { logout } from '../../backend/firebase';
import { useEffect, useState } from 'react';
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
        <section className = "entryCourse" id="mockCourse-section">
             <nav>
                <Link href="/">
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
                            <Link href="#" onClick={handleLogout}>Logout</Link>
                        </li>
                    ) 
                        
                    }
                    <li><Link href="/">Contact</Link></li>
                </ul>
                <button className = "hamburger" id = "hamburger">
                    <i className="fas fa-bars"></i>
                </button>
             </nav>

            <section className = "project1-section" id = "Courses">
                <h2>Course Showcase</h2>
                <div className = "project-container">
                    <div className = "project-explanation">
                        <h3>Beginner Computer Literacy &#x1F4BB;</h3>
                        <p>Our computer literacy course is designed to provide a solid foundation for individuals new to computers, covering everything from basic computer hardware and software concepts to file management and internet browsing. With interactive lessons and hands-on exercises, you&apos;ll gain the confidence and skills needed to use computers effectively in your personal and professional life</p>
                    </div>
                    <div className = "image-container">
                        <Image className = "images" src={require("src/images/laptop2.png")} alt = "laptop2"/>
                    </div>
                </div>
                <button id="enroll">ENROLL</button>
                <br/>
            </section>

        </section>

        <footer>
            <p className="footer-design">@RS Academy Online 2023</p>
        </footer>

          <Script src="src/app.js"></Script>
    </>

  )
}