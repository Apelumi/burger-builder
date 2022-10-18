import React, { Component } from "react";

import Button from "../../../components/UI/Buttons/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component{
    state = {
        OrderForm: {
            name: {
                elementType: "input",
                elementconfig: {
                    placeholder: "Your Name",
                    type: "text"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementconfig: {
                    type: "text",
                    placeholder: "StreetName"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalAdd: {
                elementType: "input",
                elementconfig: {
                    type: "text",
                    placeholder: "ZIP-CODE"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementconfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementconfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementconfig: {
                    options: [
                        {value: "fastest", displayValue: "fastest"},
                        {value: "cheapest", displayValue: "cheapest"}]
                }, value: "",
                validation:{},
                valid: true
            }
        },
        formisValid: false,
        spinnerloading: false
    }

    orderHandler = (event) => {
        // this prevent the page from reloading
        event.preventDefault();
        this.setState({spinnerloading: true})
        const formData = {};
        for (let formElementIdent in this.state.OrderForm) {
            formData[formElementIdent] = this.state.OrderForm[formElementIdent].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
    checkvalidityrulehandler(value, rules) {
        let isvalid = true;

        if (!rules){
            return true
        }

        if (rules.required){
            isvalid = value.trim() !== "" && isvalid;
        }
        if (rules.minLength){
            isvalid = value.length >= rules.minLength && isvalid;
        }
        if (rules.maxLength){
            isvalid = value.length <= rules.maxLength && isvalid;
        }
        return isvalid;
    }

    inputchangehandler = (event, inputIdentifier) => {
        // we mutate our state by using the setstate method
        const updatedOrderForm = {
            ...this.state.OrderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        //destructuring the elementconfig part of the OrderForm
        const updatedOrderFormElementconfig = {
            ...updatedOrderForm[inputIdentifier].elementconfig}
        console.log(updatedOrderFormElementconfig)
        // console.log(updatedOrderFormElement)
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkvalidityrulehandler(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true;
        // console.log(updatedOrderFormElement)
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        let formIsvalid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsvalid = updatedOrderForm[inputIdentifier].valid && formIsvalid;
        }
        // console.log(formIsvalid)
        this.setState({OrderForm: updatedOrderForm, formisValid: formIsvalid})
    }

    

    render(){
        const formelementtype = [];

        for (let formelement in this.state.OrderForm) {
            formelementtype.push({
                id: formelement,
                config: this.state.OrderForm[formelement]
            });
        }

        let form = (<form onSubmit={this.orderHandler}>
                        {/* <Input elementType="..." elementconfig="..." value="..."/> */}
                        {formelementtype.map( element => 
                            (<Input 
                                key={element.id}
                                elementType= {element.config.elementType}
                                elementconfig={element.config.elementconfig}
                                value={element.config.value} 
                                invalid={!element.config.valid}
                                shouldUpdatevalid={element.config.validation}
                                touched={element.config.touched}
                                changed={(event)=> (this.inputchangehandler(event, element.id))}/>
                        ))}
                        <Button btnType="Success" disabled={!this.state.formisValid}>ORDER NOW</Button>
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