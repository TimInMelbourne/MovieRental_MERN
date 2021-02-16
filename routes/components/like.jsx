import React from 'react';
import 'font-awesome/css/font-awesome.css';

const Like = (props) => {
    var likeClass = "fa fa-heart";
    if(!props.liked) likeClass += "-o";
    return (<i className={likeClass} aria-hidden="true" style={{cursor:"pointer"}} onClick={props.onClick}></i>
    );
}
 
export default Like;