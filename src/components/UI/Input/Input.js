import React from "react";

import classes from "./Input.module.css"

const input = (props) => {
    //going through the generic method

    //this check will check what our input really is
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.Inputelement} {...props}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.Inputelement} {...props}/>
            break;
        default:
            inputElement = <input className={classes.Inputelement} {...props}/>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;