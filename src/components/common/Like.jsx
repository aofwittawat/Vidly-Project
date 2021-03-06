import React from 'react'

const Like = (props) => {
    let classes = "fa fa-heart"

        if(!props.liked) classes +="-o"
        // console.log(classes);
        return (
            <i className={classes} aria-hidden="true" onClick={props.onClick}></i>
        )
}

export default Like

