import Image from "next/image";

export default function ForumTopic(props) {
    /*
        <div className="PostDetails">

        </div>

     */

    return (
        <div className="Forum-Category" onClick={props.onClick}>
            <Image className="Category-Icon" src={require("src/images/laptop1.png")} alt="RS Logo"/>

            <p>
                {props.PostName}
            </p>
            <p>
                {props.UserName}
            </p>
            <div className="Date">
                <p>{props.Date}</p>
            </div>
        </div>
    );
}
