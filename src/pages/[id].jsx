
//import styles from "/styles/style_1.css";
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
//import { HashLink } from 'react-router-hash-link';
const inter = Inter({ subsets: ['latin'] })
import {auth} from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// import logout
import { logout } from '../../backend/firebase';
import { useEffect, useState } from 'react';
//import {Link} from "react-router-dom";
//import '@/styles/globals.css'
//import '@/styles/style_1.css'


export async function getServerSideProps(context) {
    const {id} = context.params;
    const db = getFirestore();
    const courseDoc = doc(db, 'Courses', id);
    const courseSnapshot = await getDoc(courseDoc);
    const courseData = courseSnapshot.data();
  
    courseData.id = courseSnapshot.id;

    return {
      props: {
        course: courseData
      }
    };
  }



export default function Home({ course }) {

    const [user, setUser] = useState('');
    const [enrolled, setEnrolled] = useState(false);

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


    const handleEnroll = async () => {

        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        const db = getFirestore();
        const courseRef = doc(db, 'Courses', course.id);
        const courseDoc = await getDoc(courseRef);
        const enrolledUsers = courseDoc.data().enrolledUsers;

        try {
            await updateDoc(courseRef, {
                enrolledUsers: arrayUnion(userId)
            });
            console.log("user succesfully enrolled in course")
            setEnrolled(true);
        } catch (e) {
            console.error("Error adding user to course: ", e);
        }

    }

    useEffect(() => {
        if (course.enrolledUsers && course.enrolledUsers.indexOf(user.id) !== -1) {
            console.log("User is already enrolled in course");
            setEnrolled(true);
          }
    }, [course, user.id]);


    
  return (
    <>
        <section className = "entryCourse" id="mockCourse-section">
             <nav>
                <Link href="/">
                    <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                </Link>
                <ul className = "nav" id = "navlist">
                    <li><Link href="/">About Us</Link></li>
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
                    <li><Link href="/">Contact</Link></li>
                </ul>
                <button className = "hamburger" id = "hamburger">
                    <i className="fas fa-bars"></i>
                </button>
             </nav>

            <section className = "project1-section" id = "Courses">
                <h2>{course.CourseName} &#x1F4BB;</h2>
                <div className = "project-container">
                    <div className = "project-explanation">
                        <h3>Description</h3>
                        <p>{course.Description}</p>
                        <h3>Course Length</h3>
                        <p>{course.CourseLength}</p>
                        <h3>Course Leader</h3>
                        <p>{course.CourseLeader}</p>
                    </div>
                    <div className = "image-container">
                        <Image className = "images" src={require("src/images/laptop2.png")} alt = "laptop2"/>
                    </div>
                </div>
                {enrolled ? (
                    <p>You are already enrolled in this course</p>
                ) : (
                    <button id="enroll" onClick={handleEnroll}>ENROLL</button>
                )}        
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