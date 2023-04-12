//import styles from "/styles/style_1.css";
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { initFirebase, db, auth } from '../../backend/firebase';
import firebase_app from '../../backend/firebase';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
// import {auth} from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getDocs, getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { app } from '../../backend/firebase';
import { onSnapshot } from "firebase/firestore";
// import logout
import { logout } from '../../backend/firebase';
import { useEffect, useState } from 'react';
//import { HashLink } from 'react-router-hash-link';
const inter = Inter({ subsets: ['latin'] })
//import {Link} from "react-router-dom";
//import '@/styles/globals.css'
//import '@/styles/style_1.css'

import Navbar from '@/components/components/Navbar/navbar';

export default function Home() {
  const [user, setUser] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect (() => {
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });
      return unsubscribe;
  }, []);
  

  const storage = getStorage(app);
  


  // useEffect(() => {
  //   let urlvar = "";
  //   const storageRef = ref(storage, 'banking101.png');
  //   getDownloadURL(storageRef).then((url) => {
  //     console.log("url: ", url);
  //     urlvar = url;
      
  //   });
  
  //   const courseRef = doc(db, "Courses", 'OB103');
  //   console.log(courseRef);
  //   updateDoc(courseRef, {image: urlvar})

  // }, []);

  


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
        const { CourseName, image} = doc.data(); 
        console.log("course image: ", image);
        return { CourseName, image, id: doc.id };
      });
      console.log("Courses: ", courses);
      setCourses(courseData);
    })
  }, []);  

//     getDocs(courseCollection).then((snapshot) => {
//       const promises = snapshot.docs.map((doc) => {
//         const { CourseName, image} = doc.data();
//         const imageRef = ref(storage, image);
//         return getDownloadURL(imageRef).then((url) => {
//           const courseRef = doc(collection(db, "Courses"), doc.id);
//           return updateDoc(courseRef, {image: url})
//         }).catch((error) => {
//           console.log(error);
//         });
//     });
//     Promise.all(promises).then(() => {
//       console.log("All courses updated with image URLs");
//     }).catch((error) => {
//       console.error("Error updating course documents with image URLs", error);
//     });
//   });
// }, []);

// useEffect(() => {
//   const courseCollection = collection(db, "courses");
//   const unsubscribe = onSnapshot(courseCollection, (snapshot) => {
//     const courseData = snapshot.docs.map((doc) => {
//       const { CourseName, imageUrl } = doc.data();
//       return { CourseName, imageUrl, id: doc.id };
//     });
//     setCourses(courseData);
//   });
//   return unsubscribe;
// }, [db]);


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
        <section className = "entryCourse">
            <nav>
                <Link href="/">
                    <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                </Link>
              <ul className = "nav" id = "navlist">
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
              <button className = "hamburger" id = "hamburger">
                <Navbar user={user} handleLogout={handleLogout} />
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

        <section className = "project-section">

          <h2 id="courseTitle">Courses</h2>
          {
            !user ? <p>You must be logged in to see specific details about these courses, you can login <Link href="/login" style={{ color: '#000' }} >here</Link>, alternatively sign-up <Link href="/signUp" style={{ color: '#000' }}>here</Link>. </p> : <></>
          }
          <div className = "course-container">
          {courses.map((course) => (
                <div className="courseBox"  key = {course.id}>
                    <Link href={ user ? `/${course.id}` : "#courseTitle"}>
                        <img src={course.image} className="courseImg" width="250" height="100"/>
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