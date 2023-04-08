//
import Image from "next/image";
import React from "react";

export default function ForumCategory(props) {
    return (
        <div className="Forum-Category" onClick={props.onClick}>
            <div className="Category-Profile">
                <Image className="Category-Icon" src={require("src/images/laptop1.png")} alt="RS Logo"/>
                <p className="Category-Name">{props.TopicName}</p>
            </div>

            <div className="Topic">
                <p>
                    {props.numberTopics}
                </p>
                <p>
                    Topic
                </p>
            </div>
            <div className="Post">
                <p>
                    {props.numberPosts}
                </p>
                <p>
                    Post
                </p>
            </div>
            <div className="Date">
                <p>{props.Date}</p>
            </div>
        </div>
    );
}
