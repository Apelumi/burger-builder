import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Buttons/Button";
import classes from "./CheckoutSummarry.module.css"

const checkoutsummarry =(props) => {
    return (
        <div className={classes.Checkoutsummarry}>
            <h1>We hope it tastes delicious!!!</h1>
            <div style={{ width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutcancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutcontinued}>CONTINUE</Button>

        </div>
    )
};

export default checkoutsummarry;