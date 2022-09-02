import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong><i>Current price:</i></strong> $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label} 
                label ={ctrl.label}
                added = {() => props.addIngredients(ctrl.type)}
                removed = {() => props.removingIngredients(ctrl.type)}
                disabled = {props.disabledInfo[ctrl.type]} //the function was added inorder to 
                //keep track of the type of the ingredients
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW
        </button>
    </div>
);

export default buildControls;