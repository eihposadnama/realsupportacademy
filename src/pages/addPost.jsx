import React, {useEffect, useState} from 'react';
import ForumAddPost from "src/components/components/ForumAddPost/forumAddPost";
import { collection, addDoc, getDocs , serverTimestamp, doc, getFirestore } from 'firebase/firestore';

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
export default function AddPost() {
    // const [postsData, setPosts] = useState([{
    //     id: currentID,
    //     postName: "TestA",
    //     userName: "TBA",
    //     date: "1/1/2023",
    //     text: ""
    // }]);


    const router = useRouter();
    let { courseId } = router.query;
    // const { courseIdtemp } = router.query;
    // const courseId = courseIdtemp;
    // const user = useAuthState(auth);
    
    // useEffect(() => {
    //     // if (!user) return;
    //     if (!courseId) {
    //         // courseId is undefined, handle this case (e.g. redirect to a different page)
    //         router.push('/courses')
            
    //     }
    // }, [courseId])

    // useEffect(() => {
    //     const storedCourseId = window.localStorage.getItem('courseId');
    //     courseId = storedCourseId;
    //     console.log("Stored Course ID: ", storedCourseId)
    //     if (storedCourseId) {
    //         router.replace(`/forum?courseId=${storedCourseId}`);
    //     }

    // }, [])

    // useEffect (() => {
    //     window.localStorage.setItem('courseId', courseId);
    // } , [courseId])




    // const forumMessagesRef = collection(db, 'Courses', courseId, 'forumMessages');

    function OnClickSubmitPost(title, text) {
        console.log(courseId);

    
        // window.location.replace(`/forum?courseId=${courseId}`);
        return router.push(`/forum?courseId=${courseId}`);
    }
    

    function AddPostRender() {

         return (
            <div className="Post-Container">
                <div className="Posts-Wrapper">
                    <ForumAddPost PostName={"TBA"} UserName={"N/A"} Date={"Unknown"} onClick={OnClickSubmitPost} WithTitle={false} courseId={courseId} />
                </div>
                <Link className="Back" href = {`/forum?courseId=${courseId}`}>Back</Link>
            </div>
        )
    }

        return (
            <>
                <section className="entry">
                    <nav>
                        <Link href="/">
                            <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                        </Link>
                        <ul className="nav" id="navlist">
                            <li><Link href="/">About Us</Link></li>
                            <li><Link href="/courses">Courses</Link></li>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/">Contact</Link></li>
                        </ul>
                        <button className="hamburger" id="hamburger">
                            <i className="fas fa-bars"></i>
                        </button>

                    </nav>

                    {AddPostRender()}

                </section>
            </>
        )
}

