import React, {useState} from 'react';
import ForumCategory from "src/components/components/ForumCategory/forumCategory";
import ForumTopic from "src/components/components/ForumTopic/forumTopic";
import ForumPost from "src/components/components/ForumPost/forumPost";
import ForumAddPost from "src/components/components/ForumAddPost/forumAddPost";
import Link from "next/link";
import Image from "next/image";

export default function Forum() {

    const [forumState, setForumState] = useState("Posts");
    const [topicName, setTopicName] = useState("");
    const [addPost, setAddPost] = useState(false);
    const [postNum, setPostNum] = useState(0);
    let currentID = postNum;
    const [postsData, setPosts] = useState([{
        id: currentID,
        postName: "TestA",
        userName: "TBA",
        date: "1/1/2023",
        text: ""
    }]);

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
        const currentPostIndex = postsData.findIndex((post) => post.id === TestID);
        const updatedPost = {...postsData[currentPostIndex], text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};
        const newPostData = [
            ...postsData.slice(0, currentPostIndex),
            updatedPost,
            ...postsData.slice(currentPostIndex+1)
        ];
        setPosts(newPostData);
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
            return (<ForumTopic PostName={postData.postName} UserName={postData.userName} Date={postData.date}
                                onClick={OnClickTopic}/>);

            /*  topics.push(<ForumTopic PostName={postData.postName} UserName={postData.userName} Date={postData.date} onClick={OnClickTopic}/>);
              return 1234;*/
        });

        if (addPost)
        {
            topics.splice(0, 0, <ForumAddPost PostName={"TBA"} UserName={"N/A"} Date={"Unknown"} onClick={OnClickSubmitPost} WithTitle={false}/>);
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
                <a className="Back" onClick={OnClickAddPost}>Add post</a>
            </div>
        )
    }


    function PostRender() {

        /*
        let postsData = [
            [
                "Test A",
                "TBA",
                "1/1/2023",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            ],
            [
                "Test B",
                "TBA",
                "1/1/2023",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            ],
            [
                "Test C",
                "TBA",
                "1/1/2023",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            ]
        ]

         */

        //setPosts(prevPosts => prevPosts[0].text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");


        let posts = [];
        posts /** @type {ForumPost[]} */ = postsData.map((postData) => {
            return (<ForumPost PostName={postData.postName} UserName={postData.userName} Date={postData.date}
                               TextData={postData.text}/>);
        });

        if (addPost)
        {
            posts.push(<ForumAddPost PostName={"TBA"} UserName={"N/A"} Date={"Unknown"}
                                     onClick={OnClickSubmitPost} WithTitle={true}/>);
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
                <a className="Back" onClick={OnClickAddPost}>Add Post</a>
            </div>
        )
    }



    if (forumState === "Posts") {
        return (
            <>
                <section className="entry">
                    <nav>
                        <Link href="https://batulchehab.com">
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

                    {TopicRender()}

                </section>
            </>
        )
    } else if (forumState=="Post"){
        return (
            <>
                <section className="entry">
                    <nav>
                        <Link href="https://batulchehab.com">
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

                    {PostRender()}

                </section>
            </>
        )
    }
    else
    {
    }

}
