import React from "react";

import classes from "./Input.module.css"

const input = (props) => {
    //going through the generic method

    //this check will check what our input really is
    let inputElement = null;

    let inputClasses =[classes.Inputelement];

    if (props.invalid && props.shouldUpdatevalid && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(" ")} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select 
                className={inputClasses.join(" ")}  
                value={props.value}
                onChange={props.changed}>
                    {props.elementconfig.options.map( option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input 
                className={classes.Inputelement} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>
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