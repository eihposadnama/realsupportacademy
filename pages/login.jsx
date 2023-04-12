import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
//import { HashLink } from 'react-router-hash-link';
import { Inter } from 'next/font/google'
import firebase_app from '../../backend/firebase';
import { signInWithEmailAndPassword, getAuth , signOut} from "firebase/auth"; 
//maybe can comment out?
//import { useState } from 'react';
import { useRouter } from 'next/navigation'
import {auth} from '../../backend/firebase';
//import { getAuth, signOut } from 'firebase/auth';

// import logout
import { logout } from '../../backend/firebase';
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })
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
    // sign in to firebase 

    const auth = getAuth(firebase_app)

    
    async function  logIn(email,password){
        let result = null,
            error = null;
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
            
        } catch (e) {
            error = e;
        }
        // console.log(result);
        // console.log(error);
        return { result, error };
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')

    const handleForm = async (event) => {
        event.preventDefault()
        console.log("handling login form")
        const { result, error } = await logIn(email, password);

        if (error) {
            // return console.log(error)
            // set error message
            console.log("error login form")
            // return console.log(error)
            setErrorMessage("Username or Password Incorrect");
        }
        else 
        {
            // else successful
            console.log("success login form")
            console.log(result)
            return router.push('/') // sends user back to home page 
        }

    }



    return (
    <>
        <section className = "entry">
            <nav>
                <Link href="/">
                    <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                </Link>
                <ul className = "nav" id = "navlist">
                    {/* <li><a href="/index.jsx#about-us">About Us</a></li> 
                    <li><a href="/index.jsx#Courses">Courses</a></li>
                    <li><a href="src/media.html">Media</a></li>
                    <li><a href="/index.jsx#Contact">Contact</a></li>*/}

                    {/*<li><HashLink to="/index#about-us">About Us</HashLink></li>
                    <li><HashLink to="/index#Courses">Courses</HashLink></li>
                    <li><Link href="/signUp">Sign Up</Link></li>
                    <li><HashLink to="/index#Contact">Contact</HashLink></li>*/}

                    <li><Link href="/#about-us">About Us</Link></li>
                    <li><Link href="/courses">Courses</Link></li>
                    {/*<li><Link href="/signUp">Sign Up</Link></li>*/}
                    {user == null ? (
                        <li>
                            <Link href="/signUp">Sign Up</Link>
                        </li> 
                        ) : (
                        <li>
                            <Link href="/" onClick={handleLogout}>Logout</Link>
                        </li>
                    ) 
                        
                    }
                    <li><Link href="/#Contact">Contact</Link></li>
                </ul>
                <button className = "hamburger" id = "hamburger">
                    <Navbar user={user} handleLogout={handleLogout} />
                </button>
            </nav>
            <div className="entry-area">    
                <div className="entry-text">
                    <h1 id="logTitle">Login!</h1>
                </div>

                <form id="mainForm" onSubmit={handleForm} action="#" method="#">
                    {errorMessage && <p>{errorMessage}</p>}
                    <div><label><b>Email</b></label></div>
                    <div><input onChange={(e) => setEmail(e.target.value)} type="text" name="name" required /><br/> </div>

                    <div id="pass"><label><b>Password</b></label></div>
                    <div><input onChange={(e) => setPassword(e.target.value)} type="password" name="psw" minLength="4" required /><br/></div>


                    <div id="btn"><button type="submit" id="inner-btn">LOGIN</button></div>
                    <div><Link href="/signUp">Don&apos;t have an account yet?</Link></div>
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