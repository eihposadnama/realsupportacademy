import Image from 'next/image';
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

    //const signOutFunc = () => 
    //    firebase_app.getAuth().signOut().then(clear);
    // const app = initFirebase();
    // console.log(app);
    // var user = getAuth().currentUser;
    // console.log("user is logged in: " + user)
  return (
    <>
        <section className = "entry">
            <nav className="navbar">
                <Link href="/">
                    <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                </Link>
                <ul className = "nav" id = "navlist">
                    <li><Link href="#about-us">About Us</Link></li>
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
                    <li><Link href="#Contact">Contact</Link></li>
                </ul>
                <button className = "hamburger" id = "hamburger">
                    <i className="fas fa-bars"></i>
                </button>
            </nav>
            <div className="entry-area">
                <div className="entry-text">
                    <h1>RS Academy</h1>
                    <p>Empowering underrepresented communities through accessible e-learning</p>
                    <div className="button"><a href = "#about-us">About Us</a></div>
                </div>

                {/* <div className="socials">
                        <div><a href="https://www.youtube.com/channel/UCofjh2nsUurRo-LgM2z7ZZA" className = "social">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="40" width="40" viewBox="0 0 24 24"><path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 7c-.02-4.123-.323-5.7-2.923-5.877-2.403-.164-7.754-.163-10.153 0-2.598.177-2.904 1.747-2.924 5.877.02 4.123.323 5.7 2.923 5.877 2.399.163 7.75.164 10.153 0 2.598-.177 2.904-1.747 2.924-5.877z"/></svg></a> </div>
                        <div><a href="https://www.linkedin.com/in/batulchehab/" className = "social">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="40" width="40" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a> </div>
                        <div><a href="https://github.com/BatulC" className = "social">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="40" width="40" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/></svg></a> </div>
                </div> */}
            </div>

            </section>

            <section className = "sub-section" id = "about-us">
                <div className = "information">
                    <h2>Unlock your potential <br/> with RS Academy &#x1F680;</h2>
                    <p>&#x1F449; Welcome to RS Academy, your one-stop destination for affordable and accessible e-learning courses on computer literacy and budgeting. <br/> &#x1F449; Our platform is specifically designed to empower individuals from underrepresented backgrounds, providing them with the necessary skills to succeed in today&apos;s digital world.</p>
                </div>
                <div className = "image-container">
                    <Image className = "images" src={require("src/images/laptop3.webp")} alt ="Laptop3"/>
                </div>
            </section>

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
            </section>
            <section className = "project2-section">
                <h2>Certificates</h2>
                <div className = "certificate">
                    <div className = "">
                        <div className = "wireframe-div">
                            <Image className = "images" src={require("src/images/certificate.png")} alt = "certificate.png"/>
                        </div>
                    </div>
                    <div className = "project-explanation">
                        <h3>Unique Digital Certificates &#x1F4C3;</h3>
                        <p>&#x1F449; Once you complete a course, you get a link to your unique certificate!
                            <br/><br/>&#x1F449; Use it when applying to jobs, education or wherever else
                            <br/><br/>&#x1F449; Easily prove your literacy and skills!
                        </p>
                    </div>
                </div>
            </section>

            <section className = "project-section">
                <h2>Skills to Gain</h2>
                <div className = "skill-container">
                    <div className = "skill">
                        <Image className = "skill-format" src={require("src/images/icons8-online-banking-64.png")}/>
                        <p className = "subtext">Finances</p>
                    </div>
                    <div className = "skill">
                        <Image className = "skill-format" src={require("src/images/icons8-monitor-50.png")}/>
                        <p className = "subtext">Computer Literacy</p>
                    </div>
                    <div className = "skill">
                        <Image className = "skill-format" src={require("src/images/icons8-microsoft-office-2019-48.png")}/>
                        <p className = "subtext">Office</p>
                    </div>
                    <div className = "skill">
                        <Image className = "skill-format" src={require("src/images/icons8-mail-48.png")}/>
                        <p className = "subtext">Emails</p>
                    </div>
                </div>
            </section>

            <section className = "sub-section" id = "Contact">
                <div className = "information">
                    <h2>Want to contact RS Academy? &#x1F447;</h2>
                    <a href="mailto: Bat-c@hotmail.co.uk" className = "contact-link"> &#x1F4E5; help@RSAcademy.co.uk</a>
                    <a href="https://www.linkedin.com/in/batulchehab/" className = "contact-link"> &#x1F4E3; Linkedin: RS Academy</a>
                    <a href="https://www.google.com/maps/place/London/" className = "contact-link"> &#x1F4CD;  London Based</a>
                </div>
            </section>


            <footer>
                <p className = "footer-design">@RS Academy Online 2023</p>
            </footer>
    </>
    
  )
}
