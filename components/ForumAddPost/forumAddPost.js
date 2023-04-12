import { useEffect, useState } from 'react';
import ForumTopic from "src/components/components/ForumTopic/forumTopic";
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export default function ForumAddPost(props){


    const [title, setTitle] = useState("Dummy Title");
    const [description, setDescription] = useState('Add message here');
    const [user, setUser] = useState('');
    const courseId = props.courseId;

    useEffect (() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser.email);
        }

    }, []);

    const db = getFirestore();
    const coursRef = doc(db, 'Courses', courseId);

    const forumMessagesRef = collection(coursRef, 'forumMessages');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPost = {
            Title: title,
            Description: description,
            User: user,
            Time: serverTimestamp(),
        };

        addDoc(forumMessagesRef, newPost)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        });

    }

    // const [textarea, setTextarea] = useState(
    //     "The content of a textarea goes in the value attribute"
    // );

    // const [textTitle, setTextTitle] = useState(
    //     "Dummy Title"
    // );

    const handleChange = (event) => {
        setDescription(event.target.value)
    };

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };


    let headerPost = props.WithTitle ? <ForumTopic PostName={props.PostName} UserName={props.UserName} Date={props.Date}/> : <input onChange={handleTitle}/>;
    let currentTitle = props.WithTitle ? props.PostName: title;

    return(
        // <form className="Forum-Post" onSubmit={props.onClick}>
        <form className="Forum-Post" onSubmit={handleSubmit}>
            {headerPost}
            <div className="Message-data" >
                <div className="Message-text">
                    <textarea value={description} rows="4" onChange={handleChange} />
                </div>
                <button type="Submit" onClick={props.onClick}>Submit</button>
            </div>
        </form>

    );
}