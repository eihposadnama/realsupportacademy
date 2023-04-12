//import "./postStyles.less"
//import ForumTopic from "@/components/ForumTopic/forumTopic";
import ForumTopic from "src/components/components/ForumTopic/forumTopic";


export default function ForumPost(props){

    //
    return (
        <div className="Forum-Post">
            <ForumTopic PostName={props.PostName} UserName={props.UserName} Date={props.Date}/>
            <div className="Message-data">
                <span class="Message-text">
                    {props.TextData}
                </span>
            </div>
        </div>
    )
}

