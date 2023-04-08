import React, { useState } from 'react';
import ForumCategory from "src/components/components/ForumCategory/forumCategory";
import ForumTopic from "src/components/components/ForumTopic/forumTopic";
import ForumPost from "src/components/components/ForumPost/forumPost";
import Link from "next/link";
import Image from "next/image";

export default function Forum() {

    const [forumState, setForumState] = useState("Posts");
    const [topicName, setTopicName] = useState("");
    const [postNum, setPostNum] = useState(0);

    function OnClickBack(){
        setForumState("Posts");
    }

    function OnClickTopic(){
        //Switch to post from Posts
        setForumState("Post");
    }


    function TopicRender(){

        function RenderTopic(postName, userName, date){
            return(<ForumTopic PostName={postName} UserName={userName} Date={date} onClick={OnClickTopic}/>)
        }

        function RenderTopics(numTopics){
            for (var i = 0 ; i < numTopics; i++){
                RenderTopic("Test", "TBA", "1/1/2023")
            }
        }

        return(
            <div className="Post-Container">
                <div className="Category-Names">
                    <p>{topicName}</p>
                    <p>PostName</p>
                    <p>UserName</p>
                    <p>Last Modified</p>
                </div>
                <div className="Posts-Wrapper">
                    {RenderTopics(5)}
                </div>
            </div>
        )
    }



    function PostRender(){

        function RenderPosts(numPosts){
            for (var i; i < numPosts; i++){
                RenderPost("Test", "TBA", "1/1/2023", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
            }
        }

        function RenderPost(postName, userName, date, text){
            return(<ForumPost PostName={postName} UserName={userName} Date={date} TextData={text}/>)
        }

        return(
            <div className="Post-Container">
                <div className="Category-Names">
                    <p>{topicName}</p>
                    <p>PostName</p>
                    <p>UserName</p>
                    <p>Last Modified</p>
                </div>
                <div className="Posts-Wrapper">
                    {RenderPosts(2)}
                </div>
                <a className="Back" onClick={OnClickBack}>Back</a>
            </div>
        )
    }

    if (forumState === "Posts")
    {
        return(
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
    }
    else
    {
        return(
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

}
