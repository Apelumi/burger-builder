import React, { Component } from "react";

import Button from "../../../components/UI/Buttons/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component{
    state = {
        name: "",
        email: "",
        address: {
            postal_code: "",
            home_add: ""
        },
        spinnerloading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({spinnerloading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerdata: {
                name: 'Ade samuel',
                address: {
                    street: "No1 adeshida road akure",
                    postalAdd: "PMB4039"
                },
                email: 'adeyefaoo7@gmail.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post("/orders.json", order)
        .then(response => {
            this.setState({spinnerloading: false})
            this.props.history.push("/")
        })
        .catch(error => {
            this.setState({spinnerloading: false})
        });
    }
    render(){
        let form = (<form>
                        <input type="text" placeholder="your name" name="Name" />
                        <input type="email" placeholder="your email" name="Email" />
                        <input type="text" placeholder="your postal-code" name="Postal_code" />
                        <input type="text" placeholder="your home_add" name="Home_add" />
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER NOW</Button>
                    </form>);
        if (this.state.spinnerloading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;