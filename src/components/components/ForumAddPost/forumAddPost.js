import { useState } from 'react';
import ForumTopic from "src/components/components/ForumTopic/forumTopic";


export default function ForumAddPost(props){

    const [textarea, setTextarea] = useState(
        "The content of a textarea goes in the value attribute"
    );

    const handleChange = (event) => {
        setTextarea(event.target.value)
    };


    return(
        <div className="Forum-Post">
            <ForumTopic PostName={props.PostName} UserName={props.UserName} Date={props.Date}/>
            <form className="Message-data" onSubmit={props.onClick}>
                <div className="Message-text">
                    <textarea value={textarea} rows="4" onChange={handleChange} />
                </div>
                <button type="Submit" onClick={props.onClick}>Submit</button>
            </form>
        </div>

    );
}