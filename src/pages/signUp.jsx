import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import {firebase_app} from '../../backend/firebase';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
//import { useState } from 'react';
import { useRouter } from 'next/navigation'
import {auth} from '../../backend/firebase';
//import { getAuth, signOut } from 'firebase/auth';

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
         
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("logged out succesfully")
            console.log(getAuth().currentUser);
    
            }).catch((error) => { 
            // An error happened.
            console.error(error)
            });
    }
    const auth = getAuth(firebase_app);


    async function signUp(email, password) {
        let result = null,
            error = null;
        try {
            result = await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            error = e;
        }
        // console.log(result);
        // console.log(error);
        return { result, error };
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            // return console.log(error)
            // set error message
            setErrorMessage("Credientials Invalid, may be already in use or inputted in wrong format")
        }
        else 
        {
            // else successful
            console.log(result)
            return router.push('/') // sends user back to home page 
        }

    }



  return (
    <>
        <section className = "entry">
            <nav>
                <a href="https://batulchehab.com">
                <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                </a>
                <ul className = "nav" id = "navlist">
                {/*<li><HashLink to="/index#about-us">About Us</HashLink></li>
                <li><HashLink to="/index#Courses">Courses</HashLink></li>
                <li><Link href="/login">Login</Link></li>
                <li><HashLink to="/index#Contact">Contact</HashLink></li>*/}

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
            <div className="entry-area">
                <div className="entry-text">
                <h1 id="signTitle">Sign Up!</h1>
                </div>

                <form id="mainForm" onSubmit={handleForm} action="#" method="#">
                    {errorMessage && <p>{errorMessage}</p>}
                    <div><label><b>Email</b></label></div>
                    <div><input onChange={(e) => setEmail(e.target.value)} type="text" name="name" required /><br/></div>

                    <div id="pass"><label><b>Password</b></label></div>

                    <div><input onChange={(e) => setPassword(e.target.value)} type="password" name="psw" minlength="4" required /><br/></div>


                    <div id="btn"><button type="submit" id="inner-btn">SIGN UP</button></div>
                    <div><Link href="login">Already have an account?</Link></div>
                </form>
            </div>

            
        </section>

            <footer>
            <p className = "footer-design">@RS Academy Online 2023</p>
            </footer>


            <Script src="src/app.js"></Script>   
    </>
    
  )
}