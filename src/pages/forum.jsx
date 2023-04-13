import React, {useEffect, useState} from 'react';
import ForumCategory from "src/components/components/ForumCategory/forumCategory";
import ForumTopic from "src/components/components/ForumTopic/forumTopic";
import ForumPost from "src/components/components/ForumPost/forumPost";
import ForumAddPost from "src/components/components/ForumAddPost/forumAddPost";
import Navbar from '@/components/components/Navbar/navbar';
import { collection, addDoc, getDocs , serverTimestamp, doc, getFirestore, query, orderBy } from 'firebase/firestore';
import { initFirebase, db, auth, useAuthState } from '../../backend/firebase';
import { getAuth, signOut } from 'firebase/auth';

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Forum() {

    const [forumState, setForumState] = useState("Posts");
    const [topicName, setTopicName] = useState("");
    const [addPost, setAddPost] = useState(false);
    const [postNum, setPostNum] = useState(0);
    let currentID = postNum;
    // const [postsData, setPosts] = useState([{
    //     id: currentID,
    //     postName: "TestA",
    //     userName: "TBA",
    //     date: "1/1/2023",
    //     text: ""
    // }]);
    const [postsData, setPosts] = useState([]);


    const router = useRouter();
    let { courseId } = router.query;
    console.log("This is course ID " + courseId);
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
    


    // const forumMessagesRef = collection(db, 'Courses', courseId, 'forumMessages');
    var today = new Date()

    useEffect(() => {
        if(courseId){
            console.log("Course ID: ", courseId);

            const db = getFirestore();
            const coursRef = doc(db, 'Courses', courseId);
        
            console.log("Course", courseId)
            console.log("CourseRef", coursRef)
            const forumMessagesRef = collection(coursRef, 'forumMessages');
    
    
            const fetchForumMessages = async () => {
    
                const forumMessagesSnapshot = await getDocs(query(forumMessagesRef, orderBy("Time","desc")));
                console.log("Calling DB");
                const forumMessagesData =forumMessagesSnapshot.docs.map((doc) => {
                    const {Title, Description, Time, User} = doc.data();
                    console.log(doc.data());
                    return {
                        id: doc.id,
                        Title: Title,
                        Description: Description,
                        Time: Time ? Time.toDate().toLocaleString():((today.getDate())<10?'0':'') + today.getDate() + "/" + ((today.getMonth() + 1)<10?'0':'')+(today.getMonth()+1) + "/" + ((today.getFullYear)<10?'0':'')+today.getFullYear()  + ", " + ((today.getHours)<10?'0':'')+today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes() + ':' + ((today.getSeconds())<10?'0':'')+today.getSeconds(),   //date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                        User: User,
                    };
                });
                setPosts(forumMessagesData);
            };
            fetchForumMessages(); 
        }
        
    }, [courseId]);

    console.log(postsData);

    //const [postsText, setPostText] = useState([]);
    let post_list = [];


    function OnClickBack() {
        setAddPost(false);
        setForumState("Posts");
    }

    function OnClickTopic() {
        //Switch to post from Posts
        setAddPost(false);
        let TestID = 0
        //const currentPostIndex = postsData.findIndex((post) => post.id === TestID);
        // const updatedPost = {...postsData[currentPostIndex], text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};
        // const newPostData = [
        //     ...postsData.slice(0, currentPostIndex),
        //     updatedPost,
        //     ...postsData.slice(currentPostIndex+1)
        // ];
        // setPosts(newPostData);
        setForumState("Post");
    }

    function OnClickAddPost() {
        //setForumState("Add post");
        console.log("Adding post");
        setAddPost(true);
    }

    function OnClickSubmitPost(title, text) {
        setPostNum(count => count+1);
        setAddPost(false);
        currentID = postNum
        setPosts((prevPosts) => ([...prevPosts, {
            id: postNum,
            postName: "TestA",
            userName: "TBA",
            date: "1/1/2023",
            text: ""
        }]));   

    }
    


    function TopicRender() {

        /*setPosts(prevPosts => {
             prevPosts.push(
                 {
                     postName: "TestA",
                     userName: "TBA",
                     date: "1/1/2023",
                     text: ""
                 }
             )
         });*/

        /*
        setPosts((prevPosts) => ([...prevPosts, {
            postName: "TestA",
            userName: "TBA",
            date: "1/1/2023",
            text: ""
        }]));

         */

        let topics = [];

        topics = /** @type {ForumTopic[]} */postsData.map((postData) => {
            return (<ForumTopic PostName={postData.Title} UserName={postData.User} Date={postData.Time}
                                onClick={OnClickTopic}/>);

            /*  topics.push(<ForumTopic PostName={postData.postName} UserName={postData.userName} Date={postData.date} onClick={OnClickTopic}/>);
              return 1234;*/
        });

        if (addPost)
        {
            topics.splice(0, 0, <ForumAddPost PostName={"TBA"} UserName={"N/A"} Date={"Unknown"} onClick={OnClickSubmitPost} WithTitle={false} courseId={courseId} />);
            console.log("topic add post");
        }



        return (
            <div className="Post-Container">
                <div className="Category-Names">
                    <p>{topicName}</p>
                    <p>PostName</p>
                    <p>UserName</p>
                    <p>Last Modified</p>
                </div>
                <div className="Posts-Wrapper">
                    {topics}
                </div>
                <Link className="Back" href = {`/addPost?courseId=${courseId}`}>add post</Link>
            </div>
        )
    }


    function PostRender() {

        

        let posts = [];
        posts /** @type {ForumPost[]} */ = postsData.map((postData) => {
            return (<ForumPost PostName={postData.Title} UserName={postData.User} Date={postData.Time} TextData={postData.Description}/>);
        });

        if (addPost)
        {
            const currentPostIndex = postsData.findIndex((post) => post.id === TestID);
            posts.push(<ForumAddPost PostName={"TBA"} UserName={"N/A"} Date={Time.toDate().toLocaleString()} onClick={OnClickSubmitPost} WithTitle={true} courseId={courseId}/>);
        }



        return (
            <div className="Post-Container">
                <div className="Category-Names">
                    <p>{topicName}</p>
                    <p>PostName</p>
                    <p>UserName</p>
                    <p>Last Modified</p>
                </div>
                <div className="Posts-Wrapper">
                    {console.log(addPost)}
                    {posts}
                </div>
                <a className="Back" onClick={OnClickBack}>Back</a>
            </div>
        )
    }



    if (forumState === "Posts") {
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
                        <button className="hamburger" id="hamburger">
                            <Navbar user={user} handleLogout={handleLogout} />
                        </button>

                    </nav>

                    {TopicRender()}

                </section>
            </>
        )
    } else if (forumState=="Post"){
        return (
            <>
                <section className="entry">
                    <nav>
                        <Link href="/">
                            <Image className="logo" src={require("src/images/RS.png")} alt="RS Logo"/>
                        </Link>
                        <ul className="nav" id="navlist">
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
                        <button className="hamburger" id="hamburger">
                            <i className="fas fa-bars"></i>
                        </button>

                    </nav>

                    {PostRender()}

                </section>
            </>
        )
    }
    else
    {
    }

}
