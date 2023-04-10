import { useState } from 'react';
import ForumTopic from "src/components/components/ForumTopic/forumTopic";


export default function ForumAddPost(props){

    const [textarea, setTextarea] = useState(
        "The content of a textarea goes in the value attribute"
    );

    const [textTitle, setTextTitle] = useState(
        "Dummy Title"
    );

    const handleChange = (event) => {
        setTextarea(event.target.value)
    };

    const handleTitle = (event) => {
        setTextTitle(event.target.value)
    };

    let headerPost = props.WithTitle ? <ForumTopic PostName={props.PostName} UserName={props.UserName} Date={props.Date}/> : <input onChange={handleTitle}/>;
    let currentTitle = props.WithTitle ? props.PostName: textTitle;

    return(
        <form className="Forum-Post" onSubmit={props.onClick}>
            {headerPost}
            <div className="Message-data" >
                <div className="Message-text">
                    <textarea value={textarea} rows="4" onChange={handleChange} />
                </div>
                <button type="Submit" onClick={(currentTitle,textarea)=>props.onClick}>Submit</button>
            </div>
        </form>

    );
}