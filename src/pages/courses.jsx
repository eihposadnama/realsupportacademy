//import styles from "/styles/style_1.css";
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { initFirebase, db, auth } from '../../backend/firebase';
import firebase_app from '../../backend/firebase';
// import {auth} from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getDocs, getFirestore, collection } from "firebase/firestore";
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
  const [courses, setCourses] = useState([]);

  useEffect (() => {
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });
      return unsubscribe;
  }, []);
  
  useEffect(() => {
    console.log("starting to get courses")
    const courseCollection = collection(db, "Courses");
    // get collection data
    // let courses = [];
    // getDocs(courseCollection)
    //     .then((snapshot) => {
  
    //         snapshot.docs.forEach((doc) => {
    //             courses.push({...doc.data(), id: doc.id});
    //             // console.log("adding to course array")
    //         });
    //         console.log(courses);
    //     })
  
    getDocs(courseCollection).then((snapshot) => {
      const courseData = snapshot.docs.map((doc) => {
        const { CourseName} = doc.data(); 
        return { CourseName, id: doc.id };
      });
      console.log("Courses: ", courses);
      setCourses(courseData);
    })
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


// ERROR, 

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
            <div className="entry-area">
              <div className="entry-text">
                  <h1>Here you can view all our courses &#x26A1;</h1>
                  <p>Browse or sign up below!</p>
                  <div className="button"><Link href = "#courseTitle">Courses  &#x1F449;</Link></div>
              </div>
            </div>
                  
        </section>

        <section class = "project-section">

          <h2 id="courseTitle">Courses</h2>
          <div className = "course-container">
          {courses.map((course) => (
                <div className="courseBox"  key = {course.id}>
                    <Link href={`/course/${course.id}`}>
                        <Image src={require("src/images/placeholder.png")} className="courseImg"/>
                        <p className = "subtext">{course.CourseName}</p>
                    </Link>
                </div>
          ))}
          </div>



</section> 

          <footer>
            <p className = "footer-design">@RS Academy Online 2023</p>
          </footer>


          <Script src="src/app.js"></Script>
    </>
    
  )
}