import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Buttons/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return (
        <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}>{igkey}
            </span> : {props.ingredients[igkey]}
        </li>);
    });
    return (
        <Aux>
            <h3>Your OrderSummary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType = "Danger" clicked ={props.purchasingCanceled}>CANCEL</Button>
            <Button btnType = "Success" clicked={props.purchasingContinue}>CONTINUE</Button>
        </Aux>
    )
   
};

export default orderSummary;