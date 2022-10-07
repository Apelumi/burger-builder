import React from "react";

import classes from "./Order.module.css"

const order = (props) => {

    //alternative to the first transformation we did
    //  in the burger component to our ingredients
    const ingredients = [];
    for (let ingredientsName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientsName, 
                amount: props.ingredients[ingredientsName]
            })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return(<span className={classes.IngredientsTrans} key={ig.name}>
                {ig.name} - {ig.amount}
            </span>)
    })
    return (
    <div className={classes.Order}>
        <p><strong>Ingredients</strong>: {ingredientsOutput}</p>
        <p><strong>Price</strong>: <strong style={{fontStyle: "italic"}}>USD {props.price.toFixed(2)}</strong></p>
    </div>
)}

export default order;